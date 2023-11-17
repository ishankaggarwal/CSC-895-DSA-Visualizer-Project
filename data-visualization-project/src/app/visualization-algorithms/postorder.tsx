import { BinaryTreeAnimationInterface, Node } from "../components/Utils/BinaryTree";


export const traverseTreePostOrder = (root : Node | null,animations: BinaryTreeAnimationInterface[])=>
{
    if(root===null)
    {
        return;
    }
    if(root.left!==null)
    {
    animations.push(
        {
            type: "link",
            currentLineMarkers: [{startRow: 5, startCol: 0, endRow: 5, endCol: 1000, className: 'myMarker',type: 'text'}],
            color: "red",
            linkId: root.id+'-'+root.left.id
        }
    );
    traverseTreePostOrder(root.left,animations);
    }
    if(root.right!==null)
    {
    animations.push(
        {
            type: "link",
            currentLineMarkers: [{startRow: 8, startCol: 0, endRow: 8, endCol: 1000, className: 'myMarker',type: 'text'}],
            color: "red",
            linkId: root.id+'-'+root.right.id
        }
    );
    traverseTreePostOrder(root.right,animations);
    }
    animations.push(
        {
            type: "node",
            currentLineMarkers: [{startRow: 11, startCol: 0, endRow: 11, endCol: 1000, className: 'myMarker',type: 'text'}],
            color: "red",
            nodeId: root.id
        }
    );

}

const PostorderTraversalComponent = ()=>{
    return(
        <div></div>
    )
}

export default PostorderTraversalComponent;