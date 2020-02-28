import React from "react";
import { Card, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { respondToInvite, loadInvites } from "../../action creators";

class Invites extends React.Component {
  componentDidMount = () => {
    this.props.loadInvites(this.props.user.username);
  };
  render() {
    return (
      <React.Fragment>
        {this.props.invites.length
          ? this.props.invites.map(invite => (
              <Card key={invite._id}>
                <Card.Content>
                  <Card.Header>{invite.channel_name}</Card.Header>
                  <Card.Description>
                    <strong>{invite.sent_by}</strong> invited you to this
                    channel.
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <div className="ui two buttons">
                    <Button
                      onClick={() => {
                        this.props.respondToInvite({
                          _id: invite._id
                        });
                        alert("Invite Accepted");
                      }}
                      basic
                      color="green"
                    >
                      Accept
                    </Button>
                    <Button
                      onClick={() => {
                        this.props.respondToInvite(
                          {
                            _id: invite._id
                          },
                          false
                        );
                        alert("Invite Rejected");
                      }}
                      basic
                      color="red"
                    >
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

const getData = ({ user, invites }) => {
  return { user, invites };
};

export default connect(getData, { respondToInvite, loadInvites })(Invites);
