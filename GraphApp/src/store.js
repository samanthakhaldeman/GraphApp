import { create } from 'zustand';

const useStore = create((set) => ({
    nodes: [],
    edges: [],
    
    setNodes: (newNodes) => set({ nodes: newNodes }),
    setEdges: (newEdges) => set({ edges: newEdges }),
    
    addNode: (node) => set((state) => ({ nodes: [...state.nodes, node] })),
    addEdge: (edge) => set((state) => ({ edges: [...state.edges, edge] }))
  }));

export default useStore