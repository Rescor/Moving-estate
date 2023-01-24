import React from "react";
import { ReactComponent as AddressIcon } from "./assets/address.svg";
import { ReactComponent as PhoneIcon } from "./assets/phone.svg";
import { ReactComponent as MailIcon } from "./assets/email.svg";
import styles from "./ContactInfoItem.module.css";

class ContactInfoItem extends React.Component {
  render() {
    return <div className={styles.contact_info_item}>
      <div className={this.className()}>
        {this.icon()}
      </div>
      <a className={styles.contact_link} href={this.urlFor()}>
        {this.props.children}
      </a>
    </div>
  }

  className() {
    const names = [styles.icon];
    this.props.isFooter && names.push(styles.footer_icon);
    return names.join(" ");
  }

  icon() {
    switch(this.props.type) {
      case "address": return <AddressIcon />;
      case "phone": return <PhoneIcon />;
      case "email": return <MailIcon />;
      default: return null;
    }
  }

  urlFor() {
    switch(this.props.type) {
      case "phone": return `tel:${this.props.children}`;
      case "email": return `mailto:${this.props.children}`;
      default: return null;
    }
  }
}

export default ContactInfoItem;
