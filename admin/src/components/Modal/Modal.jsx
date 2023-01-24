import React from "react";
import { Title } from "../Title/Title.jsx";
import styles from "./Modal.module.css";

class Modal extends React.Component {
  render() {
    return <div className={styles.overlay}>
      <div className={styles.wrapper}>
        <Title>{this.props.title}</Title>
        {this.props.children}
      </div>
    </div>
  }
}

export { Modal };
