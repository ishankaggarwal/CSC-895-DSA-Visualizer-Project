import { NodeTree } from "../components/Utils/DivideAndConquerArrayTree";
import { MergeSortArrayVisualizationAnimationInterface } from "../interfaces/MergeSortArrayVisualizationInterface";

function floorDivision(a:number,b:number) {
    return Math.floor(a / b);
}

export function deepCopy(object: any){
    return JSON.parse(JSON.stringify(object));
}

export function mergeSort(array: number[],map: Map<number,NodeTree>,i: number,j:number,height:number,animations: MergeSortArrayVisualizationAnimationInterface[]){
    let nodeTree = deepCopy(map.get(j));
    if(nodeTree!==undefined)
    {
        nodeTree.value = deepCopy(array);
    animations.push({
        nodeTrees: [deepCopy(nodeTree)],
        currentLineMarkers: []
    })
    map.set(j,nodeTree);
    if (array.length===1)
    {
        return array;
    }
    const mid = floorDivision(array.length,2);
    nodeTree.indexI = mid;
    nodeTree.indexJ = mid;
    nodeTree.colorI = 'yellow';
    nodeTree.colorJ = 'yellow';
    animations.push({
        nodeTrees: [deepCopy(nodeTree)],
        currentLineMarkers: []
    })
    const diff = Math.pow(2,height-i-1);
    const leftArray  = mergeSort(array.slice(0,mid),map,i+1,j-diff,height,animations);
    const rightArray = mergeSort(array.slice(mid),map,i+1,j+diff,height,animations);
    nodeTree.indexI = mid;
    nodeTree.indexJ = mid;
    nodeTree.colorI = 'transparent';
    nodeTree.colorJ = 'transparent';
    animations.push({
        nodeTrees: [deepCopy(nodeTree)],
        currentLineMarkers: []
    })
    let newArray : number[] = [];
    let k=0;
    let l=0;
    nodeTree.value = [];
    animations.push({
        nodeTrees: [deepCopy(nodeTree)],
        currentLineMarkers: []
    });
    let nodeTreeLeft = deepCopy(map.get(j-diff));
    let nodeTreeRight = deepCopy(map.get(j+diff));
    if(nodeTreeLeft!==undefined && nodeTreeRight!==undefined)
    {
    while(k<leftArray.length && l<rightArray.length){
        nodeTreeLeft.indexI = k;
        nodeTreeLeft.indexJ = k;
        nodeTreeLeft.colorI = 'purple';
        nodeTreeLeft.colorJ = 'purple';
        nodeTreeRight.indexI = l;
        nodeTreeRight.indexJ = l;
        nodeTreeRight.colorI = 'purple';
        nodeTreeRight.colorJ = 'purple';
        animations.push({
            nodeTrees: [deepCopy(nodeTreeLeft),deepCopy(nodeTreeRight)],
            currentLineMarkers: []
        });
        if(leftArray[k]<=rightArray[l])
        {
            nodeTreeLeft.indexI = k;
            nodeTreeLeft.indexJ = k;
            nodeTreeLeft.colorI = 'red';
            nodeTreeLeft.colorJ = 'red';
            animations.push({
                nodeTrees: [deepCopy(nodeTreeLeft)],
                currentLineMarkers: []
            });
            newArray.push(leftArray[k]);
            k+=1;
        }
        else{
            nodeTreeRight.indexI = l;
            nodeTreeRight.indexJ = l;
            nodeTreeRight.colorI = 'red';
            nodeTreeRight.colorJ = 'red';
            animations.push({
                nodeTrees: [deepCopy(nodeTreeRight)],
                currentLineMarkers: []
            });
            newArray.push(rightArray[l]);
            l+=1;
        }
        nodeTree.value = deepCopy(newArray);
        animations.push({
            nodeTrees: [deepCopy(nodeTree)],
            currentLineMarkers: []
        });
        nodeTreeLeft.indexI = k;
        nodeTreeLeft.indexJ = k;
        nodeTreeLeft.colorI = 'transparent';
        nodeTreeLeft.colorJ = 'transparent';
        nodeTreeRight.indexI = l;
        nodeTreeRight.indexJ = l;
        nodeTreeRight.colorI = 'transparent';
        nodeTreeRight.colorJ = 'transparent';
        animations.push({
            nodeTrees: [deepCopy(nodeTreeLeft),deepCopy(nodeTreeRight)],
            currentLineMarkers: []
        });
    }

    while(k<leftArray.length)
    {
        nodeTreeLeft.indexI = k;
        nodeTreeLeft.indexJ = k;
        nodeTreeLeft.colorI = 'purple';
        nodeTreeLeft.colorJ = 'purple';
        animations.push({
            nodeTrees: [deepCopy(nodeTreeLeft)],
            currentLineMarkers: []
        });
        nodeTreeLeft.indexI = k;
        nodeTreeLeft.indexJ = k;
        nodeTreeLeft.colorI = 'red';
        nodeTreeLeft.colorJ = 'red';
        animations.push({
            nodeTrees: [deepCopy(nodeTreeLeft)],
            currentLineMarkers: []
        });
        newArray.push(leftArray[k]);
        nodeTree.value = deepCopy(newArray);
        animations.push({
            nodeTrees: [deepCopy(nodeTree)],
            currentLineMarkers: []
        });
        nodeTreeLeft.indexI = k;
        nodeTreeLeft.indexJ = k;
        nodeTreeLeft.colorI = 'transparent';
        nodeTreeLeft.colorJ = 'transparent';
        animations.push({
            nodeTrees: [deepCopy(nodeTreeLeft)],
            currentLineMarkers: []
        });
        k+=1;
    }

    while(l<rightArray.length)
    {
        nodeTreeRight.indexI = l;
        nodeTreeRight.indexJ = l;
        nodeTreeRight.colorI = 'purple';
        nodeTreeRight.colorJ = 'purple';
        animations.push({
            nodeTrees: [deepCopy(nodeTreeRight)],
            currentLineMarkers: []
        });
        nodeTreeRight.indexI = l;
        nodeTreeRight.indexJ = l;
        nodeTreeRight.colorI = 'red';
        nodeTreeRight.colorJ = 'red';
        animations.push({
            nodeTrees: [deepCopy(nodeTreeRight)],
            currentLineMarkers: []
        });
        newArray.push(rightArray[l]);
        nodeTree.value = deepCopy(newArray);
        animations.push({
            nodeTrees: [deepCopy(nodeTree)],
            currentLineMarkers: []
        });
        nodeTreeRight.indexI = l;
        nodeTreeRight.indexJ = l;
        nodeTreeRight.colorI = 'transparent';
        nodeTreeRight.colorJ = 'transparent';
        animations.push({
            nodeTrees: [deepCopy(nodeTreeRight)],
            currentLineMarkers: []
        });
        l+=1;
    }
    }
    return newArray;
    }
    return [];
}