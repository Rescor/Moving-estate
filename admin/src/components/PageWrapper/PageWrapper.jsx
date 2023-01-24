import React from "react";
import { Header } from "../Header/Header";
import styles from "./PageWrapper.module.css";

class PageWrapper extends React.Component {
  render() {
    return (
      <>
        <Header message={this.props.message} />
        <div className={styles.wrapper}>{this.props.children}</div>
      </>
    );
  }
}

export { PageWrapper };
