import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Routing } from "./components/Routing/Routing.jsx";
import { Context } from "./Context/Context.js";
import "./index.css";

class App extends React.Component {
  render() {
    const { currentUser } = this.props;

    return (
      <React.StrictMode>
        <Context.Provider value={currentUser}>
          <BrowserRouter basename="/admin">
            <Routing currentUser={currentUser} />
          </BrowserRouter>
        </Context.Provider>
      </React.StrictMode>
    )
  };
}

async function main() {
  const root = ReactDOM.createRoot(document.getElementById("root"));

  const currentUser = await fetch("/api/auth/current_user")
    .then(res => res.json())
    .then(data => { return { email: data.user.emails[0].value, isManager: data.manager } })
    .catch(() => console.log("User is not logged in"));

  root.render(<App currentUser={currentUser} />);
}

main();
