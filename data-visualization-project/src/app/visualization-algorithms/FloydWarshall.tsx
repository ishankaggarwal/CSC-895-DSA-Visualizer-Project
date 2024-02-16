import { FloydWarshallVisualizationInterface } from "../interfaces/ShortestPathAlgorithmVIsualizerInterface";

type Edge = [string, number];
type Graph = Map<string, Edge[]>;

export function floydWarshallAlgorithm(
  graph: Graph
): FloydWarshallVisualizationInterface[] {
  let animations: FloydWarshallVisualizationInterface[] = [];

  const nodes = Array.from(graph.keys());
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

  const numNodes = nodes.length;
  let distanceMatrix: number[][] = [];

  animations.push({
    type: "none",
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
  // Initialize distance matrix and predecessors
  for (let i = 0; i < numNodes; i++) {
    animations.push({
      type: "none",
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

    distanceMatrix[i] = [];

    animations.push({
      type: "none",
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

    for (let j = 0; j < numNodes; j++) {
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
      if (i === j) {
        distanceMatrix[i][j] = 0;
      } else {
        const edge = graph
          .get(nodes[i])
          ?.find(([neighbor]) => neighbor === nodes[j]);
        distanceMatrix[i][j] = edge ? edge[1] : Infinity;
      }
    }
  }

  animations.push({
    type: "none",
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
  // Floyd-Warshall algorithm
  for (let k = 0; k < numNodes; k++) {
    animations.push({
      type: "none",
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

    for (let i = 0; i < numNodes; i++) {
      animations.push({
        type: "none",
        currentLineMarkers: [
          {
            startRow: 15,
            startCol: 0,
            endRow: 15,
            endCol: 1000,
            className: "myMarker",
            type: "text",
          },
        ],
      });

      for (let j = 0; j < numNodes; j++) {
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

        if (
          distanceMatrix[i][k] + distanceMatrix[k][j] <
          distanceMatrix[i][j]
        ) {
          distanceMatrix[i][j] = distanceMatrix[i][k] + distanceMatrix[k][j];
        }

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

        animations.push({
          type: "node",
          nodeId: nodes[i],
          nodeColor: "green",
          currentLineMarkers: [],
          rowNodeID: nodes[i],
          columnNodeID: nodes[j],
          distance: distanceMatrix[i][j].toString(),
          cellColor: "green",
        });

        animations.push({
          type: "path",
          pathStartId: nodes[i],
          pathEndId: nodes[j],
          pathColor: "purple",
          currentLineMarkers: [],
        });
      }
    }
  }

  animations.push({
    type: "none",
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
  return animations;
}
