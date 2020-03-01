import React, { Component } from "react";
import { TextArea, Segment, Dropdown, Button } from "semantic-ui-react";
import { connect } from "react-redux";

class PostForm extends Component {
  state = { content: "", tags: [], error: false };

  handleChange = (e, { name, value }) =>
    this.setState({
      [name]: name === "content" ? value.replace(/\s\s+/g, " ") : value
    });

  validate = () => {
    if (this.state.content.length < 1) {
      this.setState({ error: "Invalid Content" });
      return false;
    }
    this.setState({ error: false });
    return true;
  };

  render() {
    return this.props.activeChannel.tags ? (
      <Segment
        style={{
          position: "relative",
          height: "30%",
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
          options={this.props.activeChannel.tags.map(tag => {
            return { key: tag, text: tag, value: tag };
          })}
          onChange={this.handleChange}
        />
        <Button color="green" floated="right" onClick={this.validate}>
          POST
        </Button>
        <br />
        <TextArea
          name="content"
          placeholder="Post Content"
          style={{
            position: "relative",
            width: "100%",
            height: "70%",
            resize: "none"
          }}
          onChange={this.handleChange}
        />
      </Segment>
    ) : (
      <React.Fragment>Loading..</React.Fragment>
    );
  }
}

const getActiveChannel = ({ activeChannel, user }) => {
  return { activeChannel, user };
};

export default connect(getActiveChannel)(PostForm);
