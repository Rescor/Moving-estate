import React from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import { Spinner } from "../../components/Spinner/Spinner.jsx";
import { MenuButton } from "../../controls/MenuButton/MenuButton.jsx";
import { Context } from "../../Context/Context.js";
import { PageWrapper } from "../../components/PageWrapper/PageWrapper.jsx";
import DeleteAgent from "./DeleteAgent.jsx";
import EditAgent from "./EditAgent.jsx";

class Agent extends React.Component {
  state = {
    agentData: {},
    agentId: this.props.match.params.agentId,
    isLoading: true,
    redirect: null,
  };

  async fetchAgent() {
    const { agentId } = this.state;

    return await fetch(`/api/agents/${agentId}`)
      .then((r) => r.json())
      .then(({ agent }) => agent)
      .catch(() => this.setState({ redirect: "/agents", isLoading: false }));
  }

  async getAgent() {
    this.setState({ isLoading: true });

    const agent = await this.fetchAgent();

    this.setState({
      agentData: agent,
      isLoading: false,
    });
  }

  componentDidMount() {
    this.getAgent();
  }

  async componentDidUpdate() {
    const { agentData, isLoading } = this.state;

    if (isLoading) return;

    const updated = await this.fetchAgent();

    if (JSON.stringify(agentData) === JSON.stringify(updated)) return;

    this.getAgent();
  }

  render() {
    const { isLoading, agentData, agentId, redirect } = this.state;

    if (isLoading) return <Spinner />;

    if (redirect) return <Redirect to={redirect} />;

    if (this.context.isManager)
      return (
        <PageWrapper message={`Agent: ${agentData.name}`}>
          <MenuButton
            text="Edit agent"
            href={`/admin/agents/${agentId}/edit`}
          />
          <MenuButton
            text="Delete agent"
            href={`/admin/agents/${agentId}/delete`}
          />
          <MenuButton text="To agents" href="/admin/agents" />
          <div>
            <img src={agentData.photo} alt="Agent" />
            <p>Name: {agentData.name}</p>
            <p>Email: {agentData.email}</p>
            <p>Location: {agentData.location}</p>
          </div>

          <Switch>
            <Route path="/agents/:agentId/edit" component={EditAgent}></Route>
            <Route
              path="/agents/:agentId/delete"
              component={DeleteAgent}
            ></Route>
          </Switch>
        </PageWrapper>
      );

    return <Redirect to="/" />;
  }
}

Agent.contextType = Context;

export default withRouter(Agent);
