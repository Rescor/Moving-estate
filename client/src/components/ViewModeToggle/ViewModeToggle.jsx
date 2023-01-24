import React from "react";
import { Button } from "../../controls/Button/Button.jsx";
import { ReactComponent as ListModeIcon } from "./assets/listMode.svg";
import { ReactComponent as GridModeIcon } from "./assets/gridMode.svg";
import styles from "./ViewModeToggle.module.css";

class ViewModeToggle extends React.Component {
  render() {
    return (
      <div className={styles.view_mode_wrapper}>
        <span>View Mode:</span>
        {this.viewModeButtons("grid")}
        {this.viewModeButtons("list")}
      </div>
    );
  }

  viewModeButtons(mode) {
    const currentMode = this.props.mode;
    const props = {
      size: "m",
    };
    mode === currentMode && (props.isFocused = true);
    mode === "grid" ? (props.roundedLeft = true) : (props.roundedRight = true);
    return (
      <Button
        {...props}
        onClick={() => {
          this.props.onChange(`${mode}`);
        }}
      >
        {this.icon(mode)}
      </Button>
    );
  }

  icon(mode) {
    switch (mode) {
      case "grid":
        return <GridModeIcon />;
      case "list":
        return <ListModeIcon />;
      default:
        return null;
    }
  }
}

export default ViewModeToggle;
