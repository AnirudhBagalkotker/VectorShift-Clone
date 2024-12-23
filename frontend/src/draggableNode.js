// draggableNode.js
import styled from 'styled-components';

export const DraggableNode = ({ type, label }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
  
    return (
      <StyledNode
        className={type}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        draggable
      >
          <span style={{ color: '#fff' }}>{label}</span>
      </StyledNode>
    );
  };
  

  const StyledNode = styled.div`
    background-color: #1d0c4a;
    color: white;
    min-width: 80px;
    padding: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 6px;
    border: 1px solid #1d0c4a;
    cursor: grab;
    transition: all 0.3s ease;
    
    span {
      font-size: 14px;
      font-weight: bold;
      text-transform: capitalize;
      }
      
      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 1px 8px rgba(255, 255, 255, 0.3);
        background-color: #5c34af;
        border: 1px solid #ffffff5a;
    }

    &:active {
        transform: scale(0.95);
        box-shadow: none;
    }
`;