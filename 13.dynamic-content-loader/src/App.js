import styles from "./App.module.css";
import DynamicContentLoader from "./components/DynamicContentLoader";

function App() {
  return (
    <div className={styles.container}>
      <DynamicContentLoader />
    </div>
  );
}

export default App;
