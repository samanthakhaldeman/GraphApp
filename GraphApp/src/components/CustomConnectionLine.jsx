import React from 'react';
import { getStraightPath } from '@xyflow/react';
 
function CustomConnectionLine({ fromX, fromY, toX, toY, connectionLineStyle }) {
  const [edgePath] = getStraightPath({
    sourceX: fromX,
    sourceY: fromY,
    targetX: toX,
    targetY: toY,
  });
 
  return (
    <g key={`${fromX}-${fromY}-${toX}-${toY}`}>
      <path style={connectionLineStyle}  d={edgePath} />
    </g>
  );
}
 
export default CustomConnectionLine;