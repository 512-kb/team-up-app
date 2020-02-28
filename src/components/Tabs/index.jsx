import React from "react";
import Posts from "./Posts";
import Top5 from "./Top5";
import Invites from "./invites";
import { Segment } from "semantic-ui-react";

class ActiveTab extends React.Component {
  selectTab = () => {
    switch (this.props.tab) {
      case "TOP5":
        return <Top5 />;
      case "INVITES":
        return <Invites />;
      default:
        return <Posts />;
    }
  };
  render = () => (
    <Segment style={{ overflow: "auto", height: "70vh" }}>
      {this.selectTab()}
    </Segment>
  );
}

export default ActiveTab;
