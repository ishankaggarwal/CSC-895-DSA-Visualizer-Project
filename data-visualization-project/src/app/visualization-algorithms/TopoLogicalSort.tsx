import { topoLogicalSortVisualizationInterface } from "../interfaces/GraphSearchVisualizationInterface";
import { deepCopy } from "./mergesort";

export function topologicalSort(graph: Map<string, string[]>): topoLogicalSortVisualizationInterface[] {
    let visited: string[] = [];
    let stack: string[] = [];
    let animations: topoLogicalSortVisualizationInterface[] = [];

    function dfs(node: string) {
        visited.push(node);
        animations.push({
            type: 'node',
            nodeId: node,
            nodeColor: 'yellow',
            searchValue: deepCopy(visited),
            currentLineMarkers: [{ startRow: 0, startCol: 0, endRow: 0, endCol: 1000, className: 'myMarker', type: 'text' }]
        });

        const neighbors = graph.get(node) || [];

        neighbors.forEach(neighbor => {
            if (!visited.includes(neighbor)) {
                dfs(neighbor);
            }
        });

        stack.push(node);
        animations.push({
            type: 'node',
            nodeId: node,
            nodeColor: 'green',
            searchValue: deepCopy(visited),
            currentLineMarkers: [{ startRow: 2, startCol: 0, endRow: 2, endCol: 1000, className: 'myMarker', type: 'text' }]
        });
    }

    for (const node of graph.keys()) {
        if (!visited.includes(node)) {
            dfs(node);
        }
    }

    animations.push({
        type: 'result',
        resultOrder: stack.slice().reverse(),
        searchValue: deepCopy(visited),
        currentLineMarkers: []
    });

    return animations;
}
