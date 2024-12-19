import React from 'react';
import { Handle, Position } from 'reactflow';

import '../styles/index.css';

const CustomNode = ({id, data}) => {
  if (!id) {
    return null;
  }

  return (
    <div className='custom-node' draggable>
      <span className="drag-handle__custom" />
      <img src={data.image} className='node-image'></img>
      <div className='node-label'>{data.label}</div>
      <Handle
        type="target" 
        position={Position.Left}
        style={{background:'#eee'}}
        id='input'
      />
      <Handle
        type="source"
        position={Position.Right}
        style={{background:'#eee'}}
        id='output'
      />
    </div>
  );
};

export default CustomNode;
