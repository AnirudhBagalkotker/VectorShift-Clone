import React from 'react';
import { useStore } from './store';
import styled from 'styled-components';

export const SubmitButton = () => {
    const { nodes, edges } = useStore(state => ({ nodes: state.nodes, edges: state.edges }));
    console.log(nodes);
    console.log(edges);
    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {'Content-Type': 'application/json',},
                body: JSON.stringify({ nodes, edges }),
            });

            if (!response.ok) throw new Error(`Backend error! status: ${response.status}`);

            const data = await response.json();
            const { num_nodes, num_edges, is_dag } = data;
            
            alert(`Pipeline Analysis:
                Number of Nodes: ${num_nodes}
                Number of Edges: ${num_edges}
                Is a DAG: ${is_dag ? 'Yes' : 'No'}`);
        } catch (error) {
            console.error('Error submitting pipeline:', error);
            alert('Error submitting pipeline. Please try again.');
        }
    };

    return (
        <BtnContainer>
            <Btn onClick={handleSubmit}>Submit</Btn>
        </BtnContainer>
    );
}

const BtnContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`;

const Btn = styled.button`
    background-color: #1d0c4a;
    color: white;
    font-size: 16px;
    font-weight: bold;
    padding: 12px 30px;
    min-width: 80px;
    border-radius: 6px;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    border: 1px solid #1d0c4a;
    transition: all 0.3s ease;
    &:hover {
        background-color: #5c34af;
        transform: translateY(-3px);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
        border: 1px solid #ffffff5a;
    }
    &:active {
        transform: scale(0.95);
        background-color: #4a2991;
        box-shadow: none;
    }
`;