import React, { memo } from 'react';
import { getStraightPath, useReactFlow } from '@xyflow/react';
 
import { getEdgeParams } from '../hooks/utils.js';
import useStore from '../store.js';
 
const FloatingEdge = memo(({ id, source, target, markerEnd, style }) => {

  const nodes = useStore(state => state.nodes);
  const sourceNode = nodes.find(node => node.id === source);
  const targetNode = nodes.find(node => node.id === target);
 
  if (!sourceNode || !targetNode) {
    return null;
  }

  const { sx, sy, tx, ty } = getEdgeParams(sourceNode, targetNode);
  console.log(`Edge Params for ${id}:`, sx, sy, tx, ty);
 
  const [edgePath] = getStraightPath({
    sourceX: sx,
    sourceY: sy,
    targetX: tx,
    targetY: ty,
  });
 
  return (
    <path
      id={id}
      className="react-flow__edge-path"
      d={edgePath}
      markerEnd={markerEnd}
      style={style}
    />
  );
});

export default FloatingEdge;