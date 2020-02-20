import React from "react";
import Routes from "./routes";

export default class App extends React.Component {
  render = () => {
    return (
      <div style={{ padding: "2%" }}>
        <br />
        <Routes />
      </div>
    );
  };
}
