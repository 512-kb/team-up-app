import React from "react";
import Posts from "./Posts";
import Top5 from "./Top5";
import Invites from "./invites";

class ActiveTab extends React.Component {
  render = () => {
    switch (this.props.tab) {
      case "TOP5":
        return <Top5 />;
      case "INVITES":
        return <Invites />;
      default:
        return <Posts />;
    }
  };
}

export default ActiveTab;
