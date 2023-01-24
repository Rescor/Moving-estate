import React from "react";
import { ReactComponent as ApartmentIcon } from "../PropertyInfo/ListItem/assets/apartment.svg";
import { ReactComponent as TownhouseIcon } from "../PropertyInfo/ListItem/assets/townhouse.svg";
import styles from "./PriceLabel.module.css";

class PriceLabel extends React.Component {
  showIcon(icon) {
    switch (icon) {
      case "apartment": return <ApartmentIcon />;
      case "townhouse": return <TownhouseIcon />;
      default: return null;
    }
  }

  render() {
    return (
      <div className={styles.backdrop}>
        <div className={styles.mode_wrapper}>
          {this.showIcon(this.props.type)}
          <h4> For {this.props.mode}</h4>
        </div>
        <h3>{new Intl.NumberFormat("en-US", { maximumSignificantDigits: 3 }).format(this.props.price).replaceAll(",", " ")} $</h3>
      </div>
    )
  }
}

export default PriceLabel;
