import React from "react";
import { connect } from "react-redux";
import Tabs from "../Tabs";

class Dashboard extends React.Component {
  render = () => (
    <React.Fragment>
      <Tabs tab={this.props.activeTab} />
    </React.Fragment>
  );
}

const mapStateToProps = ({ activeTab }) => {
  return { activeTab };
};

export default connect(mapStateToProps)(Dashboard);
