import React, { Component } from "react";
import { Menu, Dropdown, Button, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import { switchTab } from "../../action creators";

class Navbar extends Component {
  state = { activeItem: "POSTS" };

  handleItemClick = (e, { name }) => {
    this.props.switchTab(name);
    this.setState({ activeItem: name });
  };
  render() {
    return (
      <Menu pointing secondary>
        <Menu.Item header>TEAM-UP</Menu.Item>
        <Menu.Item
          name="POSTS"
          active={this.state.activeItem === "POSTS"}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name="TOP5"
          active={this.state.activeItem === "TOP5"}
          onClick={this.handleItemClick}
        />
        <Menu.Menu position="right">
          <Dropdown item text="INVITES">
            <Dropdown.Menu></Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
        <Menu.Item>
          <Button icon primary>
            <Icon name="add" /> New Channel
          </Button>
        </Menu.Item>
      </Menu>
    );
  }
}

export default connect(null, { switchTab })(Navbar);
