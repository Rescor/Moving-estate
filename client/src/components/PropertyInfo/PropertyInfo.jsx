import React from "react";
import ListItem from "./ListItem/ListItem.jsx";
import styles from "./PropertyInfo.module.css";

class PropertyInfo extends React.Component {
  addListClassName() {
    const classes = [styles.list];
    
    if (this.props.isCentered) classes.push(styles.list_centered);

    return classes.join(" ");
  }

  render() {
    return <ul className={this.addListClassName()}>
      <ListItem info={this.props.type} icon={this.props.type} />
      <ListItem info={`${this.props.area}ft²`} icon="area" />
      <ListItem info={this.props.beds} icon="beds" />
      <ListItem info={this.props.baths} icon="baths" />
      <ListItem info={`ID: ${this.props.id}`} isCentered={this.props.isCentered} />
    </ul>
  }
}

export default PropertyInfo;
