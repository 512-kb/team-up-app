import React from "react";
import { Menu, Loader } from "semantic-ui-react";

class Channels extends React.Component {
  state = { activeItem: "home" };
  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  channelSwitch = ({ name, _id }) => (
    <Menu.Item
      name={name}
      key={_id}
      active={this.state.activeItem === name}
      onClick={this.handleItemClick}
    />
  );

  render = () =>
    this.props.data ? (
      <Menu text vertical stackable>
        <Menu.Item header>CHANNELS</Menu.Item>
        {this.props.data.map(channel => this.channelSwitch(channel))}
      </Menu>
    ) : (
      <Loader active inline />
    );
}

export default Channels;
