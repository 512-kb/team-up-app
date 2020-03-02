import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";
import { connect } from "react-redux";
import Navbar from "../Navbar";
import Header from "./header";
import Tabs from "../Tabs";
import history from "../../history";

class User extends React.Component {
  state = {};
  componentDidMount = () => {
    setTimeout(() => {
      const user = JSON.parse(sessionStorage.getItem("user"));
      if (!user) {
        history.push("/login");
        return;
      }
    }, 800);
  };
  render = () => {
    return this.props.user ? (
      <React.Fragment>
        <Header username={this.props.user.username} />

        <Navbar />
        <Tabs tab={this.props.activeTab} />
      </React.Fragment>
    ) : (
      <Dimmer active inverted>
        <Loader content="Loading" />
      </Dimmer>
    );
  };
}

const mapStateToProps = ({ activeTab, user }) => {
  return { activeTab, user };
};
export default connect(mapStateToProps)(User);
