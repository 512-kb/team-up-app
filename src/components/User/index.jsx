import React from "react";
import { Dimmer, Loader, Image, Segment } from "semantic-ui-react";

class User extends React.Component {
  state = {};
  componentDidMount = () => {
    this.setState(this.props.location.state);
  };

  render = () => {
    return this.state.username ? (
      <React.Fragment>
        USERNAME:{" " + this.state.username}
        <br />
        REGION:{" " + this.state.region}
      </React.Fragment>
    ) : (
      <Segment>
        <Dimmer active>
          <Loader content="Loading" />
        </Dimmer>
        <Image src="../../../public/images/loader.png" />
      </Segment>
    );
  };
}

export default User;
