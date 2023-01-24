import React from "react";
import PriceLabel from "../PriceLabel/PriceLabel.jsx";
import { Sliders } from "./Sliders/Sliders.jsx";
import styles from "./Gallery.module.css";

class Gallery extends React.Component {
  render() {
    const { images, type, mode, price } = this.props;

    return <div className={styles.gallery_wrapper}>
      <PriceLabel
        type={type}
        mode={mode}
        price={price}
      />
      <div className={styles.sliders_wrapper}>
        <Sliders slides={images} />
      </div>
    </div>
  }
}

export { Gallery };
