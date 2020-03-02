import React, { Component } from "react";
import { Segment, Feed, Label } from "semantic-ui-react";
import moment from "moment";
import { connect } from "react-redux";
import { updatePosts, loadPosts } from "../../../action creators";
import socket from "../../../sockets";

class ChatContainer extends Component {
  state = { activeChannel: false, page: 0 };

  componentDidMount = () => {
    socket.on("new_post_braodcast", obj => {
      this.props.updatePosts(obj);
      this.scrollToBottom();
    });

    let container = document.getElementById("chatContainer");
    container.onscroll = () => {
      if (container.scrollTop === 0) {
        socket.emit(
          "fetch_old_posts",
          { channel_id: this.props.activeChannel._id, page: this.state.page },
          this.props.loadPosts
        );
        this.incrementPage();
      }
    };
  };

  incrementPage = () => this.setState({ page: this.state.page + 1 });

  static getDerivedStateFromProps = (props, state) => {
    //console.log(props);
    if (
      props.activeChannel &&
      props.activeChannel._id !== state.activeChannel._id
    ) {
      socket.emit(
        "join_channel_room",
        props.activeChannel._id,
        props.loadPosts
      );
      return { activeChannel: props.activeChannel, page: 1 };
    }
    return state;
  };
  scrollToBottom = () => {
    let container = document.getElementById("chatContainer");
    container.scrollTop = container.scrollHeight;
  };
  render() {
    return (
      <Segment
        id="chatContainer"
        style={{
          position: "relative",
          overflowY: "scroll",
          scrollbehaviour: "smooth",
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

export default connect(getActiveChannel, { updatePosts, loadPosts })(
  ChatContainer
);
