import React from "react";
import ImagesItem from "./ImagesItem/ImagesItem.jsx";

class ImagesList extends React.Component {
  render() {
    const { images, deleteImage } = this.props;

    return images.map(image => <ImagesItem image={image} key={image.link} deleteImage={deleteImage} />);
  }
}

export { ImagesList };
