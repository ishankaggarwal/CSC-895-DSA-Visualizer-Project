import AppContext from "@/context";
import { useContext } from "react";

export default function Counter() {
  const { iterations, swaps } = useContext(AppContext);
  return (
    <div
      style={{ border: "1px solid black", height: "105px", padding: "20px" }}
    >
      <p style={{ fontWeight: "bold", fontSize: "20px", margin: "0" }}>
        Iterations: {iterations}
      </p>
      <p style={{ fontWeight: "bold", fontSize: "20px", margin: "0" }}>
        Swaps: {swaps}
      </p>
    </div>
  );
}
