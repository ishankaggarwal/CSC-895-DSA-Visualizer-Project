import { BinarySearchAnimationInterface } from "../interfaces/BinarySearchVisualizationInterface";

export function binarySearchWithAnimation(
  sortedArray: number[],
  target: number
): BinarySearchAnimationInterface[] {
  let animations: BinarySearchAnimationInterface[] = [];

  // Binary search algorithm
  let low = 0;
  let high = sortedArray.length - 1;
  let found = false;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);

    animations.push({
      index: low,
      color: "yellow",
      type: "low",
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

    animations.push({
      index: high,
      color: "purple",
      type: "high",
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

    animations.push({
      index: mid,
      color: "yellow",
      type: "mid",
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

    if (sortedArray[mid] === target) {
      found = true;
      animations.push({
        index: mid,
        color: "green",
        type: "result",
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

      break;
    } else if (sortedArray[mid] < target) {
      animations.push({
        index: low,
        color: "transparent",
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

      animations.push({
        index: high,
        color: "transparent",
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

      animations.push({
        index: mid,
        color: "transparent",
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

      low = mid + 1;
    } else {
      animations.push({
        index: low,
        color: "transparent",
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

      animations.push({
        index: high,
        color: "transparent",
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

      animations.push({
        index: mid,
        color: "transparent",
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

      high = mid - 1;
    }
  }

  // if (!found) {
  //   animations.push({
  //     index: -1,
  //     color: "yellow",
  //   });
  // }

  return animations;
}
