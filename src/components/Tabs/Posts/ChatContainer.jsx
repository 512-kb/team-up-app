import React, { Component } from "react";
import { Segment, Feed, Label } from "semantic-ui-react";
import moment from "moment";
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
        {createPost({
          tags: ["tag1", "tag2"],
          _id: "5e54122d4d8ff90f5454eea7",
          username: "kunal",
          content: "This is sample post no. 1",
          channel_id: "5e5944921e1e6e3710b6f18e",
          created: "1582567981412",
          __v: 0
        })}
      </Segment>
    );
  }
}

const createPost = post => {
  return (
    <Segment key={post._id}>
      <Feed.User>
        <b style={{ marginRight: "1%", fontSize: "1.1rem" }}>{post.username}</b>
      </Feed.User>
      <span style={{ color: "#bfbfbf", fontSize: "0.85rem" }}>
        {moment(post.created, "x").format("h:mm A, D-MMM-YYYY")}
      </span>
      <span style={{ float: "right" }}>
        {post.tags.map(tag => (
          <Label color="orange" key={tag}>
            {tag}
          </Label>
        ))}
      </span>
      <Feed.Extra text>{post.content}</Feed.Extra>
    </Segment>
  );
};

const getActiveChannel = ({ activeChannel, user }) => {
  return { activeChannel, user };
};

export default connect(getActiveChannel)(ChatContainer);
