import {
  BinaryTreeAnimationInterface,
  Node,
} from "../components/Utils/BinaryTree";

export const LowestCommonAncestor = (
  root: Node | null,
  animations: BinaryTreeAnimationInterface[],
  values: number[],
  node1: number,
  node2: number
): Node | null => {
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
    color: "transparent",
  });

  if (root === null) {
    return null;
  }

  values.push(root.value);
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
    color: "yellow",
    nodeId: root.id,
    values: values.slice(),
  });

  if (root.value === node1 || root.value === node2) {
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
      color: "green",
      nodeId: root.id,
      values: values.slice(),
    });
    return root; // Return the node to indicate that it's one of the target nodes
  }

  const leftLCA: Node | null = LowestCommonAncestor(
    root.left,
    animations,
    values,
    node1,
    node2
  );

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
    color: "transparent",
  });

  const rightLCA: Node | null = LowestCommonAncestor(
    root.right,
    animations,
    values,
    node1,
    node2
  );

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
    color: "transparent",
  });

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
    color: "transparent",
  });
  if (leftLCA !== null && rightLCA !== null) {
    // Add animation for finding the LCA
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
      color: "red",
      nodeId: root.id,
      values: values.slice(),
      lowest: root.value,
    });
    return root; // Return the LCA node
  }

  // If one of the subtrees has the LCA, return it
  return leftLCA !== null ? leftLCA : rightLCA;
};

const LowestCommonAncestorComponent = () => {
  return <div></div>;
};

export default LowestCommonAncestorComponent;
