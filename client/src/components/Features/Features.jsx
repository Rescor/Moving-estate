import React from "react";
import Feature from "./Feature/Feature.jsx";
import Subtitle from "../Subtitle/Subtitle.jsx";
import styles from "./Features.module.css";

class Features extends React.Component {
  render() {
    return <>
      <Subtitle>Features</Subtitle>
      <div className={styles.features}>
        {this.props.items.map( item => { return <Feature key={item.feature} icon={item.feature}>{item.title}</Feature> } )}
      </div>
    </>
  }
}

export default Features;
