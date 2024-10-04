import React, { useState } from 'react';
import { useDnD } from './DnDContext';

import './index.css';

export default () => {
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
    <aside>
      <div className="description">You can drag these nodes to the pane on the right.</div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event,'default','Node')} draggable="true">
        Node
      </div>
    </aside>
  );
};