import { BreadthFirstSearchVisualizationInterface } from "../interfaces/GraphSearchVisualizationInterface";
import { deepCopy } from "./mergesort";

export function LevelOrderTraversal(
  graph: Map<string, string[]>,
  start: string
): BreadthFirstSearchVisualizationInterface[] {
  let animations: BreadthFirstSearchVisualizationInterface[] = [];
  let visited: string[] = [];
  let queue: string[] = [];

  // Enqueue the starting node
  queue.push(start);

  while (queue.length > 0) {
    const node = queue.shift();

    if (!node) continue;

    // Visit the node if it's not already visited
    if (!visited.includes(node)) {
      visited.push(node);

      animations.push({
        type: "node",
        nodeId: node,
        nodeColor: "green",
        searchValue: deepCopy(visited),
        queue: deepCopy(queue),
        currentLineMarkers: [
          {
            startRow: 9,
            startCol: 0,
            endRow: 9,
            endCol: 1000,
            className: "myMarker",
            type: "text",
          },
        ],
      });

      // Get the neighbors of the node
      const neighbors = graph.get(node);

      if (neighbors) {
        neighbors.forEach((neighbor) => {
          if (!visited.includes(neighbor)) {
            queue.push(neighbor);
          }
        });
      }
    }
  }

  return animations;
}
