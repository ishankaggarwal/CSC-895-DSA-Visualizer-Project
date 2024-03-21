import { CountingSortArrayVisualizationAnimationInterface } from "../interfaces/SelectionSortArrayVisualizationInterface";

export function counterSort(array: number[]) {
  let animations: CountingSortArrayVisualizationAnimationInterface[] = [];

  const max = Math.max(...array);
  const count = Array(max + 1).fill(0);

  for (let i = 0; i < array.length; i++) {
    count[array[i]]++;

    animations.push({
      colorI: "purple",
      valueI: count[array[i]],
      indexI: array[i],
      type: "count",
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
    animations.push({
      colorI: "purple",
      valueI: count[array[i]],
      indexI: array[i],
      type: "count",
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
  }

  // Update the array with sorted values
  let sortedIndex = 0;
  for (let i = 0; i <= max; i++) {
    animations.push({
      colorI: "yellow",
      valueI: count[i],
      indexI: i,
      type: "count",
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
    while (count[i] > 0) {
      animations.push({
        colorI: "yellow",
        valueI: i,
        indexI: sortedIndex,
        type: "output",
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

      array[sortedIndex++] = i;
      count[i]--;

      animations.push({
        colorI: "yellow",
        valueI: count[i],
        indexI: i,
        type: "count",
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
  }
  return animations;
}
