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
    });

    animations.push({
      index: high,
      color: "purple",
      type: "high",
    });

    animations.push({
      index: mid,
      color: "yellow",
      type: "mid",
    });

    if (sortedArray[mid] === target) {
      found = true;
      animations.push({
        index: mid,
        color: "green",
        type: "result",
      });

      break;
    } else if (sortedArray[mid] < target) {
      animations.push({
        index: low,
        color: "transparent",
        type: "none",
      });

      animations.push({
        index: high,
        color: "transparent",
        type: "none",
      });

      animations.push({
        index: mid,
        color: "transparent",
        type: "none",
      });

      low = mid + 1;
    } else {
      animations.push({
        index: low,
        color: "transparent",
        type: "none",
      });

      animations.push({
        index: high,
        color: "transparent",
        type: "none",
      });

      animations.push({
        index: mid,
        color: "transparent",
        type: "none",
      });

      high = mid - 1;
    }
  }

  //   if (!found) {
  //     animations.push({
  //       index: -1,
  //       color: "yellow",
  //     });
  //   }

  return animations;
}
