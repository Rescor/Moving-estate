import React from "react";
import { withRouter } from "react-router-dom";
import { ListItemLinks } from "../../ListItemLinks/ListItemLinks.jsx";
import styles from "./ImagesItem.module.css";

class ImagesItem extends React.Component {
  state = {
    propertyId: this.props.match.params.propertyId,
  };

  render() {
    const { image } = this.props;
    const { propertyId } = this.state;

    return (
      <div className={styles.wrapper}>
        <img src={image.link} className={styles.image} alt="" />
        <div className={styles.buttons_wrapper}>
          <ListItemLinks
            editPath={`/properties/${propertyId}/images/${image.imageId}/edit`}
            deletePath={`/properties/${propertyId}/images/${image.imageId}/delete`}
            aboutProps={{ link: image.link }}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(ImagesItem);
