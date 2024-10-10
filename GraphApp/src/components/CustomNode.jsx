import React from 'react';
import { Handle } from 'reactflow';

const HighlightNode = ({ data, selected }) => {
    // Define the style for the node
    const nodeStyle = {
      padding: '10px',
      borderRadius: '5px',
      border: selected ? '2px solid blue' : '1px solid gray', // Highlight when selected
      backgroundColor: selected ? '#e0f7ff' : '#fff', // Different background color when selected
    };
  
    return (
      <div style={nodeStyle}>
        <div>{data.label}</div>
        <Handle type="source" position="right" />
        <Handle type="target" position="left" />
      </div>
    );
};