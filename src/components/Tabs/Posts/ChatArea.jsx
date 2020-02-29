import React, { Component } from "react";
import { Segment } from "semantic-ui-react";
import { connect } from "react-redux";
import PostCreator from "./PostCreator";

class ChatArea extends Component {
  state = {};

  render() {
    return this.props.activeChannel ? (
      <React.Fragment>
        <Segment
          style={{
            position: "relative",
            overflowY: "auto",
            height: "70%",
            marginBottom: "0"
          }}
        ></Segment>
        <PostCreator />
      </React.Fragment>
    ) : (
      <React.Fragment>Loading..</React.Fragment>
    );
  }
}

export default connect(null)(ChatArea);
