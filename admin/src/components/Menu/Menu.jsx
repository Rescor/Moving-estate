import React from "react";
import { MenuButton } from "../../controls/MenuButton/MenuButton.jsx";
import styles from "./Menu.module.css";

class Menu extends React.Component {
  render() {
    const { onCancelClick, isDisabled } = this.props;

    return (
      <div className={styles.buttons_wrapper}>
        <MenuButton isDisabled={isDisabled} type="submit" text="Save" />
        <MenuButton handleClick={onCancelClick} text="Cancel" />
      </div>
    );
  }
}

export { Menu };
