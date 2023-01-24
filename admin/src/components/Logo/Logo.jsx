import React from "react";
import { ReactComponent as Logotype } from "./assets/logo.svg";
import styles from "./Logo.module.css";

class Logo extends React.Component {
  render() {
    return <Logotype className={styles.logo} />;
  }
}

export { Logo };
