import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import { connect } from "react-redux";
import { switchTab } from "../../action creators";
import NewChannelBtn from "./newChannel";

class Navbar extends Component {
  state = { activeItem: "POSTS" };

  handleItemClick = (e, { name }) => {
    this.props.switchTab(name);
    this.setState({ activeItem: name });
  };
  render() {
    return (
      <Menu size="large" pointing>
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
          <Menu.Item
            name="INVITES"
            active={this.state.activeItem === "INVITES"}
            onClick={this.handleItemClick}
          />
          <Menu.Item>
            <NewChannelBtn />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}
export default connect(null, { switchTab })(Navbar);
