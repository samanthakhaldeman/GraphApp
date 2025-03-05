import React, { useState } from 'react';
import { useDnD } from '../DnDContext';

import '../styles/index.css';

export default ({openMenu}) => {
  const [_, setType] = useDnD();
  const [name, setName] = useState();

  const onDragStart = (event, nodeType, nodeName) => {
    setType(nodeType);
    setName(nodeName);

    event.dataTransfer.setData('application/reactflow/type', nodeType)
    event.dataTransfer.setData('application/reactflow/name', nodeName)
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className='panel'>
      <h3 style={{marginTop: '60px', marginBottom: '15px'}}>You can drag these nodes to the pane on the right.</h3>
      <div className="custom-node" 
      onDragStart={(event) => onDragStart(event, 'customNode', 'Node')} 
      draggable="true">
        Node
      </div>
    </aside>
  );
};