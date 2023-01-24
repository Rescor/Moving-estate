import React from "react";
import styles from "./Title.module.css";

class Title extends React.Component {
  render() {
    return <div className={styles.center}>
      <h2>{this.props.children}</h2>
    </div>
  }
}

export { Title };
