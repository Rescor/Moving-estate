import React from "react";
import styles from "./Description.module.css";

class Description extends React.Component {
  render() {
    return <p className={styles.description_component}>{this.props.children}</p>
  }
}

export default Description;
