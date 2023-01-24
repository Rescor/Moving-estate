import React from "react";
import ContactInfoItem from "../ContactInfoItem/ContactInfoItem.jsx";
import Logo from "../Logo/Logo.jsx";
import styles from "./Footer.module.css";

class Footer extends React.Component {
  render() {
    return <footer>
      <div className={styles.wrapper}>
        <Logo isFooter={true} />
        <div className={styles.footer_contact}>
          <span>Contact Info</span>
          <div className={styles.contact_info}>
            <ContactInfoItem type="address" isFooter={true}>24th Street, New York, USA</ContactInfoItem>
            <ContactInfoItem type="phone" isFooter={true}>+0 123-456-7890</ContactInfoItem>
            <ContactInfoItem type="email" isFooter={true}>info@example.com</ContactInfoItem>
          </div>
        </div>
      </div>
    </footer>
  }
}

export default Footer;
