import React from "react";
import classes from "./Amenity.module.css";

class Amenity extends React.Component {
  render() {
    let isAvailable = this.props.available
      ? classes.li_available
      : classes.li_not_available;

    return <li className={isAvailable}>{this.props.children}</li>;
  }
}

export default Amenity;
