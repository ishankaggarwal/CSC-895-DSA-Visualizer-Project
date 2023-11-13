import { ArrayVisualizationAnimationInterface } from "../interfaces/ArrayVisualizationInterface";

export const SelectionSort = (array: number[]) => {
  let animations: ArrayVisualizationAnimationInterface[] = [];
  const n = array.length;

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;

    animations.push({
      colorI: 'yellow',
      colorJ: 'yellow',
      valueI: array[i],
      valueJ: array[minIndex],
      indexI: i,
      indexJ: minIndex,
    });

    for (let j = i + 1; j < n; j++) {
      animations.push({
        colorI: 'purple',
        colorJ: 'purple',
        valueI: array[i],
        valueJ: array[j],
        indexI: i,
        indexJ: j,
      });

      if (array[j] < array[minIndex]) {
        minIndex = j;
      }

      animations.push({
        colorI: 'transparent',
        colorJ: 'transparent',
        valueI: array[i],
        valueJ: array[j],
        indexI: i,
        indexJ: j,
      });
    }

    if (minIndex !== i) {
      animations.push({
        colorI: 'red',
        colorJ: 'red',
        valueI: array[i],
        valueJ: array[minIndex],
        indexI: i,
        indexJ: minIndex,
      });

      let temp = array[i];
      array[i] = array[minIndex];
      array[minIndex] = temp;

      animations.push({
        colorI: 'transparent',
        colorJ: 'transparent',
        valueI: array[i],
        valueJ: array[minIndex],
        indexI: i,
        indexJ: minIndex,
      });
    }
  }

  return animations;
};

const SelectionSortComponent = () => {
  return <div></div>;
};

export default SelectionSortComponent;
