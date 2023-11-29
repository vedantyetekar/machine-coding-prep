import { useEffect, useState } from "react";
import styles from "./App.module.css";

const config = [
  [1, 1, 1],
  [1, 0, 1],
  [1, 1, 1],
];

function App() {
  const [order, setOrder] = useState([]);
  const [isDeactivating, setIsDeactivating] = useState(false);

  const deactivateCells = () => {
    setIsDeactivating(true);
    let timer = setInterval(() => {
      setOrder((prevOrder) => {
        const newOrder = prevOrder.slice();
        newOrder.pop();
        if (newOrder.length === 0) {
          clearInterval(timer);
          setIsDeactivating(false);
        }
        return newOrder;
      });
    }, 300);
  };

  const activateCell = (indx) => {
    if (order.includes(indx)) return;
    const newOrder = [...order, indx];
    setOrder(newOrder);
    if (newOrder.length === config.flat(1).filter(Boolean).length) {
      deactivateCells();
    }
  };

  return (
    <div className={styles.container}>
      {config.flat(1).map((cell, indx) => {
        return cell ? (
          <div
            key={indx}
            onClick={() => activateCell(indx)}
            className={`${styles.cell} ${
              order.includes(indx) ? styles.activated : ""
            }`}
          ></div>
        ) : (
          <span key={indx} />
        );
      })}
    </div>
  );
}

export default App;
