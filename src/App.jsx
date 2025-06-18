import { useState, useEffect, useRef } from "react";

export default function App() {
  const [array, setArray] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const stopRef = useRef(false);

  useEffect(() => {
    generateNewArray();
  }, []);

  function generateNewArray() {
    if (isSorting) return; // prevent array reset while sorting
    const newArr = [];
    for (let i = 0; i < 40; i++) {
      newArr.push(Math.floor(Math.random() * 300) + 20);
    }
    setArray(newArr);
  }

  async function bubbleSort() {
    setIsSorting(true);
    stopRef.current = false;

    let arr = [...array];
    const bars = document.querySelectorAll(".bar");

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (stopRef.current) {
          setIsSorting(false);
          resetBarColors();
          return;
        }

        bars[j].style.backgroundColor = "red";
        bars[j + 1].style.backgroundColor = "red";

        if (arr[j] > arr[j + 1]) {
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          setArray([...arr]);
        }

        await new Promise((resolve) => setTimeout(resolve, 50));

        bars[j].style.backgroundColor = "#4caf50";
        bars[j + 1].style.backgroundColor = "#4caf50";
      }
      bars[arr.length - 1 - i].style.backgroundColor = "blue"; // sorted bar
    }
    setIsSorting(false);
  }

  function stopSorting() {
    stopRef.current = true;
  }

  function resetBarColors() {
    const bars = document.querySelectorAll(".bar");
    bars.forEach((bar) => (bar.style.backgroundColor = "#4caf50"));
  }

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
        backgroundColor: "#f0f0f0",
      }}
    >
      <h1>Sorting Visualiser</h1>

      <div>
        <button onClick={generateNewArray} disabled={isSorting}>
          Generate New Array
        </button>
        <button
          onClick={bubbleSort}
          disabled={isSorting}
          style={{ marginLeft: 10 }}
        >
          Start Bubble Sort
        </button>
        <button
          onClick={stopSorting}
          disabled={!isSorting}
          style={{ marginLeft: 10 }}
        >
          Stop Sorting
        </button>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          height: 320,
          gap: 2,
          width: "80vw",
          maxWidth: 800,
          border: "1px solid #ccc",
          backgroundColor: "white",
          padding: 10,
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          borderRadius: 8,
        }}
      >
        {array.map((height, idx) => (
          <div
            key={idx}
            className="bar"
            style={{
              backgroundColor: "#4caf50",
              height: `${height}px`,
              width: 15,
              transition: "height 0.3s ease",
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
