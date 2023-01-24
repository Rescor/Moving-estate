import React from "react";
import { Redirect, withRouter } from "react-router-dom";
import { AgentForm } from "../../components/AgentForm/AgentForm.jsx";
import { Spinner } from "../../components/Spinner/Spinner.jsx";
import { Modal } from "../../components/Modal/Modal.jsx";
import BasePage from "../BasePage.jsx";
import { Context } from "../../Context/Context.js";

class EditAgent extends BasePage {
  state = {
    redirect: null,
    agentId: this.props.match.params.agentId,
    agentData: {},
    isLoading: true,
  };

  getAgent() {
    const { agentId } = this.state;

    fetch(`/api/agents/${agentId}`)
      .then((r) => r.json())
      .then((data) => this.setState({ agentData: data.agent }))
      .catch(() => this.setState({ redirect: "/agents" }))
      .finally(() => this.setState({ isLoading: false }));
  }

  updateAgent = (agent) =>
    this.updateAction({
      url: `/api/agents/${this.state.agentId}`,
      values: agent,
      successRedirect: `/agents/${this.state.agentId}`,
      failureRedirect: `/agents/${this.state.agentId}`,
    });

  returnToAgentPage = () => {
    const { agentId } = this.state;

    this.setState({ redirect: `/agents/${agentId}` });
  };

  componentDidMount() {
    this.getAgent();
  }

  render() {
    const { redirect, agentData, isLoading } = this.state;

    if (isLoading) return <Spinner />;

    if (redirect) return <Redirect to={redirect} />;

    if (agentData.name && this.context.isManager) {
      return (
        <Modal title={`Edit agent: ${agentData.name}`}>
          <AgentForm
            values={agentData}
            handleSubmit={this.updateAgent}
            handleCancel={this.returnToAgentPage}
          />
        </Modal>
      );
    }

    return <Redirect to="/agents" />;
  }
}

EditAgent.contextType = Context;

export default withRouter(EditAgent);
