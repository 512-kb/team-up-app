import React from "react";
import Posts from "./Posts";
import Top5 from "./Top5";
import Invites from "./invites";

class ActiveTab extends React.Component {
  render = () => {
    switch (this.props.tab) {
      case "TOP5":
        return <Top5 data={this.props.data} />;
      case "INVITES":
        return <Invites data={this.props.data} />;
      default:
        return <Posts data={this.props.data} />;
    }
  };
}

export default ActiveTab;
