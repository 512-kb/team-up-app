import React from "react";
import { Grid } from "semantic-ui-react";
import Channels from "./channels";
import ChatArea from "./ChatArea";

class Posts extends React.Component {
  render = () => {
    return (
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
            <ChatArea />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  };
}

export default Posts;
