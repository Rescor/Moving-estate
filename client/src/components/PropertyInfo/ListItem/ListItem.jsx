import React from "react";
import { ReactComponent as ApartmentIcon } from "./assets/apartment.svg";
import { ReactComponent as TownhouseIcon } from "./assets/townhouse.svg";
import { ReactComponent as AreaIcon } from "./assets/area.svg";
import { ReactComponent as BedsIcon } from "./assets/beds.svg";
import { ReactComponent as BathsIcon } from "./assets/baths.svg";
import styles from "./ListItem.module.css";

class ListItem extends React.Component {
  showIcon(icon) {
    switch (icon) {
      case "area": return <AreaIcon />;
      case "beds": return <BedsIcon />;
      case "baths": return <BathsIcon />;
      case "apartment": return <ApartmentIcon />;
      case "townhouse": return <TownhouseIcon />;
      default: return null;
    }
  }

  addListItemClassName() {
    const classes = [styles.list_item];

    if (this.props.info.toString().includes("ID")) classes.push(styles.id_provided);
    if (this.props.isCentered && this.props.info.toString().includes("ID")) classes.push(styles.centered);

    return classes.join(" ");
  }

  render() {
    /* The second check is for cases of getting id-prop and area-prop, because we passed there not just a prop value, but a string including this prop value */
    if (typeof this.props.info === "undefined" || this.props.info.toString().includes("undefined")) return null;

    return <li className={this.addListItemClassName()}>
      {this.showIcon(this.props.icon)}
      <span>{this.props.info}</span>
    </li>
  }
}

export default ListItem;
