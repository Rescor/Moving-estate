import React from "react";
import { Slide } from "../Slide/Slide.jsx";
import styles from "./Thumbs.module.css";

class Thumbs extends React.Component {
  render() {
    const { slides, currentImage, thumbsRef, changeSlide } = this.props;

    return <div ref={thumbsRef} className={styles.thumbs_slider}>
      {slides.map((slide, i) => {
        const isFocused = currentImage === i;

        return <Slide image={slide.link} key={slide.imageId} handleSlideClick={() => changeSlide(i)} isFocused={isFocused} />
      })}
  </div>
  }
}

export { Thumbs };
