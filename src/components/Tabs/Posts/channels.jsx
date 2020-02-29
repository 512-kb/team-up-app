import React from "react";
import { Menu, Loader } from "semantic-ui-react";
import { connect } from "react-redux";
import { loadChannels } from "../../../action creators";
class Channels extends React.Component {
  state = { activeItem: "home" };
  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  componentDidMount = () => {
    this.props.loadChannels(this.props.user.username);
  };

  channelSwitch = ({ name, _id }) => (
    <Menu.Item
      name={name}
      key={_id}
      active={this.state.activeItem === name}
      onClick={this.handleItemClick}
    />
  );

  render = () =>
    this.props.channels ? (
      <Menu text vertical stackable>
        <Menu.Item header>CHANNELS</Menu.Item>
        {this.props.channels.map(channel => this.channelSwitch(channel))}
      </Menu>
    ) : (
      <Loader active inline />
    );
}

const getChannels = ({ user, channels }) => {
  return { user, channels };
};

export default connect(getChannels, { loadChannels })(Channels);
