import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./PropertyTabs.module.css";

class PropertyTabs extends React.Component {
  className(isActive) {
    const classes = [styles.tab];

    isActive ? classes.push(styles.selected) : classes.push(styles.not_selected);

    return classes.join(" ");
  }

  render() {
    const { propertyId } = this.props;

    return <nav className={styles.nav}>
      <NavLink className={isActive => this.className(isActive)} to={`/properties/${propertyId}/images`}>Images</NavLink>
      <NavLink className={isActive => this.className(isActive)} to={`/properties/${propertyId}/amenities`}>Amenities</NavLink>
      <NavLink className={isActive => this.className(isActive)} to={`/properties/${propertyId}/floor_plans`}>Floor plans</NavLink>
      <NavLink className={isActive => this.className(isActive)} to={`/properties/${propertyId}/features`}>Features</NavLink>
    </nav>
  }
}

export { PropertyTabs };
