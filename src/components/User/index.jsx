import React from "react";
import { Dimmer, Loader, Segment } from "semantic-ui-react";
import { connect } from "react-redux";
import Dashboard from "../Dashboard";
import Navbar from "../Navbar";
import socket from "../../sockets";
import Header from "./header";
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
      socket.emit("connected", user.username + " connected");
    }, 800);
  };
  componentWillUnmount = () => {
    socket.emit("disconnected", this.props.user.username + " disconnected");
  };

  static getDerivedStateFromProps(props, state) {
    //console.log(props, state);
    return null;
  }

  render = () => {
    return this.props.user ? (
      <React.Fragment>
        <Header username={this.props.user.username} />
        <Segment>
          <Navbar />
          <Dashboard />
        </Segment>
      </React.Fragment>
    ) : (
      <Dimmer active inverted>
        <Loader content="Loading" />
      </Dimmer>
    );
  };
}

const mapStateToProps = ({ user }) => {
  return { user };
};
export default connect(mapStateToProps)(User);
