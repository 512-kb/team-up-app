import React from "react";
import { Dimmer, Loader, Image, Segment } from "semantic-ui-react";

class User extends React.Component {
  loader = () => {
    return (
      <Segment>
        <Dimmer active>
          <Loader content="Loading" />
        </Dimmer>
        <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
      </Segment>
    );
  };
  render = () => {
    return <React.Fragment>USER HERE</React.Fragment>;
  };
}

export default User;
