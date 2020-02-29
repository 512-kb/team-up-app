import React, { Component } from "react";
import { Segment, Dropdown } from "semantic-ui-react";
import { connect } from "react-redux";

class ChatArea extends Component {
  state = {};
  render() {
    return this.props.activeChannel ? (
      <React.Fragment>
        <Segment
          style={{
            position: "relative",
            overflowY: "auto",
            height: "80%",
            marginBottom: "0"
          }}
        ></Segment>
        <Segment
          style={{
            position: "relative",
            height: "20%",
            marginTop: "0",
            marginBottom: "0"
          }}
        >
          <Dropdown
            placeholder="Tags"
            multiple
            selection
            onChange={(e, item) => console.log(item)}
            options={this.props.activeChannel.tags.map(tag => {
              return { key: tag, text: tag, value: tag };
            })}
          />
        </Segment>
      </React.Fragment>
    ) : (
      <React.Fragment>Loading..</React.Fragment>
    );
  }
}

const getActiveChannel = ({ activeChannel, user }) => {
  return { activeChannel, user };
};

export default connect(getActiveChannel)(ChatArea);
