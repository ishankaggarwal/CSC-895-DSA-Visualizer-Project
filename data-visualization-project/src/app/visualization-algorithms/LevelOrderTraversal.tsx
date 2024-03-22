import {
  BinaryTreeAnimationInterface,
  Node,
} from "../components/Utils/BinaryTree";
import { deepCopy } from "./mergesort";

export const LevelOrderTraversal = (
  root: Node | null,
  animations: BinaryTreeAnimationInterface[],
  values: number[]
) => {
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
    color: "transparent",
  });

  if (root === null) {
    return;
  }

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
    color: "transparent",
  });

  const queue: Node[] = [];

  queue.push(root);

  animations.push({
    type: "none",
    currentLineMarkers: [],
    color: "transparent",
    queue: deepCopy(queue),
  });

  while (queue.length > 0) {
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
      color: "transparent",
    });
    const currentNode = queue.shift();

    animations.push({
      type: "none",
      currentLineMarkers: [],
      color: "transparent",
      queue: deepCopy(queue),
    });

    if (!currentNode) continue;

    values.push(currentNode.value);

    // Process the current node
    animations.push({
      type: "node",
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
      color: "green",
      nodeId: currentNode.id,
      values: deepCopy(values),
    });

    // Enqueue the children (if any) for further processing
    if (currentNode.left !== null) {
      queue.push(currentNode.left);

      animations.push({
        type: "none",
        currentLineMarkers: [],
        color: "transparent",
        queue: deepCopy(queue),
      });

      // animations.push({
      //   type: "link",
      //   currentLineMarkers: [{ startRow: 5, startCol: 0, endRow: 5, endCol: 1000, className: 'myMarker', type: 'text' }],
      //   color: "green",
      //   linkId: currentNode.id + '-' + currentNode.left.id,
      //   values: deepCopy(values)
      // });

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
        color: "transparent",
      });
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
        color: "transparent",
      });
    }

    if (currentNode.right !== null) {
      queue.push(currentNode.right);

      animations.push({
        type: "none",
        currentLineMarkers: [],
        color: "transparent",
        queue: deepCopy(queue),
      });

      // animations.push({
      //   type: "link",
      //   currentLineMarkers: [{ startRow: 8, startCol: 0, endRow: 8, endCol: 1000, className: 'myMarker', type: 'text' }],
      //   color: "green",
      //   linkId: currentNode.id + '-' + currentNode.right.id,
      //   values: deepCopy(values)
      // });

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
        color: "transparent",
      });
      animations.push({
        type: "node",
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
        color: "transparent",
      });
    }
  }

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
    color: "transparent",
  });
};

const LevelOrderTraversalComponent = () => {
  return <div></div>;
};

export default LevelOrderTraversalComponent;
