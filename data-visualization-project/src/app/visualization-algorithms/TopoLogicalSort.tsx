import { topoLogicalSortVisualizationInterface } from "../interfaces/GraphSearchVisualizationInterface";
import { deepCopy } from "./mergesort";

export function topologicalSort(
  graph: Map<string, string[]>
): topoLogicalSortVisualizationInterface[] {
  let animations: topoLogicalSortVisualizationInterface[] = [];
  animations.push({
    type: "none",
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
    type: "none",
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
  let stack: string[] = [];

  animations.push({
    type: "none",
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
      nodeColor: "yellow",
      searchValue: deepCopy(visited),
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

    const neighbors = graph.get(node) || [];

    animations.push({
      type: "none",
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
    neighbors.forEach((neighbor) => {
      animations.push({
        type: "none",
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
      if (!visited.includes(neighbor)) {
        animations.push({
          type: "none",
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
        dfs(neighbor);
      }
    });

    stack.push(node);
    animations.push({
      type: "node",
      nodeId: node,
      nodeColor: "green",
      searchValue: deepCopy(visited),
      currentLineMarkers: [
        {
          startRow: 14,
          startCol: 0,
          endRow: 14,
          endCol: 1000,
          className: "myMarker",
          type: "text",
        },
      ],
    });
  }

  animations.push({
    type: "none",
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
  for (const node of graph.keys()) {
    animations.push({
      type: "none",
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
    if (!visited.includes(node)) {
      animations.push({
        type: "none",
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
      dfs(node);
    }
  }

  animations.push({
    type: "result",
    resultOrder: stack.slice().reverse(),
    searchValue: deepCopy(visited),
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

  return animations;
}
