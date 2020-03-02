import React from "react";
import Routes from "./routes";
import { Router } from "react-router-dom";
import history from "../history";

export default class App extends React.Component {
  render = () => {
    return (
      <div
        style={{
          padding: "2%",
          position: "absolute",
          width: "100vw",
          height: "100vh"
        }}
      >
        <Router history={history}>
          <Routes />
        </Router>
      </div>
    );
  };
}
