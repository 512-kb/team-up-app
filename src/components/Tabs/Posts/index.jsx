import React from "react";
import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import { loadChannels } from "../../../action creators";
import Channels from "./channels";
import PostCreator from "./PostCreator";
import ChatContainer from "./ChatContainer";

class Posts extends React.Component {
  state = {};
  componentDidMount = () => {
    this.props.loadChannels(this.props.user.username);
  };
  static getDerivedStateFromProps(props, state) {
    return state;
  }
  render = () => {
    return this.props.channels.length ? (
      <Grid style={{ position: "relative", height: "100%" }} stackable>
        <Grid.Row style={{ paddingBottom: "0" }} stretched>
          <Grid.Column
            style={{
              position: "relative",
              overflowX: "hidden",
              overflowY: "auto",
              width: "10%"
            }}
            stretched
          >
            <Channels />
          </Grid.Column>
          <br />
          <Grid.Column
            style={{
              position: "relative",
              width: "90%"
            }}
            stretched
          >
            <ChatContainer />
            <PostCreator />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    ) : (
      <React.Fragment>NO CHANNEL SUBSCRIBED</React.Fragment>
    );
  };
}

export default connect(
  ({ channels, user }) => {
    return { channels, user };
  },
  { loadChannels }
)(Posts);
