import React from "react";
import Routes from "./routes";
import { Router } from "react-router-dom";
import history from "../history";

export default class App extends React.Component {
  render = () => {
    return (
      <div style={{ padding: "2%" }}>
        <Router history={history}>
          <Routes />
        </Router>
      </div>
    );
  };
}
