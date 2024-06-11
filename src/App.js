import "./App.css";
import Chart from "./components/Chart/Chart";
import { generateData } from "./utils/generateData";
import { useEffect, useState } from "react";

function App() {
  const range = {
    xRange: [0, 5],
    yRange: [0, 50],
  };

  const [graph, setGraph] = useState([]);

  useEffect(() => {
    let data = generateData(range?.xRange, range?.yRange, 5);
    setGraph(data);
  },[])

  const handleGenerate = () => {
    let data = generateData(range?.xRange, range?.yRange, 5);
    setGraph(data);
  }

  return (
    <div className="App">
      <Chart
        svg_width={600}
        svg_height={500}
        range={range}
        data={graph?.data}
        minValue={graph?.minValue}
        stroke="#fff"
        fillPadding={30}
        barRadius={{x: 10, y: 10}}
        description={{x: "Raiting", y: "Number of Strings"}}
        labels={graph?.labels}
      />
      <button className="buttonR" onClick={handleGenerate}>Regenerate</button>
    </div>
  );
}

export default App;
