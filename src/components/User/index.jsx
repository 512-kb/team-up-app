import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";
import Header from "./header";

class User extends React.Component {
  state = {};
  componentDidMount = setTimeout(() => {
    this.setState(this.props.location.state);
  }, 900);

  render = () => {
    return this.state.username ? (
      <React.Fragment>
        <Header username={this.state.username} />
      </React.Fragment>
    ) : (
      <Dimmer active inverted>
        <Loader content="Loading" />
      </Dimmer>
    );
  };
}

export default User;
