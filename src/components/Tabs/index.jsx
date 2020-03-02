import React from "react";
import Posts from "./Posts/index";
import Top5 from "./Top5/index";
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
    <Segment style={{ position: "relative", height: "80%" }}>
      {this.selectTab()}
    </Segment>
  );
}

export default ActiveTab;
