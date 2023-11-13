import { ArrayVisualizationAnimationInterface, ArrayVisualizationInterface } from "@/app/interfaces/ArrayVIsualizationInterface";
import { BubbleSort } from "@/app/visualization-algorithms/bubblesort";
import AppContext from "@/context";
import { faPlay, faStop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import BinaryTreeComponent, { BinaryTree, BinaryTreeAnimationInterface, Link, Node, NodeTree } from "../Utils/BinaryTree";
import * as d3 from 'd3';
import { traverseTreeInorder } from "@/app/visualization-algorithms/inordertraversal";

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

export interface NodeWidthAndHeight{
    id: number;
    width: number;
    height: number
}

const length = (d : any) => {
    return Math.sqrt(Math.pow(d.parent.x - d.x, 2) + Math.pow(d.parent.y - d.y, 2))
  }

  const width = 800
  const height = 600
  const margin = 20
  const radius = 10

const BinaryTreeVisualizer = () =>{


    const {
        visualizationOption,
        speedValue,
        isPlaying,
        input,
        setMarkers
    }  = useContext(AppContext);

    const [speed, setSpeed] = useState<number>(1);
    const [isPlayingValue,setIsPlayingValue] = useState<boolean>(true);
    const speedRef = useRef<number>(speed);
    const isPlayingRef = useRef<boolean>(isPlayingValue);
    let binaryTreeRef = useRef<BinaryTree>();
    let nodesRef = useRef<any>();
    let linksRef = useRef<any>();
    let svgRef = useRef<any>();
    const [nodes,setNodes] = useState<NodeTree[]>([]);
    const [links,setLinks] = useState<Link[]>([]);
    const [nodesWidthAndHeight,setNodesWidthAndHeight] = useState<NodeWidthAndHeight[]>([]);

    const [tree,setTree] = useState<any>(null);

    const [height,setHeight] = useState<number>(300);
    const [width,setWidth] = useState<number>(300);

    const animationsRef = useRef<BinaryTreeAnimationInterface[]>([]);

    const [animations,setAnimations] = useState<BinaryTreeAnimationInterface[]>([]);

    const initialCreateRef = useRef<boolean>(false);

    const initalNodesRef = useRef<NodeTree[]>([]);

    const initalLinksRef = useRef<Link[]>([]);


    useEffect(()=>{
        isPlayingRef.current = isPlayingValue;
        processAnimations();
    },[isPlayingValue]);

    useEffect(() => {
        speedRef.current = speed;
    }, [speed]);

    useEffect(()=>{
        setIsPlayingValue(isPlaying);

   },[isPlaying])

    useEffect(()=>{
        setSpeed(speedValue);
   },[speedValue])

    useEffect(()=>{
        createTree(input);
    },[input]);

    useEffect(()=>{
        if(initialCreateRef.current)
        {
        getWidthAndHeightOfNodes();
        }
    },[nodes]);

    useEffect(()=>{
        async function rerender(){
            animationsRef.current = [...animations];
            await processAnimations();
        }
        rerender();
    },[animations]);

    const createTree = (arr:number[])=>{
        initialCreateRef.current = true;
        const binaryTree = new BinaryTree();
        const nodes = binaryTree.createTree(arr);
        setHeight(binaryTree.returnHeight());
        setWidth(binaryTree.returnWidth());
        setNodes(nodes);
        binaryTreeRef.current = binaryTree;
    }

    const getWidthAndHeightOfNodes = () =>{
        let nodesWidthAndHeight : NodeWidthAndHeight[] = [];
        nodes.forEach(node=>{
            const width = document.getElementById("node"+node.id)?.offsetWidth;
            const height = document.getElementById("node"+node.id)?.offsetHeight;
            if(width && height)
            nodesWidthAndHeight.push(
                {
                    id: node.id,
                    width: width,
                    height: height
                }
            )
        })
        const links = binaryTreeRef.current?.createLinks(nodesWidthAndHeight);
        if(links)
        {
        setLinks(links);
        }
    }

    const visualizeTree = async (root: Node| null) =>{
        let animations : BinaryTreeAnimationInterface[] = [];
        if(visualizationOption===0)
        {
            traverseTreeInorder(root,animations);
        }
        if(animationsRef.current.length>0)
        {
            setAnimations([]);
            createTree(input);
        }
        else{
            setAnimations(animations);
        }
    }

    const processAnimations = async ()=>{
        initialCreateRef.current = false;
        if(animationsRef.current.length>0)
        {
            if(isPlayingRef.current)
            {
                const animation = animationsRef.current.shift();
                let newNodes = [...nodes];
                let newLinks = [...links];
                if(animation)
                {
                const {
                    type,
                    nodeId,
                    linkId,
                    color,
                    currentLineMarkers
                } = animation;
                if(type==="node")
                {
                    for(let i=0;i<newNodes.length;i++)
                    {
                        if(newNodes[i].id===nodeId)
                        {
                            newNodes[i].color = color;
                        }
                    }
                }
                else if(type==="link")
                {
                    for(let i=0;i<newLinks.length;i++)
                    {
                        if(newLinks[i].id===linkId)
                        {
                            newLinks[i].color = color;
                        }
                    }
                }
                setMarkers(currentLineMarkers);
                setNodes(newNodes);
                setLinks(newLinks);
                await sleep(1000/speedRef.current);
                setAnimations(animationsRef.current);
                }
            }
        }
        else{
            initialCreateRef.current = true;
            createTree(input);
        }
    }

    return(
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: '100%',
            overflow: 'scroll',
            padding: '10px'
        }}>
            <div style={{
                position: 'relative',
                width: width,
                height: height,
                alignSelf: 'flex-start',
            }}>
            {
                nodes.map(node=>{
                    return(
                        <div style={{
                            top: node.x,
                            left: node.y,
                            backgroundColor: node.color,
                            position: 'absolute',
                            padding: '10px',
                            borderWidth: '1px',
                            borderRadius: '100px',
                            borderStyle: 'solid'
                        }} key={node.id} id={"node"+node.id}> 
                            {
                                node.value
                            }
                        </div>
                    )
                })
            }
            {
            <svg width={width} height={height} style={{
                position: 'absolute',
            }}>
                {
                    links.map(link=>{
                        return(
                            <line x1={link.sy} y1={link.sx} x2={link.ey} y2={link.ex}  stroke={link.color} strokeWidth="2" />
                        )
                    })
                }
                        </svg>
            }
            </div>
            <div style={{
                marginTop: '30px',
            }}>
                <Button onClick={async ()=>{
                    if(binaryTreeRef.current?.root)
                    await visualizeTree(binaryTreeRef.current.root);
                }}>
                    {
                        animationsRef.current.length >0  ? <FontAwesomeIcon icon={faStop}/> :
                        <FontAwesomeIcon icon={faPlay}/>
}
                </Button>
            </div>
        </div>
    )
}

export default BinaryTreeVisualizer;