import React from "react";
import PropertyInfo from "../PropertyInfo/PropertyInfo.jsx";
import styles from "./Title.module.css";

class Title extends React.Component {
  render() {
    return <div className={styles.wrapper}>
      <h2 className={styles.property_title}>{this.props.name}</h2>
      <span className={styles.property_city_area}>{this.props.location.join(", ")}</span>
      <PropertyInfo
        type={this.props.type}
        area={this.props.area}
        beds={this.props.bedrooms}
        baths={this.props.bathrooms}
        isCentered={false}
        id={this.props.id}
      />
    </div>
  }
}

export default Title;
