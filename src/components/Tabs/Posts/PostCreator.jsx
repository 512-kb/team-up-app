import React, { Component } from "react";
import { TextArea, Segment, Dropdown, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import _ from "lodash";
import socket from "../../../sockets";

const contentCSS = {
  position: "relative",
  width: "100%",
  height: "70%",
  resize: "none"
};
class PostForm extends Component {
  state = { content: "", tags: [], error: false };

  handleChange = (e, { name, value }) => {
    this.setState({
      [name]: name === "content" ? value.replace(/\s\s+/g, " ") : value
    });
  };

  validate = () => {
    if (this.state.content.length < 2) {
      this.setState({ error: "Invalid Content" });
      return false;
    }
    this.setState({ error: false });
    return true;
  };

  onSubmit = () => {
    if (!this.validate()) return;
    socket.emit("new_post", {
      username: this.props.user.username,
      tags: this.state.tags,
      content: this.state.content,
      channel_id: this.props.activeChannel._id
    });
    this.setState({ content: "", tags: [], error: false });
  };

  render() {
    return this.props.activeChannel._id ? (
      <Segment
        style={{
          position: "relative",
          height: "20%",
          marginTop: "0",
          top: "0",
          bottom: "0"
        }}
      >
        <Dropdown
          name="tags"
          placeholder="Tags"
          style={{ position: "relative", marginBottom: "0.3%" }}
          multiple
          selection
          value={this.state.tags}
          options={this.props.activeChannel.tags.map(tag => {
            return { key: tag, text: tag, value: tag };
          })}
          onChange={this.handleChange}
        />
        <Button color="green" floated="right" onClick={this.onSubmit}>
          POST
        </Button>
        <br />
        <TextArea
          name="content"
          placeholder={this.state.error ? "Enter some text!" : "Post Content"}
          style={
            this.state.error
              ? _.assign(contentCSS, { border: "4px solid red" })
              : contentCSS
          }
          value={this.state.content}
          onChange={this.handleChange}
        />
      </Segment>
    ) : (
      <React.Fragment>Loading..</React.Fragment>
    );
  }
}

export default connect(({ activeChannel, user }) => {
  return { activeChannel, user };
})(PostForm);
