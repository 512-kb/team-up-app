import React from "react";
import Posts from "./Posts";
import Top5 from "./Top5";

class ActiveTab extends React.Component {
  render = () =>
    this.props.tab === "TOP5" ? (
      <Top5 data={this.props.data} />
    ) : (
      <Posts data={this.props.data} />
    );
}

export default ActiveTab;
