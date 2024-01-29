import { CycleDetectionVisulizationInterface } from "../interfaces/GraphSearchVisualizationInterface";
import { deepCopy } from "./mergesort";

export function cycleDetection(
  graph: Map<string, string[]>,
  start: string
): CycleDetectionVisulizationInterface[] {
  let visited: string[] = [];
  let parent: Map<string, string | null> = new Map();
  let animations: CycleDetectionVisulizationInterface[] = [];
  let cycleNodes: Set<string> = new Set();
  let hasCycle = false;

  function dfs(node: string) {
    visited.push(node);

    animations.push({
      type: "node",
      nodeId: node,
      nodeColor: cycleNodes.has(node) ? "green" : "yellow",
      searchValue: deepCopy(visited),
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

    const neighbors = graph.get(node);
    if (neighbors) {
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
              startRow: 4,
              startCol: 0,
              endRow: 4,
              endCol: 1000,
              className: "myMarker",
              type: "text",
            },
          ],
        });

        if (!visited.includes(neighbor)) {
          parent.set(neighbor, node);
          dfs(neighbor);
        } else if (parent.get(node) !== neighbor && !hasCycle) {
          // Back edge found, indicating a cycle
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

  hasCycle = false;
  parent.set(start, null);
  dfs(start);
  return animations;
}
