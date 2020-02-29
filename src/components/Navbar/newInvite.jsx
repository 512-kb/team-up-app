import React, { Component } from "react";
import { Button, Icon } from "semantic-ui-react";
class CreateInvite extends Component {
  render() {
    return (
      <Button icon primary>
        <Icon name="add" /> New Invite
      </Button>
    );
  }
}

export default CreateInvite;
