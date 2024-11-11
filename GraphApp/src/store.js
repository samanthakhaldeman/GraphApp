import { create } from 'zustand';

const useStore = create((set) => ({
    nodes: [],
    edges: [],
    
    setNodes: (newNodes) => set((state) => ({ nodes: newNodes })),
    setEdges: (newEdges) => set({ edges: newEdges }),
    
    addNode: (newNode) => set((state) => ({
      nodes: [...state.nodes, newNode],
    })),
    addEdge: (newEdge) => set((state) => ({
      edges: [...state.edges, newEdge],
    })),
  }));

export default useStore