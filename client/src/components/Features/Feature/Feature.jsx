import React from "react";
import { ReactComponent as PawIcon } from "./assets/paw.svg";
import { ReactComponent as PoolIcon } from "./assets/pool.svg";
import { ReactComponent as FenceIcon } from "./assets/fence.svg";
import styles from "./Feature.module.css";

class Feature extends React.Component {
  icon() {
    switch(this.props.icon) {
      case "paw": return <PawIcon />;
      case "pool": return <PoolIcon />;
      case "fence": return <FenceIcon />;
      default: return null;
    }
  }

  render() {
    return <div className={styles.feature_component}>
      {this.icon()}
      {this.props.children}
    </div>
  }
}

export default Feature;
