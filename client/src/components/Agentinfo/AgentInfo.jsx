import React from "react";
import Subtitle from "../Subtitle/Subtitle.jsx";
import { ContactForm } from "../ContactForm/ContactForm.jsx";
import { Spinner } from "../Spinner/Spinner.jsx";
import styles from "./AgentInfo.module.css";

class AgentInfo extends React.Component {
  state = {
    isLoading: false,
    isSuccessful: false,
    isContactForm: true
  };

  async postMessage(clientData) {
    this.setState({
      isLoading: true,
      isContactForm: false
    });

    await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ...clientData })
    })
      .then(r => {
        r.json();

        this.setState({
          isLoading: false,
          isSuccessful: true,
        });
      })
  }

  submitHandler = (messageToAgent) => {
    const { email, propertyId } = this.props;
    const clientData = {
      clientName: messageToAgent.name,
      clientEmail: messageToAgent.email,
      clientMessage: messageToAgent.textArea,
      agentEmail: email,
      propertyId: propertyId,
    };

    this.postMessage(clientData);
  }

  render() {
    const { isLoading, isSuccessful, isContactForm} = this.state;

    return (
      <section>
        <Subtitle>AGENT INFORMATION</Subtitle>
        <div className={styles.agent_info}>
          <div className={styles.info}>
            <img className={styles.agent} src={this.props.photo} alt="agent" />
              <div className={styles.name_location}>
                <h3 className={styles.name}>{this.props.name}</h3>
                <h4 className={styles.location}>{this.props.location}</h4>
              </div>
          </div>
          <div className={styles.message}>
            {isContactForm && <ContactForm onSubmit={(messageToAgent) => this.submitHandler(messageToAgent)} />}
            {isLoading && <Spinner />}
            {isSuccessful &&
            <>
              <p className={styles.thank_you}>Thank you!</p>
              <p className={styles.your_message}>Your message was sent successfully. Our agent will contact you as soon as possible!</p>
            </>}
          </div>
        </div>
      </section>
    );
  }
}

export { AgentInfo };
