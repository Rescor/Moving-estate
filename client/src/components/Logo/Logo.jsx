import React from "react";
import { ReactComponent as Logotype } from "./assets/logo.svg";
import classes from "./Logo.module.css";

class Logo extends React.Component {
  render() {
    let colorLogo = [classes.logo];
    this.props.isFooter && colorLogo.push(classes.logo_color);
    return <Logotype className={colorLogo.join(" ")} />;
  }
}

export default Logo;
