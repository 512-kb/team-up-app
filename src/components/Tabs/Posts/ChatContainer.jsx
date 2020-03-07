import React, { Component } from "react";
import { Segment, Feed, Label } from "semantic-ui-react";
import moment from "moment";
import { connect } from "react-redux";
import { updatePosts, loadPosts } from "../../../action creators";
import socket from "../../../sockets";

class ChatContainer extends Component {
  state = { activeChannel: false };

  componentDidMount = () => {
    let container = document.getElementById("chatContainer");
    container.onscroll = () => {
      // console.clear();
      //   console.log(container.scrollTop, container.scrollHeight);
      if (container.scrollTop === 0) {
        socket.emit(
          "fetch_old_posts",
          {
            channel_id: this.props.activeChannel._id,
            skip: this.props.posts.length
          },
          this.props.loadPosts
        );
      }
    };
    socket.on("new_post_braodcast", obj => {
      this.props.updatePosts(obj);
      if (container.scrollHeight) container.scrollTop = container.scrollHeight;
    });
  };

  componentDidUpdate = prev => {
    let container = document.getElementById("chatContainer"),
      prevH = prev.posts.length,
      currentH = this.props.posts.length;
    if (prevH < currentH) {
      if (prevH < 1) container.scrollTop = container.scrollHeight;
      else
        container.scrollTop =
          1 + (container.scrollHeight * (currentH - prevH)) / currentH;
    }
  };
  static getDerivedStateFromProps = (props, state) => {
    if (
      props.activeChannel &&
      props.activeChannel._id !== state.activeChannel._id
    ) {
      socket.emit(
        "join_channel_room",
        props.activeChannel._id,
        props.loadPosts
      );
      return { activeChannel: props.activeChannel };
    }
    return state;
  };

  render() {
    return (
      <Segment
        id="chatContainer"
        style={{
          position: "relative",
          overflowY: "scroll",
          scrollBehavior: "smooth",
          height: "70%",
          marginBottom: "0",
          background: "#D0D0D0"
        }}
      >
        {this.props.posts.map((post, i) => createPost(post, i))}
      </Segment>
    );
  }
}

const createPost = (post, i) => {
  return (
    <Segment style={{ wordWrap: "break-word" }} key={i}>
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
      <br />
      {replaceBreaklines(post.content.split("\n"))}
    </Segment>
  );
};

const replaceBreaklines = arr => {
  let result = [];
  arr.forEach(str => {
    result = result.concat([str, <br />]);
  });
  result.pop();
  return result;
};

const getActiveChannel = ({ activeChannel, posts, user }) => {
  return { activeChannel, posts, user };
};

export default connect(getActiveChannel, { updatePosts, loadPosts })(
  ChatContainer
);
