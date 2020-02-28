import React from "react";
import { Card, Button } from "semantic-ui-react";

class Invites extends React.Component {
  state = {};
  render() {
    console.log(this.props);
    return (
      <React.Fragment>
        {this.props.data.invites.length
          ? this.props.data.invites.map(invite => (
              <Card key={invite._id}>
                <Card.Content>
                  <Card.Header>{invite.name}</Card.Header>
                  <Card.Description>
                    <strong>{invite.username}</strong> invited you to this
                    channel.
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <div className="ui two buttons">
                    <Button basic color="green">
                      Accept
                    </Button>
                    <Button basic color="red">
                      Reject
                    </Button>
                  </div>
                </Card.Content>
              </Card>
            ))
          : "No Invites"}
      </React.Fragment>
    );
  }
}

export default Invites;
