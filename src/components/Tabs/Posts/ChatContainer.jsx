import React, { Component } from "react";
import { Segment, Feed, Label } from "semantic-ui-react";
import moment from "moment";
import { connect } from "react-redux";
import { updatePosts } from "../../../action creators";
import socket from "../../../sockets";

class ChatContainer extends Component {
  state = { activeChannel: false };

  componentDidMount = () => {
    socket.on("new_post_braodcast", obj => {
      //console.log(obj);
      this.props.updatePosts(obj);
    });
  };

  static getDerivedStateFromProps(props, state) {
    //console.log(props);
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
        {this.props.posts.map((post, i) => createPost(post, i))}
      </Segment>
    );
  }
}

const createPost = (post, i) => {
  return (
    <Segment key={i}>
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

const getActiveChannel = ({ activeChannel, posts, user }) => {
  return { activeChannel, posts, user };
};

export default connect(getActiveChannel, { updatePosts })(ChatContainer);
