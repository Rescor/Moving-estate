import React from "react";
import { NavLink } from "react-router-dom";
import { MenuButton } from "../../controls/MenuButton/MenuButton.jsx";
import styles from "./ListItemLinks.module.css";

class ListItemLinks extends React.Component {
  render() {
    const { editPath, deletePath, aboutProps } = this.props;

    return (
      <>
        <NavLink
          to={{
            pathname: editPath,
            aboutProps: aboutProps,
          }}
          className={styles.nav_link}
        >
          <MenuButton text="Edit" />
        </NavLink>
        <NavLink
          to={{
            pathname: deletePath,
          }}
          className={styles.nav_link}
        >
          <MenuButton text="Delete" />
        </NavLink>
      </>
    );
  }
}

export { ListItemLinks };
