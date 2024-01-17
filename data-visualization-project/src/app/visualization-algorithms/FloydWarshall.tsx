import { FloydWarshallVisualizationInterface } from "../interfaces/ShortestPathAlgorithmVIsualizerInterface";

type Edge = [string, number];
type Graph = Map<string, Edge[]>;

export function floydWarshallAlgorithm(graph: Graph): FloydWarshallVisualizationInterface[] {
    const nodes = Array.from(graph.keys());
    const numNodes = nodes.length;
    let distanceMatrix: number[][] = [];
    let animations: FloydWarshallVisualizationInterface[] = [];

    // Initialize distance matrix and predecessors
    for (let i = 0; i < numNodes; i++) {
        distanceMatrix[i] = [];
        for (let j = 0; j < numNodes; j++) {
            if (i === j) {
                distanceMatrix[i][j] = 0;
            } else {
                const edge = graph.get(nodes[i])?.find(([neighbor]) => neighbor === nodes[j]);
                distanceMatrix[i][j] = edge ? edge[1] : Infinity;
            }
        }
    }

    // Floyd-Warshall algorithm
    for (let k = 0; k < numNodes; k++) {
        for (let i = 0; i < numNodes; i++) {
            for (let j = 0; j < numNodes; j++) {
                if (distanceMatrix[i][k] + distanceMatrix[k][j] < distanceMatrix[i][j]) {
                    distanceMatrix[i][j] = distanceMatrix[i][k] + distanceMatrix[k][j];
                }
                animations.push({
                    type: 'node',
                    nodeId: nodes[i],
                    nodeColor: 'green',
                    currentLineMarkers: [],
                    rowNodeID: nodes[i],
                    columnNodeID: nodes[j],
                    distance: distanceMatrix[i][j].toString(),
                    cellColor: 'green'
                });

                animations.push({
                    type: 'path',
                    pathStartId: nodes[i],
                    pathEndId: nodes[j],
                    pathColor: 'purple',  
                    currentLineMarkers: []
                });

            }
        }
    }

    return animations;
}
