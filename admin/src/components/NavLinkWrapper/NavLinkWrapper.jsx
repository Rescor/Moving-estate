import React from "react";
import { NavLink } from "react-router-dom";
import { MenuButton } from "../../controls/MenuButton/MenuButton.jsx";
import styles from "./NavLinkWrapper.module.css";

class NavLinkWrapper extends React.Component {
  render() {
    const { propertyId, text, type, disabled } = this.props;

    return (
      <div className={styles.nav_link_wrapper}>
        <NavLink
          onClick={(event) => disabled && event.preventDefault()}
          to={`/properties/${propertyId}/${type}/new`}
          className={styles.nav_link}
        >
          <MenuButton isDisabled={disabled} text={text} />
        </NavLink>
      </div>
    );
  }
}

export { NavLinkWrapper };
