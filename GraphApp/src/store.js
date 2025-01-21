import { create } from 'zustand';

const useStore = create((set) => ({
  nodes: [],
  edges: [],
  undoStack: [],
  redoStack: [],
  
  setNodes: (newNodes) => set((state) => ({ nodes: newNodes })),
  setEdges: (newEdges) => set({ edges: newEdges }),
  
  setStateWithUndo: (newState) => set((state) => {
    return {
      ...newState,
      undoStack: [...state.undoStack, { nodes: state.nodes, edges: state.edges }],
      redoStack: [],
    };
  }),

  addNode: (newNode) => set((state) => {
    const nodeExists = state.nodes.some((node) => node.id === newNode.id);
    
    if (nodeExists) {
      const updatedNodes = state.nodes.map((node) =>
        node.id === newNode.id ? { ...node, position: newNode.position } : node
      );
      return { nodes: updatedNodes };
    } else {
      console.log(newNode.type);
      return { 
        ...state, 
        undoStack: [...state.undoStack, { nodes: state.nodes, edges: state.edges }],
        redoStack: [],
        nodes: [...state.nodes, newNode] 
      };
    }
  }),
  addEdge: (newEdge) => set((state) => {
    return { 
      ...state,
      undoStack: [...state.undoStack, { nodes: state.nodes, edges: state.edges }],
      redoStack: [],
      edges: [...state.edges, newEdge] 
    };
  }),
  
  removeNode: (nodeId) => set((state) => {
    return { 
      ...state,
      undoStack: [...state.undoStack, { nodes: state.nodes, edges: state.edges }],
      redoStack: [],
      nodes: state.nodes.filter((node) => node.id !== nodeId) 
    };
  }),
  removeEdge: (edgeId) => set((state) => {
    return { 
      ...state,
      undoStack: [...state.undoStack, { nodes: state.nodes, edges: state.edges }],
      redoStack: [],
      edges: state.edges.filter((edge) => edge.id !== edgeId) 
    };
  }),
  
  undo: () => set((state) => {
    if (state.undoStack.length === 0) return state; 
  
    const lastState = state.undoStack[state.undoStack.length - 1];
    return {
      nodes: lastState.nodes,
      edges: lastState.edges,
      undoStack: state.undoStack.slice(0, -1), 
      redoStack: [{ nodes: state.nodes, edges: state.edges }, ...state.redoStack], 
    };
  }),
  
  redo: () => set((state) => {
    if (state.redoStack.length === 0) return state;
  
    const nextState = state.redoStack[0];
    return {
      nodes: nextState.nodes,
      edges: nextState.edges,
      redoStack: state.redoStack.slice(1), 
      undoStack: [...state.undoStack, { nodes: state.nodes, edges: state.edges }], 
    };
  }),
}));

export default useStore