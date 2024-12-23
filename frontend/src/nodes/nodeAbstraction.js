import React, { useState, useEffect, useRef } from 'react';
import { Handle, Position } from 'reactflow';
import styled from 'styled-components';

// Node Wrapper component
export const withNodeWrapper = (WrappedComponent, nodeType, defaultHandles = {}) => {
  return function NodeWrapper({ id, data, ...props }) {
    const [dynamicHandles, setDynamicHandles] = useState([]);

    const calculateTopPosition = (index, total) => {
      const basePosition = 50;
      const spacing = 20;
      return `${basePosition + (index - (total - 1) / 2) * spacing}%`;
    };

    const mergedHandles = {
      ...defaultHandles,
      ...dynamicHandles.reduce((acc, handleId, index) => {
        const topPosition = calculateTopPosition(index, dynamicHandles.length);
        acc[handleId] = {
          type: 'target',
          position: Position.Left,
          id: handleId,
          style: { position: 'absolute', top: topPosition }
        };
        return acc;
      }, {})
    };

    return (
      <NodeContainer>
        <NodeHeader>{nodeType}</NodeHeader>
        {Object.entries(mergedHandles).map(([handleId, handleProps]) => (
          <StyledHandle
            key={handleId}
            id={handleId}
            {...handleProps}
          />
        ))}
        <WrappedComponent
          id={id}
          data={data}
          setDynamicHandles={setDynamicHandles}
          {...props}
        />
      </NodeContainer>
    );
  };
};

// Input Node
export const createInputNode = () => {
  const InputComponent = ({ id, data }) => {
    const [currName, setCurrName] = React.useState(data?.inputName || id.replace('customInput-', 'input_'));
    const [inputType, setInputType] = React.useState(data.inputType || 'Text');

    return (
      <>
        <Label>
          <Input value={currName} onChange={(e) => setCurrName(e.target.value)} />
        </Label>
        <Label>
          <Select value={inputType} onChange={(e) => setInputType(e.target.value)}>
            <option value="Text">Text</option>
            <option value="File">File</option>
          </Select>
        </Label>
      </>
    );
  };

  return withNodeWrapper(InputComponent, 'Input', {
    value: { type: 'source', position: Position.Right }
  });
};

// Output Node
export const createOutputNode = () => {
  const OutputComponent = ({ id, data }) => {
    const [currName, setCurrName] = React.useState(data?.outputName || id.replace('customOutput-', 'output_'));
    const [outputType, setOutputType] = React.useState(data.outputType || 'Text');

    return (
      <>
        <Label>
          <Input value={currName} onChange={(e) => setCurrName(e.target.value)} />
        </Label>
        <Label>
          <Select value={outputType} onChange={(e) => setOutputType(e.target.value)}>
            <option value="Text">Text</option>
            <option value="Image">Image</option>
          </Select>
        </Label>
      </>
    );
  };

  return withNodeWrapper(OutputComponent, 'Output', {
    value: { type: 'target', position: Position.Left }
  });
};

// LLM Node
export const createLLMNode = () => {
  const LLMComponent = () => <NodeContent>This is a LLM.</NodeContent>;

  return withNodeWrapper(LLMComponent, 'LLM', {
    system: { type: 'target', position: Position.Left, style: { top: '33%' } },
    prompt: { type: 'target', position: Position.Left, style: { top: '66%' } },
    response: { type: 'source', position: Position.Right }
  });
};

// Text Node
export const createTextNode = () => {
  const TextComponent = ({ data, setDynamicHandles }) => {
    const [currText, setCurrText] = React.useState(data?.text || 'input');
    const textareaRef = useRef(null);
    const variableRegex = /\{\{(\w+)\}\}/g;

    const handleTextChange = (e) => {
      const newText = e.target.value;
      setCurrText(newText);
      const variables = [...new Set([...newText.matchAll(variableRegex)].map((match) => match[1]))];
      setDynamicHandles(variables);
    };

    useEffect(() => {
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    }, [currText]);

    return (
      <Label>
        <StyledTextarea
          ref={textareaRef}
          value={currText}
          onChange={handleTextChange}
          rows={1}
        />
      </Label>
    );
  };

  return withNodeWrapper(TextComponent, 'Text', {
    output: { type: 'source', position: Position.Right, id: 'output' }
  });
};

// Styled Components
const NodeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 8px;
  min-width: 240px;
  width: auto;
  min-height: 80px;
  background-color: #420b88;
  border: 2px solid #1d0c4a;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
`;

const NodeHeader = styled.div`
  font-weight: bold;
  color: white;
  margin-bottom: 10px;
  width: 100%;
  font-size: 20px;
`;

const StyledHandle = styled(Handle)`
  background-color: #1d0c4a;
  right: -8px;
  width: 12px;
  height: 12px;
  border: 2px solid white;
  border-radius: 50%;
`;

export const Label = styled.label`
  display: block;
  width: 100%;
  font-size: 14px;
  color: white;
`;

export const Input = styled.input`
  width: 90%;
  padding: 8px;
  border: 1px solid #5c34af;
  border-radius: 4px;
  background-color: #271266;
  color: white;
  font-size: 14px;
  margin-top: 4px;

  &[type='number']::-webkit-inner-spin-button,
  &[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type='number'] {
    -moz-appearance: textfield;
  }
`;

export const StyledTextarea = styled.textarea`
  width: 90%;
  padding: 8px;
  border: 1px solid #5c34af;
  border-radius: 4px;
  background-color: #271266;
  color: white;
  font-size: 14px;
  margin-top: 4px;
  resize: none;
  overflow: hidden;
  min-height: 20px;
  transition: all 0.3s ease;
`;

export const Select = styled.select`
  padding: 8px;
  border: 1px solid #5c34af;
  border-radius: 4px;
  background-color: #271266;
  color: white;
  font-size: 14px;
  margin-top: 4px;
`;

const NodeContent = styled.div`
  font-size: 14px;
  color: white;
`;
