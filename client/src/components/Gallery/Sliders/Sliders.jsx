import React from "react";
import { Thumbs } from "./Thumbs/Thumbs.jsx";
import { MainSlider } from "./MainSlider/MainSlider.jsx";

class Sliders extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentImage: 0,
    };

    this.mainSliderRef = React.createRef();
    this.thumbsRef = React.createRef();
  }

  changeImage(currentImageIndex) {
    if (this.state.currentImage === currentImageIndex) return;

    this.setState({
      currentImage: currentImageIndex
    });
  }

  offsets(prevImage) {
    const { slides } = this.props;
    const { currentImage } = this.state;
    const translateMainValue = 1000 * currentImage;
    let translateThumbsValue = 0;
    const thumbWidth = 250;

    if (currentImage >= slides.length - 2) {
      translateThumbsValue = thumbWidth * (slides.length - 4);
    } else if (currentImage > 0) {
      if (prevImage > currentImage) {
        translateThumbsValue = thumbWidth * currentImage - thumbWidth * 2;
      } else {
        translateThumbsValue = thumbWidth * currentImage - thumbWidth;
      }
    }

    this.mainSliderRef.current.style.transform = `translateX(-${translateMainValue}px)`;
    this.thumbsRef.current.style.transform = `translateX(-${translateThumbsValue}px)`;
  }

  componentDidUpdate(_, prevState) {
    const { currentImage } = this.state;
    const prevImage = prevState.currentImage;

    if (prevImage === currentImage) return;

    this.offsets(prevImage);
  }

  render() {
    const { slides } = this.props;
    const { currentImage } = this.state;

    return <>
      <MainSlider
        slides={slides}
        mainSliderRef={this.mainSliderRef}
        currentImage={currentImage}
        changeSlide={index => this.changeImage(index)}
      />
      <Thumbs
        thumbsRef={this.thumbsRef}
        slides={slides}
        currentImage={currentImage}
        changeSlide={index => this.changeImage(index)}
      />
    </>
  }
}

export { Sliders };
