import React from "react";
import styles from "../../custom_CSS/loader.module.css"; // Ensure the correct path and module.css extension

const Loader = () => {
  return (
    <div className={styles.loader}>
      <p className={styles.loadingText}>Loading...</p>
    </div>
  );
};

export default Loader;
