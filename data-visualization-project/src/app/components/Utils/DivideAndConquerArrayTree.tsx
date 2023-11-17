import { IMarker } from "react-ace";

export class NodeTree{
    id: number;
    value: number[];
    i: number;
    j: number;
    indexI : number = 0;
    indexJ: number = 0;
    colorI: string = 'transparent';
    colorJ: string = 'transparent';
    constructor(id: number,value: number[],i:number,j:number){
        this.id = id;
        this.value = value;
        this.i=i;
        this.j=j;
        this.indexI
    }
}

export class DivideAndConquerArray{
    height: number = 0;
    Map: Map<number,NodeTree>;
    distance: number = 75;
    nodes : NodeTree[] = [];
    constructor(array: number[]){
        this.Map = new Map<number,NodeTree>();
        if(array.length>0)
        {
        this.height=this.getHeight(array);
        const n = Math.pow(2,this.height+1)-1;
        this.createNodesOfArray(array,0,this.floorDivision(n-1,2));
        this.nodes[0].value = array;
        }
    }

    floorDivision(a:number,b:number) {
        return Math.floor(a / b);
    }

    getHeight(array: number[]) : number{
        if (array.length===1)
        {
            return 0;
        }
        const mid = this.floorDivision(array.length,2);
        return 1 + this.getHeight(array.slice(mid));
    }

    createNodesOfArray(array: number[],i: number,j:number){
        let nodeTree = new NodeTree(j,[],i*this.distance,j*this.distance);
        this.Map.set(j,nodeTree);
        this.nodes.push(nodeTree);
        if(array.length===1)
        {
            return;
        }
        const mid = this.floorDivision(array.length,2);
        const diff = Math.pow(2,this.height-i-1);
        this.createNodesOfArray(array.slice(0,mid),i+1,j-diff);
        this.createNodesOfArray(array.slice(mid),i+1,j+diff);
    }

    returnHeight(){
        return (this.height+1)*this.distance;
      }
  
      returnWidth(){
        return  (Math.pow(2,this.height+1) - 1)*this.distance;
      }

      returnInitialJPosition(){
        const n = Math.pow(2,this.height+1) - 1;
        return this.floorDivision(n-1,2);
        
      }
}