import { CountingSortArrayVisualizationAnimationInterface } from "../interfaces/SelectionSortArrayVisualizationInterface";

export function counterSort(array: number[]) {
  let animations: CountingSortArrayVisualizationAnimationInterface[] = [];

  // Find the maximum value in the array
  const max = Math.max(...array);

  // Initialize count array with zeros
  const count = Array(max + 1).fill(0);

  // Count the occurrences of each element in the array
  for (let i = 0; i < array.length; i++) {
    count[array[i]]++;

    animations.push({
      colorI: "purple",
      valueI: count[array[i]],
      indexI: array[i],
      type: "count",
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
    });
    while (count[i] > 0) {
      animations.push({
        colorI: "yellow",
        valueI: i,
        indexI: sortedIndex,
        type: "output",
      });

      array[sortedIndex++] = i;
      count[i]--;

      animations.push({
        colorI: "yellow",
        valueI: count[i],
        indexI: i,
        type: "count",
      });
    }
  }
  return animations;
}
