import { BinaryTreeAnimationInterface, Node } from "../components/Utils/BinaryTree";


export const traverseTreePreorder = (root : Node | null,animations: BinaryTreeAnimationInterface[])=>
{
    if(root===null)
    {
        return;
    }
    animations.push(
        {
            type: "node",
            currentLineMarkers: [{startRow: 5, startCol: 0, endRow: 5, endCol: 1000, className: 'myMarker',type: 'text'}],
            color: "red",
            nodeId: root.id
        }
    );
    if(root.left!==null)
    {
    animations.push(
        {
            type: "link",
            currentLineMarkers: [{startRow: 8, startCol: 0, endRow: 8, endCol: 1000, className: 'myMarker',type: 'text'}],
            color: "red",
            linkId: root.id+'-'+root.left.id
        }
    );
    traverseTreePreorder(root.left,animations);
    }
    if(root.right!==null)
    {
    animations.push(
        {
            type: "link",
            currentLineMarkers: [{startRow: 11, startCol: 0, endRow: 11, endCol: 1000, className: 'myMarker',type: 'text'}],
            color: "red",
            linkId: root.id+'-'+root.right.id
        }
    );
    traverseTreePreorder(root.right,animations);
    }

}

const PreorderTraversalComponent = ()=>{
    return(
        <div></div>
    )
}

export default PreorderTraversalComponent;