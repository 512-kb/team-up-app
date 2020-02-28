import React from "react";
import { connect } from "react-redux";
import Tabs from "../Tabs";

class Dashboard extends React.Component {
  dataSelector = () => {
    switch (this.props.activeTab) {
      case "INVITES":
      case "POSTS":
        return this.props.userData;
      case "TOP5":
        return this.props.top5;
      default:
        return {};
    }
  };
  render = () => (
    <React.Fragment>
      <Tabs tab={this.props.activeTab} data={this.dataSelector()} />
    </React.Fragment>
  );
}

const mapStateToProps = ({ activeTab, userData, top5 }) => {
  return { activeTab, userData, top5 };
};

export default connect(mapStateToProps)(Dashboard);
