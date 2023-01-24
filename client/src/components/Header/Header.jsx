import React from "react";
import { NavLink } from "react-router-dom"
import Logo from "../Logo/Logo.jsx";
import classes from "./Header.module.css";

class Header extends React.Component {
  render() {
    return (
      <header className={classes.header}>
        <div className={classes.header_center} >
          <NavLink to={"/"}><Logo isFooter={false} /></NavLink>
          {this.props.children}
        </div>
      </header>
    );
  }
}

export default Header;
