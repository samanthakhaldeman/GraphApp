import { create } from 'zustand';
const useStore = create((set) => ({
  nodes: [],
  edges: [],
  setNodes: (newNodes) => set({ newNodes }),
  setEdges: (newEdges) => set({ newEdges }),
}));

export default useStore