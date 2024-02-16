import { BreadthFirstSearchVisualizationInterface } from "../interfaces/GraphSearchVisualizationInterface";
import { deepCopy } from "./mergesort";

export function LevelOrderTraversalGraph(
  graph: Map<string, string[]>,
  start: string
): BreadthFirstSearchVisualizationInterface[] {
  let animations: BreadthFirstSearchVisualizationInterface[] = [];
  let visited: string[] = [];
  let queue: string[] = [];

  animations.push({
    type: "node",
    currentLineMarkers: [
      {
        startRow: 1,
        startCol: 0,
        endRow: 1,
        endCol: 1000,
        className: "myMarker",
        type: "text",
      },
    ],
  });

  animations.push({
    type: "node",
    currentLineMarkers: [
      {
        startRow: 2,
        startCol: 0,
        endRow: 2,
        endCol: 1000,
        className: "myMarker",
        type: "text",
      },
    ],
  });

  // Enqueue the starting node
  queue.push(start);

  animations.push({
    type: "node",
    currentLineMarkers: [
      {
        startRow: 5,
        startCol: 0,
        endRow: 5,
        endCol: 1000,
        className: "myMarker",
        type: "text",
      },
    ],
    queue: deepCopy(queue),
  });

  while (queue.length > 0) {
    animations.push({
      type: "node",
      currentLineMarkers: [
        {
          startRow: 7,
          startCol: 0,
          endRow: 7,
          endCol: 1000,
          className: "myMarker",
          type: "text",
        },
      ],
    });

    const node = queue.shift();

    animations.push({
      type: "node",
      currentLineMarkers: [
        {
          startRow: 8,
          startCol: 0,
          endRow: 8,
          endCol: 1000,
          className: "myMarker",
          type: "text",
        },
      ],
      queue: deepCopy(queue),
    });

    if (!node) continue;

    // Visit the node if it's not already visited
    if (!visited.includes(node)) {
      animations.push({
        type: "node",
        currentLineMarkers: [
          {
            startRow: 11,
            startCol: 0,
            endRow: 11,
            endCol: 1000,
            className: "myMarker",
            type: "text",
          },
        ],
      });

      visited.push(node);

      animations.push({
        type: "node",
        currentLineMarkers: [
          {
            startRow: 12,
            startCol: 0,
            endRow: 12,
            endCol: 1000,
            className: "myMarker",
            type: "text",
          },
        ],
      });

      animations.push({
        type: "node",
        nodeId: node,
        nodeColor: "green",
        searchValue: deepCopy(visited),
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

      animations.push({
        type: "node",
        currentLineMarkers: [
          {
            startRow: 16,
            startCol: 0,
            endRow: 16,
            endCol: 1000,
            className: "myMarker",
            type: "text",
          },
        ],
      });

      if (neighbors) {
        neighbors.forEach((neighbor) => {
          animations.push({
            type: "node",
            currentLineMarkers: [
              {
                startRow: 17,
                startCol: 0,
                endRow: 17,
                endCol: 1000,
                className: "myMarker",
                type: "text",
              },
            ],
          });

          if (!visited.includes(neighbor)) {
            animations.push({
              type: "node",
              currentLineMarkers: [
                {
                  startRow: 18,
                  startCol: 0,
                  endRow: 18,
                  endCol: 1000,
                  className: "myMarker",
                  type: "text",
                },
              ],
            });

            queue.push(neighbor);

            animations.push({
              type: "node",
              currentLineMarkers: [
                {
                  startRow: 19,
                  startCol: 0,
                  endRow: 19,
                  endCol: 1000,
                  className: "myMarker",
                  type: "text",
                },
              ],
              queue: deepCopy(queue),
            });
          }
        });
      }
    }
  }

  return animations;
}
