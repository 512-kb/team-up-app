import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";
import { connect } from "react-redux";
import { loadUserData, loadTop5 } from "../../action creators";
import socket from "../../sockets";
import Header from "./header";

class User extends React.Component {
  state = {};
  componentDidMount = () => {
    setTimeout(() => {
      socket.emit("connected", this.props.location.state.username);
      this.props.loadUserData(this.props.location.state.username);
      this.props.loadTop5();
    }, 800);
  };
  componentWillUnmount = () => {
    socket.emit("disconnected", this.props.location.state.username);
  };

  render = () => {
    console.log(this.props);
    return this.props.location.state.username ? (
      <React.Fragment>
        <Header username={this.props.location.state.username} />
      </React.Fragment>
    ) : (
      <Dimmer active inverted>
        <Loader content="Loading" />
      </Dimmer>
    );
  };
}

const mapStateToProps = state => {
  console.log(state);
  return {};
};

export default connect(mapStateToProps, { loadUserData, loadTop5 })(User);
