import React from 'react';
import { Handle, Position } from 'reactflow';

import '../styles/index.css';

const CustomNode = ({id, data}) => {
  console.log(id);
  if (!id) {
    console.warn('Custom Node rendered without a valid id.');
    return null;
  }

  return (
    <div className='custom-node'>
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
