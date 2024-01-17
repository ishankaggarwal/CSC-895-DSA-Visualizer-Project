import { PrimAlgorithmVisualizationInterface } from "../interfaces/ShortestPathAlgorithmVIsualizerInterface";

type Edge = [string, number];
type Graph = Map<string, Edge[]>;

export function primAlgorithm(graph: Graph): PrimAlgorithmVisualizationInterface[] {
    const nodes = Array.from(graph.keys());
    const numNodes = nodes.length;
    const parent: Map<string, string | null> = new Map();
    let animations: PrimAlgorithmVisualizationInterface[] = [];

    // Set to keep track of visited nodes
    const visitedNodes: Set<string> = new Set();

    // Map to store key values for each node
    const keyValues: Map<string, number> = new Map();

    // Initialize key values for all nodes
    for (const node of nodes) {
        keyValues.set(node, Infinity);
    }

    // Choose any starting node (here, the first node)
    const startingNode = nodes[0];
    keyValues.set(startingNode, 0);

    // Main loop for the Prim's algorithm
    while (visitedNodes.size < numNodes) {
        let current: string | null = null;
        let minKeyValue = Infinity;

        // Find the node with the minimum key value among unvisited nodes
        for (const node of nodes) {
            if (!visitedNodes.has(node) && keyValues.get(node)! < minKeyValue) {
                minKeyValue = keyValues.get(node)!;
                current = node;
            }
        }

        // Break the loop if there are no more nodes to explore
        if (current === null) {
            break;
        }

        // Mark the current node as green in the visualization
        animations.push({
            type: 'node',
            nodeId: current,
            nodeColor: 'green',
            distance: minKeyValue.toString(),
        });

        // Explore neighbors and find the edge with minimum weight
        const neighbors = graph.get(current) || [];
        for (const node of neighbors) {
            if (!visitedNodes.has(node[0])) {
                const neighborKeyValue = keyValues.get(node[0]) || Infinity;

                if (node[1] < neighborKeyValue) {
                    // Update key values and parent information
                    keyValues.set(node[0], node[1]);
                    parent.set(node[0], current);
                }

            }
        }

        // Mark the current node as visited
        visitedNodes.add(current);

        animations.push({
            type: 'value',
            searchValue : new Set(visitedNodes)
        });

    }

    // Return the array of visualization steps
    return animations;
}
