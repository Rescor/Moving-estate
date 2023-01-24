import React from "react";
import styles from "./Subtitle.module.css";

class Subtitle extends React.Component {
  render() {
    return <h2 className={styles.subtitle_section_name}>{this.props.children}</h2>
  }
}

export default Subtitle;
