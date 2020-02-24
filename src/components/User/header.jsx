import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../action creators";
import { Button, Header, Image, Segment } from "semantic-ui-react";

class Head extends React.Component {
  state = {};
  logout = () => {
    sessionStorage.clear();
    this.props.logoutUser();
  };
  render() {
    return (
      <Segment clearing>
        <Header as="h2" floated="left">
          <Image
            circular
            src="https://react.semantic-ui.com/images/avatar/large/patrick.png"
          />
          {this.props.username}
        </Header>
        <Link to="/">
          <Button floated="right" color="black" onClick={this.logout}>
            Logout
          </Button>
        </Link>
      </Segment>
    );
  }
}

export default connect(null, { logoutUser })(Head);
