import { create } from 'zustand';

const useStore = create((set) => ({
    nodes: [],
    edges: [],
    
    setNodes: (newNodes) => set((state) => ({ nodes: newNodes })),
    setEdges: (newEdges) => set({ edges: newEdges }),
    
    addNode: (newNode) => set((state) => {
      const nodeExists = state.nodes.some((node) => node.id === newNode.id);
      
      if (nodeExists) {
        // Update the node's position (or any other properties if needed)
        const updatedNodes = state.nodes.map((node) =>
          node.id === newNode.id ? { ...node, position: newNode.position } : node
        );
        return { nodes: updatedNodes };
      } else {
        // If node doesn't exist, add it to the state
        return { nodes: [...state.nodes, newNode] };
      }
    }),
    addEdge: (newEdge) => set((state) => ({
      edges: [...state.edges, newEdge],
    })),
  }));

export default useStore