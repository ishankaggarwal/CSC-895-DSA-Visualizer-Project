import { InsertionSortArrayVisualizationAnimationInterface } from "../interfaces/InsertionSortArrayVisualizationInterface";

export const InsertionSort = (array: number[]) => {
  let animations: InsertionSortArrayVisualizationAnimationInterface[] = [];
  const n = array.length;
  let iteration = 0;
  let swap = 0;
  for (let i = 1; i < n; i++) {
    let key = array[i];
    let j = i - 1;
    iteration++;
    animations.push({
      valueI: key,
      valueJ: key,
      indexI: i,
      indexJ: i,
      colorI: "yellow",
      colorJ: "yellow",
      iterations: iteration,
      swaps: swap,
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
      keyValue: key.toString(),
    });

    animations.push({
      valueI: key,
      valueJ: key,
      indexI: i,
      indexJ: i,
      colorI: "transparent",
      colorJ: "transparent",
      iterations: iteration,
      swaps: swap,
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
      keyValue: key.toString(),
    });

    while (j >= 0 && array[j] > key) {
      animations.push({
        valueI: array[j],
        valueJ: array[j],
        indexI: j,
        indexJ: j,
        colorI: "blue",
        colorJ: "blue",
        iterations: iteration,
        swaps: swap,
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
        keyValue: key.toString(),
      });

      animations.push({
        valueI: array[j + 1],
        valueJ: array[j],
        indexI: j + 1,
        indexJ: j,
        colorI: "purple",
        colorJ: "purple",
        iterations: iteration,
        swaps: swap,
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
        keyValue: key.toString(),
      });

      array[j + 1] = array[j];

      animations.push({
        valueI: array[j + 1],
        valueJ: array[j],
        indexI: j + 1,
        indexJ: j,
        colorI: "red",
        colorJ: "red",
        iterations: iteration,
        swaps: swap,
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
        keyValue: key.toString(),
      });

      animations.push({
        valueI: array[j + 1],
        valueJ: array[j],
        indexI: j + 1,
        indexJ: j,
        colorI: "transparent",
        colorJ: "transparent",
        iterations: iteration,
        swaps: swap,
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
        keyValue: key.toString(),
      });

      j--;
    }

    animations.push({
      valueI: array[j + 1],
      valueJ: array[j + 1],
      indexI: j + 1,
      indexJ: j + 1,
      colorI: "purple",
      colorJ: "purple",
      iterations: iteration,
      swaps: swap,
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
      keyValue: key.toString(),
    });

    array[j + 1] = key;
    if (j + 1 !== i) swap++;

    animations.push({
      valueI: array[j + 1],
      valueJ: array[j + 1],
      indexI: j + 1,
      indexJ: j + 1,
      colorI: "red",
      colorJ: "red",
      iterations: iteration,
      swaps: swap,
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
      keyValue: key.toString(),
    });

    animations.push({
      valueI: array[j + 1],
      valueJ: array[j + 1],
      indexI: j + 1,
      indexJ: j + 1,
      colorI: "transparent",
      colorJ: "transparent",
      iterations: iteration,
      swaps: swap,
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
      keyValue: key.toString(),
    });
  }

  return animations;
};

const InsertionSortComponent = () => {
  return <div></div>;
};

export default InsertionSortComponent;
