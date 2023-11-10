import { ArrayVisualizationAnimationInterface } from "../interfaces/ArrayVIsualizationInterface";

export const BubbleSort = (array: number[])=>{
    let animations : ArrayVisualizationAnimationInterface[] = [];
    const n = array.length;
    let swapped = false;
    for (let i=0;i<n;i++)
    {
        swapped = false;
        for(let j=0;j<n-i-1;j++)
        {
            animations.push({
                'colorI': 'yellow',
                'colorJ': 'yellow',
                valueI: array[j],
                valueJ: array[j+1],
                indexI: j,
                indexJ: j+1
            })
            if (array[j] > array[j + 1]) 
            {
                // Swap arr[j] and arr[j+1]
                animations.push({
                    'colorI': 'purple',
                    'colorJ': 'purple',
                    valueI: array[j],
                    valueJ: array[j+1],
                    indexI: j,
                    indexJ: j+1
                })
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
                animations.push({
                    'colorI': 'red',
                    'colorJ': 'red',
                    valueI: array[j],
                    valueJ: array[j+1],
                    indexI: j,
                    indexJ: j+1
                })
                swapped = true;
            }
            animations.push({
                'colorI': 'transparent',
                'colorJ': 'transparent',
                valueI: array[j],
                valueJ: array[j+1],
                indexI: j,
                indexJ: j+1
            })
            if(swapped==false)
            {
                break;
            }
        }
    }

    return animations;
}

const BubbleSortComponent = ()=>{
    return(
        <div></div>
    )
}

export default BubbleSortComponent;