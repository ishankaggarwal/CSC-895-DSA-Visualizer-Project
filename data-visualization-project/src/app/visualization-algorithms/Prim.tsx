import { PrimAlgorithmVisualizationInterface } from "../interfaces/ShortestPathAlgorithmVIsualizerInterface";

type Edge = [string, number];
type Graph = Map<string, Edge[]>;

export function primAlgorithm(
  graph: Graph
): PrimAlgorithmVisualizationInterface[] {
  let animations: PrimAlgorithmVisualizationInterface[] = [];

  animations.push({
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

  const nodes = Array.from(graph.keys());

  animations.push({
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

  const numNodes = nodes.length;

  animations.push({
    currentLineMarkers: [
      {
        startRow: 3,
        startCol: 0,
        endRow: 3,
        endCol: 1000,
        className: "myMarker",
        type: "text",
      },
    ],
  });

  const parent: Map<string, string | null> = new Map();

  animations.push({
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

  // Set to keep track of visited nodes
  const visitedNodes: Set<string> = new Set();

  animations.push({
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

  // Map to store key values for each node
  const keyValues: Map<string, number> = new Map();

  // Initialize key values for all nodes
  for (const node of nodes) {
    keyValues.set(node, Infinity);
  }

  animations.push({
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

  // Choose any starting node (here, the first node)
  const startingNode = nodes[0];

  animations.push({
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

  keyValues.set(startingNode, 0);

  animations.push({
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

  // Main loop for the Prim's algorithm
  while (visitedNodes.size < numNodes) {
    // Mark the current node as green in the visualization
    animations.push({
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
    animations.push({
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

    let current: string | null = null;
    let minKeyValue = Infinity;

    // Find the node with the minimum key value among unvisited nodes
    for (const node of nodes) {
      animations.push({
        currentLineMarkers: [
          {
            startRow: 21,
            startCol: 0,
            endRow: 21,
            endCol: 1000,
            className: "myMarker",
            type: "text",
          },
        ],
      });
      animations.push({
        currentLineMarkers: [
          {
            startRow: 22,
            startCol: 0,
            endRow: 22,
            endCol: 1000,
            className: "myMarker",
            type: "text",
          },
        ],
      });
      if (!visitedNodes.has(node) && keyValues.get(node)! < minKeyValue) {
        animations.push({
          currentLineMarkers: [
            {
              startRow: 23,
              startCol: 0,
              endRow: 23,
              endCol: 1000,
              className: "myMarker",
              type: "text",
            },
          ],
        });
        minKeyValue = keyValues.get(node)!;
        current = node;
      }
    }

    animations.push({
      currentLineMarkers: [
        {
          startRow: 27,
          startCol: 0,
          endRow: 27,
          endCol: 1000,
          className: "myMarker",
          type: "text",
        },
      ],
    });
    // Break the loop if there are no more nodes to explore
    if (current === null) {
      animations.push({
        currentLineMarkers: [
          {
            startRow: 28,
            startCol: 0,
            endRow: 28,
            endCol: 1000,
            className: "myMarker",
            type: "text",
          },
        ],
      });
      break;
    }

    // Mark the current node as green in the visualization
    animations.push({
      type: "node",
      nodeId: current,
      nodeColor: "green",
      distance: minKeyValue,
      currentLineMarkers: [
        {
          startRow: 24,
          startCol: 0,
          endRow: 24,
          endCol: 1000,
          className: "myMarker",
          type: "text",
        },
      ],
    });

    animations.push({
      currentLineMarkers: [
        {
          startRow: 31,
          startCol: 0,
          endRow: 31,
          endCol: 1000,
          className: "myMarker",
          type: "text",
        },
      ],
    });

    // Explore neighbors and find the edge with minimum weight
    const neighbors = graph.get(current) || [];
    for (const node of neighbors) {
      animations.push({
        currentLineMarkers: [
          {
            startRow: 32,
            startCol: 0,
            endRow: 32,
            endCol: 1000,
            className: "myMarker",
            type: "text",
          },
        ],
      });
      animations.push({
        currentLineMarkers: [
          {
            startRow: 33,
            startCol: 0,
            endRow: 33,
            endCol: 1000,
            className: "myMarker",
            type: "text",
          },
        ],
      });
      if (!visitedNodes.has(node[0])) {
        const neighborKeyValue = keyValues.get(node[0]) || Infinity;

        if (node[1] < neighborKeyValue) {
          animations.push({
            currentLineMarkers: [
              {
                startRow: 35,
                startCol: 0,
                endRow: 35,
                endCol: 1000,
                className: "myMarker",
                type: "text",
              },
            ],
          });
          animations.push({
            currentLineMarkers: [
              {
                startRow: 36,
                startCol: 0,
                endRow: 36,
                endCol: 1000,
                className: "myMarker",
                type: "text",
              },
            ],
          });
          // Update key values and parent information
          keyValues.set(node[0], node[1]);
          parent.set(node[0], current);
        }
      }
    }

    // Mark the current node as visited
    visitedNodes.add(current);

    animations.push({
      type: "value",
      searchValue: new Set(visitedNodes),
      currentLineMarkers: [
        {
          startRow: 39,
          startCol: 0,
          endRow: 39,
          endCol: 1000,
          className: "myMarker",
          type: "text",
        },
      ],
    });
  }

  animations.push({
    currentLineMarkers: [
      {
        startRow: 42,
        startCol: 0,
        endRow: 42,
        endCol: 1000,
        className: "myMarker",
        type: "text",
      },
    ],
  });

  // Return the array of visualization steps
  return animations;
}
