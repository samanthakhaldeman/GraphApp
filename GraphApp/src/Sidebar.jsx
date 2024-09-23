import React from 'react';
import { useDnD } from './DnDContext';

export default () => {
  const [type, setType] = useDnD();

  const onDragStart = (event, type) => {
    event.dataTransfer.setData('application/reactflow', type);
    setType(type);  // Set the node type here
    console.log('Setting type:', type);  // Log the type being set
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      <div className="description">You can drag these nodes to the pane on the right.</div>
      <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'input')} draggable>
        Input Node
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'default')} draggable>
        Default Node
      </div>
      <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'output')} draggable>
        Output Node
      </div>
    </aside>
  );
};