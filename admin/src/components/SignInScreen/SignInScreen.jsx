import React from "react";
import { MenuButton } from "../../controls/MenuButton/MenuButton";
import styles from "./SignInScreen.module.css";

class SignInScreen extends React.Component {
  render() {
    return (
      <div id={styles.sign_in_screen}>
        <MenuButton href="/api/auth/login/google" text="Sign In" />
      </div>
    );
  }
}

export { SignInScreen };
