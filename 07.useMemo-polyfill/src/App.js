import { useState } from "react";
import "./App.css";
import useCustomMemo from "./custom-hooks/useCustomMemo";

function App() {
  const [counter1, setCounter1] = useState(0);
  const [counter2, setCounter2] = useState(0);

  const handleCounter1 = () => {
    setCounter1(counter1 + 1);
  };
  const handleCounter2 = () => {
    setCounter2(counter2 + 1);
  };

  const squaredCounter1 = useCustomMemo(() => {
    console.log("cnt-1");
    return counter1 * counter1;
  }, [counter1]);

  return (
    <div className="container">
      <div className="cnt-container">
        <div className="cnt-1">Counter 1: {counter1}</div>
        <div className="cnt-2">Squared Counter 1: {squaredCounter1}</div>
        <div className="cnt-2">Counter 2: {counter2}</div>
      </div>
      <div className="btn-container">
        <button onClick={handleCounter1}>+ Counter 1</button>
        <button onClick={handleCounter2}>+ Counter 2</button>
      </div>
    </div>
  );
}

export default App;
