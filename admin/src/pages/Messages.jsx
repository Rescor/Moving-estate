import React from "react";
import { withRouter, Redirect } from "react-router-dom";
import { PageWrapper } from "../components/PageWrapper/PageWrapper.jsx";
import { PropertyMessages } from "../components/PropertyMessages/PropertyMessages.jsx";
import { Spinner } from "../components/Spinner/Spinner.jsx";
import { Context } from "../Context/Context.js";
import { MenuButton } from "../controls/MenuButton/MenuButton.jsx";

class Messages extends React.Component {
  state = {
    propertyMessages: [],
    isLoading: true,
    hasAccess: false,
    propertyId: this.props.match.params.propertyId,
  };

  getPropertyMessages() {
    const { propertyId } = this.state;

    this.setState({ isLoading: true });

    const email = this.context.email;

    fetch(`/api/properties/messages/${propertyId}?email=${email}`)
      .then((res) => res.json())
      .then((messages) => {
        this.setState({
          propertyMessages: messages,
          hasAccess: true,
        });
      })
      .finally(() => this.setState({ isLoading: false }));
  }

  componentDidMount() {
    this.getPropertyMessages();
  }

  render() {
    const { propertyMessages, isLoading, hasAccess, propertyId } = this.state;

    if (isLoading) return <Spinner />;

    if (hasAccess)
      return (
        <PageWrapper message={`Messages regarding property: ${propertyId}`}>
          <MenuButton text="To properties" href={`/admin/properties`} />
          <PropertyMessages propertyMessages={propertyMessages} />
        </PageWrapper>
      );

    return <Redirect to="/properties" />;
  }
}

Messages.contextType = Context;

export default withRouter(Messages);
