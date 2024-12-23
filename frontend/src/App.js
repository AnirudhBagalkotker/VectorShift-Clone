import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import styled from 'styled-components';


function App() {
  return (
    <MainComponent>
      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton />
    </MainComponent>
  );
}

const MainComponent = styled.div`
  font-family: 'Inter', sans-serif;
`;

export default App;
