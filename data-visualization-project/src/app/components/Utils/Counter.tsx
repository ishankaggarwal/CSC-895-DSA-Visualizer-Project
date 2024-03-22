import AppContext from "@/context";
import { useContext } from "react";

export default function Counter() {
  const { iterations, swaps, visualizationCategory, visualizationOption } =
    useContext(AppContext);
  return (
    <div
      style={{ border: "1px solid black", height: "170px", padding: "20px" }}
    >
      {visualizationCategory === 0 &&
        (visualizationOption === 0 ||
          visualizationOption === 1 ||
          visualizationOption === 2) && (
          <>
            <span style={{ fontWeight: "bold" }}>Iterations: </span>
            {iterations}
            <br />
            <span style={{ fontWeight: "bold" }}>Swaps: </span>
            {swaps}
            <br />
          </>
        )}
      {visualizationCategory === 0 && visualizationOption === 0 && (
        <>
          <span style={{ fontWeight: "bold" }}>Time Complexity: </span>
          O(n^2) where n represents the number of elements in the array.
          <br />
          <span style={{ fontWeight: "bold" }}>Space Complexity: </span>
          O(1), meaning it uses constant extra space.
        </>
      )}
      {visualizationCategory === 0 && visualizationOption === 1 && (
        <>
          <span style={{ fontWeight: "bold" }}>Time Complexity: </span>
          O(n^2) where n represents the number of elements in the array.
          <br />
          <span style={{ fontWeight: "bold" }}>Space Complexity: </span>
          O(1), meaning it uses constant extra space.
        </>
      )}
      {visualizationCategory === 0 && visualizationOption === 2 && (
        <>
          <span style={{ fontWeight: "bold" }}>Time Complexity: </span>
          O(n^2) where n represents the number of elements in the array.
          <br />
          <span style={{ fontWeight: "bold" }}>Space Complexity: </span>
          O(1), meaning it uses constant extra space.
        </>
      )}
      {visualizationCategory === 0 && visualizationOption === 3 && (
        <>
          <span style={{ fontWeight: "bold" }}>Time Complexity: </span>
          O(nlog(n)) where n represents the number of elements in the array.
          <br />
          <span style={{ fontWeight: "bold" }}>Space Complexity: </span>
          O(n), meaning it requires additional extra memory.
        </>
      )}
      {visualizationCategory === 0 && visualizationOption === 4 && (
        <>
          <span style={{ fontWeight: "bold" }}>Time Complexity: </span>
          O(nlog(n)) where n represents the number of elements in the array.
          <br />
          <span style={{ fontWeight: "bold" }}>Space Complexity: </span>
          O(log(n)), meaning it requires additional space for its recursive
          calls.
        </>
      )}
      {visualizationCategory === 0 && visualizationOption === 5 && (
        <>
          <span style={{ fontWeight: "bold" }}>Time Complexity: </span>
          O(log(n)) where n represents the number of elements in the array.
          <br />
          <span style={{ fontWeight: "bold" }}>Space Complexity: </span>
          O(1), meaning it uses constant extra space.
        </>
      )}
      {visualizationCategory === 0 && visualizationOption === 6 && (
        <>
          <span style={{ fontWeight: "bold" }}>Time Complexity: </span>
          O(n+k) n represents the number of elements in the input array, and k
          represents the range of the input elements.
          <br />
          <span style={{ fontWeight: "bold" }}>Space Complexity: </span>
          O(n+k), n represents the number of elements in the input array, and k
          represents the range of the input elements.
        </>
      )}
      {visualizationCategory === 1 && visualizationOption === 0 && (
        <>
          <span style={{ fontWeight: "bold" }}>Time Complexity: </span>
          O(N) where N is the total number of nodes. Because it traverses all
          the nodes at least once.
          <br />
          <span style={{ fontWeight: "bold" }}>Space Complexity: </span>
          O(1) if no recursion stack space is considered. Otherwise, O(h) where
          h is the height of the tree.
        </>
      )}
      {visualizationCategory === 1 && visualizationOption === 1 && (
        <>
          <span style={{ fontWeight: "bold" }}>Time Complexity: </span>
          O(N) where N is the total number of nodes. Because it traverses all
          the nodes at least once.
          <br />
          <span style={{ fontWeight: "bold" }}>Space Complexity: </span>
          O(1) if no recursion stack space is considered. Otherwise, O(h) where
          h is the height of the tree.
        </>
      )}
      {visualizationCategory === 1 && visualizationOption === 2 && (
        <>
          <span style={{ fontWeight: "bold" }}>Time Complexity: </span>
          O(N) where N is the total number of nodes. Because it traverses all
          the nodes at least once.
          <br />
          <span style={{ fontWeight: "bold" }}>Space Complexity: </span>
          O(1) if no recursion stack space is considered. Otherwise, O(h) where
          h is the height of the tree.
        </>
      )}
      {visualizationCategory === 1 && visualizationOption === 3 && (
        <>
          <span style={{ fontWeight: "bold" }}>Time Complexity: </span>
          O(N) where N is the number of nodes in the binary tree.
          <br />
          <span style={{ fontWeight: "bold" }}>Space Complexity: </span>
          O(N) where N is the number of nodes in the binary tree.
        </>
      )}
      {visualizationCategory === 1 && visualizationOption === 4 && (
        <>
          <span style={{ fontWeight: "bold" }}>Time Complexity: </span>
          O(N) The tree is traversed twice, and then path arrays are compared.
          <br />
          <span style={{ fontWeight: "bold" }}>Space Complexity: </span>
          O(H) where H is the height of the tree.
        </>
      )}
      {visualizationCategory === 2 && visualizationOption === 0 && (
        <>
          <span style={{ fontWeight: "bold" }}>Time Complexity: </span>
          O(V + E), where V is the number of vertices and E is the number of
          edges in the graph.
          <br />
          <span style={{ fontWeight: "bold" }}>Space Complexity: </span>
          O(V + E), since an extra visited array of size V is required, And
          stack size for iterative call to DFS function.
        </>
      )}
      {visualizationCategory === 2 && visualizationOption === 1 && (
        <>
          <span style={{ fontWeight: "bold" }}>Time Complexity: </span>
          O(V+E), where V is the number of nodes and E is the number of edges.
          <br />
          <span style={{ fontWeight: "bold" }}>Space Complexity: </span>
          O(V) for queue.
        </>
      )}
      {visualizationCategory === 2 && visualizationOption === 2 && (
        <>
          <span style={{ fontWeight: "bold" }}>Time Complexity: </span>
          O(Elog(V)), where V is the number of nodes and E is the number of
          edges.
          <br />
          <span style={{ fontWeight: "bold" }}>Space Complexity: </span>
          O(V) for priority queue.
        </>
      )}
      {visualizationCategory === 2 && visualizationOption === 3 && (
        <>
          <span style={{ fontWeight: "bold" }}>Time Complexity: </span>
          O(V+E), where V is the number of nodes and E is the number of edges.
          <br />
          <span style={{ fontWeight: "bold" }}>Space Complexity: </span>
          O(V), The extra space is needed for the stack.
        </>
      )}
      {visualizationCategory === 2 && visualizationOption === 4 && (
        <>
          <span style={{ fontWeight: "bold" }}>Time Complexity: </span>
          O(V^3), where V is the number of vertices in the graph and we run
          three nested loops each of size V
          <br />
          <span style={{ fontWeight: "bold" }}>Space Complexity: </span>
          O(V^2), to create a 2-D matrix in order to store the shortest distance
          for each pair of nodes.
        </>
      )}
      {visualizationCategory === 2 && visualizationOption === 5 && (
        <>
          <span style={{ fontWeight: "bold" }}>Time Complexity: </span>
          O(V+E), where V is the number of nodes and E is the number of edges.
          <br />
          <span style={{ fontWeight: "bold" }}>Space Complexity: </span>
          O(V), To store the visited and recursion stack O(V) space is needed.
        </>
      )}
      {visualizationCategory === 2 && visualizationOption === 6 && (
        <>
          <span style={{ fontWeight: "bold" }}>Time Complexity: </span>
          O(Elog(V)), where V is the number of nodes and E is the number of
          edges.
          <br />
          <span style={{ fontWeight: "bold" }}>Space Complexity: </span>
          O(V) for priority queue.
        </>
      )}
      {visualizationCategory === 2 && visualizationOption === 7 && (
        <>
          <span style={{ fontWeight: "bold" }}>Time Complexity: </span>
          O(N) where N is the number of nodes in the graph.
          <br />
          <span style={{ fontWeight: "bold" }}>Space Complexity: </span>
          O(N) where N is the number of nodes in the graph.
        </>
      )}
    </div>
  );
}
