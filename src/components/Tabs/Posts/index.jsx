import React from "react";
import { Grid, Segment } from "semantic-ui-react";
import Channels from "./channels";

class Posts extends React.Component {
  render = () => {
    return (
      <Grid stackable>
        <Grid.Row stretched>
          <Grid.Column stretched>
            <Channels />
          </Grid.Column>
          <Grid.Column width={15} stretched>
            <br />
            <Segment />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  };
}

export default Posts;
