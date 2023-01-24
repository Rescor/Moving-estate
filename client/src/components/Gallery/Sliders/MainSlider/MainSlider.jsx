import React from "react";
import { Slide } from "../Slide/Slide.jsx";
import styles from "./MainSlider.module.css";

class MainSlider extends React.Component {
  renderPrevArrow() {
    const { currentImage, changeSlide } = this.props;

    if (currentImage !== 0) {
      return <button
        onClick={() => changeSlide(currentImage - 1)}
        className={`${styles.arrow} ${styles.arrow_prev}`}
      />
    }
  }

  renderNextArrow() {
    const { slides, currentImage, changeSlide } = this.props;

    if (currentImage !== slides.length - 1) {
      return <button
        onClick={() => changeSlide(currentImage + 1)}
        className={`${styles.arrow} ${styles.arrow_next}`}
      />
    }
  }

  render() {
    const { slides, mainSliderRef } = this.props;

    return <div className={styles.main_slider_wrapper}>
      {this.renderPrevArrow()}
      <div className={styles.main_slider} ref={mainSliderRef}>
        {slides.map(slide => <Slide image={slide.link} key={slide.imageId} isMainSlide />)}
      </div>
      {this.renderNextArrow()}
    </div>
  }
}

export { MainSlider };
