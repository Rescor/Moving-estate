import React from "react";
import Amenity from "./Amenity/Amenity.jsx";
import classes from "./Amenities.module.css";
import Subtitle from "../Subtitle/Subtitle.jsx";

class Amenities extends React.Component {
  render() {
    return (
      <section>
        <Subtitle>Amenities</Subtitle>
        <ul className={classes.amenities}>
          {this.props.items.map((elem) => (
            <Amenity key={elem.title} available={elem.available}>
              {elem.title}
            </Amenity>
          ))}
        </ul>
      </section>
    );
  }
}

export default Amenities;
