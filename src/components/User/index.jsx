import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";
import { connect } from "react-redux";
import { loadUserData, loadTop5 } from "../../action creators";
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
      this.props.loadUserData(user.username);
      this.props.loadTop5();
      socket.emit("connected", user.username + "connected");
    }, 800);
  };
  componentWillUnmount = () => {
    socket.emit("disconnected", socket.id + " disconnected");
  };

  render = () => {
    return this.props.top5 ? (
      <React.Fragment>
        <Header username={this.props.user.username} />
      </React.Fragment>
    ) : (
      <Dimmer active inverted>
        <Loader content="Loading" />
      </Dimmer>
    );
  };
}

const mapStateToProps = ({ user, userData, top5 }) => {
  return { user, userData, top5 };
};
export default connect(mapStateToProps, { loadUserData, loadTop5 })(User);
