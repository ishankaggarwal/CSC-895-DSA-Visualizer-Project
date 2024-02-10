import { CycleDetectionVisulizationInterface } from "../interfaces/GraphSearchVisualizationInterface";
import { deepCopy } from "./mergesort";

export function cycleDetection(
  graph: Map<string, string[]>,
  start: string
): CycleDetectionVisulizationInterface[] {
  let animations: CycleDetectionVisulizationInterface[] = [];

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

  let visited: string[] = [];
  let parent: Map<string, string | null> = new Map();
  let cycleNodes: Set<string> = new Set();
  let hasCycle = false;

  animations.push({
    type: "node",
    currentLineMarkers: [
      {
        startRow: 4,
        startCol: 0,
        endRow: 4,
        endCol: 1000,
        className: "myMarker",
        type: "text",
      },
    ],
  });

  function dfs(node: string) {
    visited.push(node);

    animations.push({
      type: "node",
      nodeId: node,
      nodeColor: cycleNodes.has(node) ? "green" : "yellow",
      searchValue: deepCopy(visited),
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
    });

    animations.push({
      type: "node",
      currentLineMarkers: [
        {
          startRow: 6,
          startCol: 0,
          endRow: 6,
          endCol: 1000,
          className: "myMarker",
          type: "text",
        },
      ],
    });

    const neighbors = graph.get(node);
    if (neighbors) {
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
      });

      neighbors.forEach((neighbor) => {
        animations.push({
          type: "path",
          pathStartId: node,
          pathEndId: neighbor,
          pathColor:
            cycleNodes.has(node) && cycleNodes.has(neighbor)
              ? "green"
              : "yellow",
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

        if (!visited.includes(neighbor)) {
          animations.push({
            type: "node",
            currentLineMarkers: [
              {
                startRow: 10,
                startCol: 0,
                endRow: 10,
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
                startRow: 11,
                startCol: 0,
                endRow: 11,
                endCol: 1000,
                className: "myMarker",
                type: "text",
              },
            ],
          });

          parent.set(neighbor, node);
          dfs(neighbor);
        } else if (parent.get(node) !== neighbor && !hasCycle) {
          // Back edge found, indicating a cycle

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
            currentLineMarkers: [
              {
                startRow: 13,
                startCol: 0,
                endRow: 13,
                endCol: 1000,
                className: "myMarker",
                type: "text",
              },
            ],
          });

          hasCycle = true;
          let current = node;
          while (current !== neighbor) {
            cycleNodes.add(current);
            current = parent.get(current) as string;
          }
          cycleNodes.add(neighbor);
        }

        animations.push({
          type: "path",
          pathStartId: node,
          pathEndId: neighbor,
          pathColor:
            cycleNodes.has(node) && cycleNodes.has(neighbor)
              ? "green"
              : "Black",
          searchValue: deepCopy(visited),
          currentLineMarkers: [
            {
              startRow: 4,
              startCol: 0,
              endRow: 4,
              endCol: 1000,
              className: "myMarker",
              type: "text",
            },
          ],
        });
      });
    }

    animations.push({
      type: "node",
      nodeId: node,
      nodeColor: cycleNodes.has(node) ? "green" : "transparent",
      searchValue: deepCopy(visited),
      currentLineMarkers: [],
    });
  }

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
  });
  animations.push({
    type: "node",
    currentLineMarkers: [
      {
        startRow: 20,
        startCol: 0,
        endRow: 20,
        endCol: 1000,
        className: "myMarker",
        type: "text",
      },
    ],
  });

  hasCycle = false;
  parent.set(start, null);
  dfs(start);

  return animations;
}
