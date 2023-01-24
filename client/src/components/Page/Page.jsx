import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer.jsx";
import styles from "./Page.module.css";

class Page extends React.Component {
  className() {
    if (this.props.hasSidebar) return styles.main_wrapper;
  }

  render() {
    return <>
      <Header>{this.props.title}</Header>
      <main className={this.className()}>
        {this.props.children}
      </main>
      <Footer />
    </>
  }
}

export { Page };
