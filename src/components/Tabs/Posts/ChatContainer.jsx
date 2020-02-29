import React, { Component } from "react";
import { Segment, Feed } from "semantic-ui-react";
import { connect } from "react-redux";
import socket from "../../../sockets";
class ChatContainer extends Component {
  state = { activeChannel: false };

  static getDerivedStateFromProps(props, state) {
    if (
      props.activeChannel &&
      props.activeChannel._id !== state.activeChannel._id
    ) {
      socket.emit("join_channel_room", props.activeChannel._id);
      return { activeChannel: props.activeChannel };
    }
    return state;
  }
  render() {
    return (
      <Segment
        style={{
          position: "relative",
          overflowY: "auto",
          height: "70%",
          marginBottom: "0"
        }}
      >
        <Segment>
          <Feed.User>
            <b>Joe Henderson</b>
          </Feed.User>
          <span style={{ color: "#bfbfbf" }}> 3 days ago</span>
          <Feed.Extra text>
            Ours is a life of constant reruns. We're always circling back to
            where we'd we started, then starting all over again. Even if we
            don't run extra laps that day, we surely will come back for more of
            the same another day soon.
          </Feed.Extra>
        </Segment>
      </Segment>
    );
  }
}

const getActiveChannel = ({ activeChannel, user }) => {
  return { activeChannel, user };
};

export default connect(getActiveChannel)(ChatContainer);
