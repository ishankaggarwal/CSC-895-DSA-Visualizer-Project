import { SelectionSortArrayVisualizationAnimationInterface } from "../interfaces/SelectionSortArrayVisualizationInterface";

export const SelectionSort = (array: number[]) => {
  let animations: SelectionSortArrayVisualizationAnimationInterface[] = [];
  const n = array.length;
  let swap = 0;
  let iteration = 0;
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    iteration++;

    animations.push({
      colorI: "yellow",
      colorJ: "yellow",
      valueI: array[i],
      valueJ: array[i],
      indexI: i,
      indexJ: i,
      iterations: iteration,
      swaps: swap,
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
      minValue: array[i].toString(),
      minIndex: i.toString(),
    });

    animations.push({
      colorI: "transparent",
      colorJ: "transparent",
      valueI: array[i],
      valueJ: array[i],
      indexI: i,
      indexJ: i,
      iterations: iteration,
      swaps: swap,
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
      minValue: array[i].toString(),
      minIndex: i.toString(),
    });

    for (let j = i + 1; j < n; j++) {
      iteration++;
      animations.push({
        colorI: "purple",
        colorJ: "purple",
        valueI: array[j],
        valueJ: array[j],
        indexI: j,
        indexJ: j,
        iterations: iteration,
        swaps: swap,
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
        minValue: array[minIndex].toString(),
        minIndex: minIndex.toString(),
      });

      if (array[j] < array[minIndex]) {
        minIndex = j;
        animations.push({
          colorI: "red",
          colorJ: "red",
          valueI: array[j],
          valueJ: array[j],
          indexI: j,
          indexJ: j,
          iterations: iteration,
          swaps: swap,
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
          minValue: array[minIndex].toString(),
          minIndex: minIndex.toString(),
        });
      }

      animations.push({
        colorI: "transparent",
        colorJ: "transparent",
        valueI: array[j],
        valueJ: array[j],
        indexI: j,
        indexJ: j,
        iterations: iteration,
        swaps: swap,
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
        minValue: array[minIndex].toString(),
        minIndex: minIndex.toString(),
      });
    }

    if (minIndex !== i) {
      swap++;
      animations.push({
        colorI: "purple",
        colorJ: "purple",
        valueI: array[i],
        valueJ: array[minIndex],
        indexI: i,
        iterations: iteration,
        swaps: swap,
        indexJ: minIndex,
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
        minValue: array[minIndex].toString(),
        minIndex: minIndex.toString(),
      });

      let temp = array[i];
      array[i] = array[minIndex];
      array[minIndex] = temp;

      animations.push({
        colorI: "red",
        colorJ: "red",
        valueI: array[i],
        valueJ: array[minIndex],
        indexI: i,
        indexJ: minIndex,
        iterations: iteration,
        swaps: swap,
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
        minValue: array[minIndex].toString(),
        minIndex: minIndex.toString(),
      });

      animations.push({
        colorI: "transparent",
        colorJ: "transparent",
        valueI: array[i],
        valueJ: array[minIndex],
        indexI: i,
        indexJ: minIndex,
        iterations: iteration,
        swaps: swap,
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
        minValue: array[minIndex].toString(),
        minIndex: minIndex.toString(),
      });
    }
  }

  return animations;
};

const SelectionSortComponent = () => {
  return <div></div>;
};

export default SelectionSortComponent;
