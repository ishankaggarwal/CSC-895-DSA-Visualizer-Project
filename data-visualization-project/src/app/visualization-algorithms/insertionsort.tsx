import { ArrayVisualizationAnimationInterface } from "../interfaces/ArrayVisualizationInterface";

export const InsertionSort = (array: number[]) => {
  let animations: ArrayVisualizationAnimationInterface[] = [];
  const n = array.length;

  for (let i = 1; i < n; i++) {
    let key = array[i];
    let j = i - 1;

    animations.push({
      colorI: 'yellow',
      colorJ: 'yellow',
      valueI: key,
      valueJ: array[j],
      indexI: i,
      indexJ: j,
    });

    while (j >= 0 && array[j] > key) {
      animations.push({
        colorI: 'purple',
        colorJ: 'purple',
        valueI: key,
        valueJ: array[j],
        indexI: i,
        indexJ: j + 1,
      });

      array[j + 1] = array[j];
      j--;

      animations.push({
        colorI: 'red',
        colorJ: 'red',
        valueI: key,
        valueJ: array[j],
        indexI: i,
        indexJ: j + 1,
      });
    }

    array[j + 1] = key;

    animations.push({
      colorI: 'transparent',
      colorJ: 'transparent',
      valueI: key,
      valueJ: array[j + 1],
      indexI: i,
      indexJ: j + 1,
    });
  }

  return animations;
};

const InsertionSortComponent = () => {
  return <div></div>;
};

export default InsertionSortComponent;
