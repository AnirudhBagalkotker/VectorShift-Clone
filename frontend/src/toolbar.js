// toolbar.js

import { DraggableNode } from './draggableNode';
import styled from 'styled-components';

export const PipelineToolbar = () => {

    return (
        <ToolbarContainer>
            <Header>Build Pipeline</Header>
            <DraggableContainer>
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='dataTransform' label='Transform' />
                <DraggableNode type='apiRequest' label='APIs' />
                <DraggableNode type='loadFile' label='Load File' />
                <DraggableNode type='dataAggregation' label='Aggregation' />
                <DraggableNode type='timer' label='Timer' />
            </DraggableContainer>
        </ToolbarContainer>
    );
};


const ToolbarContainer = styled.div`
    padding: 4px;
    margin: 6px;
    border-radius: 6px;
    background-color: #1d0c4a;
    display: flex;
    flex-direction: column;
    gap: 2px;
`;

const DraggableContainer = styled.div`
    display: flex;
    flex-wrap: nowrap;
    gap: 16px;
    overflow-x: auto;
    border-radius: 6px;
    padding: 16px;
    padding-top: 4px;
    margin-top: 4px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
    &::-webkit-scrollbar {
        height: 2px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #6366f1;
        border-radius: 10px;
    }
`;

const Header = styled.h2`
    padding: 0 16px;
    color: #fff;
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 8px;
`;