import { Position, MarkerType } from '@xyflow/react';
 
// in hooks folder!!!
// this helper function returns the intersection point
// of the line between the center of the intersectionNode and the target node
function getNodeIntersection(intersectionNode, targetNode) {
  // https://math.stackexchange.com/questions/1724792/an-algorithm-for-finding-the-intersection-point-between-a-center-of-vision-and-a

  const intersectionNodeRadius = 40;
  const intersectionNodePosition = intersectionNode.position;
  const targetNodeRadius = 40;
  const targetPosition = targetNode.position;
 
  const x2 = intersectionNodePosition.x + intersectionNodeRadius;
  const y2 = intersectionNodePosition.y + intersectionNodeRadius;
  const x1 = targetPosition.x + targetNodeRadius;
  const y1 = targetPosition.y + targetNodeRadius;

  const dx = x2 - x1;
  const dy = y2 - y1;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance === 0) {
    console.log(intersectionNode, targetNode);
    console.error("Nodes are at the same position, cannot compute intersection.");
    return { x: x2, y: y2 };
  }

  const scale = intersectionNodeRadius / distance;
  const x = x2 - dx * scale;
  const y = y2 - dy * scale;

  return { x, y };
}
 
// returns the position (top,right,bottom or right) passed node compared to the intersection point
function getEdgePosition(node, intersectionPoint) {
  const n = { ...node.position, ...node };
  const nx = Math.round(n.x);
  const ny = Math.round(n.y);
  const px = Math.round(intersectionPoint.x);
  const py = Math.round(intersectionPoint.y);
 
  if (px <= nx + 1) {
    return Position.Left;
  }
  if (px >= nx + 80 - 1) {
    return Position.Right;
  }
  if (py <= ny + 1) {
    return Position.Top;
  }
  if (py >= n.y + 80 - 1) {
    return Position.Bottom;
  }
 
  return Position.Top;
}
 
// returns the parameters (sx, sy, tx, ty, sourcePos, targetPos) you need to create an edge
export function getEdgeParams(source, target) {
  const sourceIntersectionPoint = getNodeIntersection(source, target);
  const targetIntersectionPoint = getNodeIntersection(target, source);
 
  const sourcePos = getEdgePosition(source, sourceIntersectionPoint);
  const targetPos = getEdgePosition(target, targetIntersectionPoint);
 
  return {
    sx: sourceIntersectionPoint.x,
    sy: sourceIntersectionPoint.y,
    tx: targetIntersectionPoint.x,
    ty: targetIntersectionPoint.y,
    sourcePos,
    targetPos,
  };
}
 
export function createNodesAndEdges() {
  const nodes = [];
  const edges = [];
  const center = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
 
  nodes.push({ id: 'target', data: { label: 'Target' }, position: center });
 
  for (let i = 0; i < 8; i++) {
    const degrees = i * (360 / 8);
    const radians = degrees * (Math.PI / 180);
    const x = 250 * Math.cos(radians) + center.x;
    const y = 250 * Math.sin(radians) + center.y;
 
    nodes.push({ id: `${i}`, data: { label: 'Source' }, position: { x, y } });
 
    edges.push({
      id: `edge-${i}`,
      target: 'target',
      source: `${i}`,
      type: 'floating',
      markerEnd: {
        type: MarkerType.Arrow,
      },
    });
  }
 
  return { nodes, edges };
}