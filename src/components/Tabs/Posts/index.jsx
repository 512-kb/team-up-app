import React from "react";
import { Grid } from "semantic-ui-react";
import Channels from "./channels";
import PostCreator from "./PostCreator";
import ChatContainer from "./ChatContainer";

class Posts extends React.Component {
  state = {};
  render = () => {
    return (
      <Grid style={{ position: "relative", height: "100%" }} stackable>
        <Grid.Row
          style={{
            position: "relative",
            height: "100%",
            paddingBottom: "0",
            display: "flex"
          }}
          stretched
        >
          <Grid.Column
            style={{
              position: "relative",
              overflowX: "auto",
              overflowY: "scroll",
              width: "auto",
              height: "100%"
            }}
          >
            <Channels />
          </Grid.Column>
          <br />
          <Grid.Column
            style={{
              position: "relative",
              flexGrow: "100",
              height: "100%"
            }}
          >
            <ChatContainer />
            <PostCreator />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  };
}

export default Posts;
