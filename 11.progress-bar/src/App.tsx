import "./App.css";
import ProgressBar from "./components/ProgressBar/ProgressBar";
import { useState, useEffect } from "react";

function App() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setValue((value) => value + 1);
    }, 100);
  }, []);

  return (
    <div className="App">
      <ProgressBar value={value} />
    </div>
  );
}

export default App;
