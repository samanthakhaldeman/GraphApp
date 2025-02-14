import { writeTextFile, readTextFile } from '@tauri-apps/plugin-fs';
import { save, open } from '@tauri-apps/plugin-dialog';

export const saveGraph = async (nodes, edges) => {
    console.log("nodes length: ", nodes.length);
    console.log("edges length: ", edges.length);
    console.log("saving...");
    try {
        const filePath = await save({
            defaultPath: "graph.json",
            filters: [{ name: 'JSON Files', extensions: ['json'] }]
        });

        if (filePath) {
            const graphData = {
                nodes: nodes.map(node => ({ id: node.id, data: node.data, position: node.position, type: node.type })),
                edges: edges.map(edge => ({ id: edge.id, source: edge.source, target: edge.target, type: edge.type, markerEnd: edge.markerEnd })),
            };
            
            const json = JSON.stringify(graphData, null, 2);

            await writeTextFile(filePath, json);
            alert(`File saved successfully as ${filePath}`);
        };
    } catch (error) {
        console.error("Failed to save the file: ", error);
        alert("Failed to save the file. Please try again.");
    }
};

export const loadGraph = async (setNodes, setEdges) => {
    try {
        const filePath = await open({
            filters: [{ name: 'JSON Files', extensions: ['json'] }]
        });

        if (filePath) {
            const fileContent = await readTextFile(filePath);

            const graphData = JSON.parse(fileContent);

            if (graphData.nodes && graphData.edges) {
                setNodes(graphData.nodes);
                setEdges(graphData.edges);
            } else {
                alert("Invalid graph data. Please check the file format.");
            }
        }
    } catch (error) {
        console.error("Failed to load the graph:", error);
        alert("Failed to load the graph. Please try again.");
    }
};
  