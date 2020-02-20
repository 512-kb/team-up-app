import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

class Index extends React.Component {
  state = {};

  render() {
    return <App />;
  }
}

ReactDOM.render(<Index />, document.getElementById("root"));
