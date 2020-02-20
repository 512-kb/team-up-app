import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import App from "./components/App";
import history from "./history";

class Index extends React.Component {
  state = {};

  render() {
    return (
      <Router history={history}>
        <App />
      </Router>
    );
  }
}

ReactDOM.render(<Index />, document.getElementById("root"));
