import React from 'react';
import { Position } from 'reactflow';
import { withNodeWrapper, Label, Input, Select } from './nodeAbstraction';

// 1. Data Transformation Node
export const createDataTransformNode = () => {
  const DataTransformComponent = ({ data }) => {
    const [transformation, setTransformation] = React.useState(data?.transformation || 'uppercase');

    return (
      <Label>
        <Select value={transformation} onChange={(e) => setTransformation(e.target.value)}>
          <option value="uppercase">Uppercase</option>
          <option value="lowercase">Lowercase</option>
          <option value="capitalize">Capitalize</option>
        </Select>
      </Label>
    );
  };

  return withNodeWrapper(DataTransformComponent, 'Data Transform', {
    input: { type: 'target', position: Position.Left },
    output: { type: 'source', position: Position.Right }
  });
};

// 2. API Request Node
export const createAPIRequestNode = () => {
  const APIRequestComponent = ({ data }) => {
    const [url, setUrl] = React.useState(data?.url || '');
    const [method, setMethod] = React.useState(data?.method || 'GET');

    return (
      <>
        <Label>
            <Input type="text" value={url} placeholder='URL' onChange={(e) => setUrl(e.target.value)} />
        </Label>
        <Label>
          <Select value={method} onChange={(e) => setMethod(e.target.value)}>
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </Select>
        </Label>
      </>
    );
  };

  return withNodeWrapper(APIRequestComponent, 'API Request', {
    input: { type: 'target', position: Position.Left },
    output: { type: 'source', position: Position.Right }
  });
};

// 3. Load File Node
export const createLoadFileNode = () => {
  const LoadFileComponent = ({ data }) => {
    const [fileType, setFileType] = React.useState(data?.fileType || 'csv');
    const [filePath, setFilePath] = React.useState(data?.filePath || '');

    return (
      <>
        <Label>
          <Input 
            type="text" 
            value={filePath} 
            onChange={(e) => setFilePath(e.target.value)}
            placeholder="File Path/URL"
          />
        </Label>
        <Label>
          <Select 
            value={fileType} 
            onChange={(e) => setFileType(e.target.value)}
          >
            <option value="csv">CSV</option>
            <option value="json">JSON</option>
            <option value="txt">TXT</option>
            <option value="xml">XML</option>
          </Select>
        </Label>
      </>
    );
  };

  return withNodeWrapper(LoadFileComponent, 'Load File', {
    output: { type: 'source', position: Position.Right }
  });
};

// 4. Data Aggregation Node
export const createDataAggregationNode = () => {
  const DataAggregationComponent = ({ data }) => {
    const [aggregationType, setAggregationType] = React.useState(data?.aggregationType || 'sum');

    return (
      <Label>
        <Select value={aggregationType} onChange={(e) => setAggregationType(e.target.value)}>
          <option value="sum">Sum</option>
          <option value="average">Average</option>
          <option value="count">Count</option>
          <option value="max">Max</option>
          <option value="min">Min</option>
        </Select>
      </Label>
    );
  };

  return withNodeWrapper(DataAggregationComponent, 'Data Aggregation', {
    input1: { type: 'target', position: Position.Left, style: { top: '25%' } },
    input2: { type: 'target', position: Position.Left, style: { top: '75%' } },
    output: { type: 'source', position: Position.Right }
  });
};

// 5. Timer Node
export const createTimerNode = () => {
  const TimerComponent = ({ data }) => {
    const [interval, setInterval] = React.useState(data?.interval || 1000);

    return (
      <Label>
        <Input
          type="number"
          value={interval}
          onChange={(e) => setInterval(parseInt(e.target.value))}
          min="100"
        />
      </Label>
    );
  };

  return withNodeWrapper(TimerComponent, 'Timer', {
    output: { type: 'source', position: Position.Right }
  });
};
