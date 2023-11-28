import { useEffect, useState } from "react";
import styles from "./DynamicContentLoader.module.css";
import { useLRUCache } from "../hooks/useLRUCache";

const DynamicContentLoader = () => {
  const [content, setContent] = useState([]);
  const { get, put, getCachedData } = useLRUCache(3);

  const handleClick = (id) => {
    put(id, id);
    setContent(getCachedData());
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentButtonContainer}>
        <div onClick={() => handleClick(1)} className={styles.contentButton}>
          1
        </div>
        <div onClick={() => handleClick(2)} className={styles.contentButton}>
          2
        </div>
        <div onClick={() => handleClick(3)} className={styles.contentButton}>
          3
        </div>
        <div onClick={() => handleClick(4)} className={styles.contentButton}>
          4
        </div>
        <div onClick={() => handleClick(5)} className={styles.contentButton}>
          5
        </div>
      </div>
      <div className={styles.contentContainer}>
        <h3 className={styles.heading}>Dynamic Content Loader - LRU Cache</h3>
        <div className={styles.content}>
          {content?.map((item, id) => {
            return (
              <div className={styles.contentValue}>
                <span>
                  {id === 0 ? "MRU" : id === content.length - 1 && "LRU"}{" "}
                </span>
                <div
                  style={{ backgroundColor: "green" }}
                  key={id}
                  className={styles.contentButton}
                >
                  {item}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DynamicContentLoader;
