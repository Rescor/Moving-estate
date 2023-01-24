import React from "react";
import { NavLink } from "react-router-dom";
import { Logo } from "../Logo/Logo.jsx";
import { MenuButton } from "../../controls/MenuButton/MenuButton.jsx";
import styles from "./Header.module.css";

class Header extends React.Component {
  render() {
    return (
      <header className={styles.header}>
        <div className={styles.header_center}>
          <NavLink to="/">
            <Logo />
          </NavLink>
          <h2>{this.props.message}</h2>
          <MenuButton href="/api/auth/logout" text="Sign Out" />
        </div>
      </header>
    );
  }
}

export { Header };
