import React from "react";
import { Menu, Loader } from "semantic-ui-react";
import { connect } from "react-redux";
import { loadChannels, switchChannel } from "../../../action creators";
class Channels extends React.Component {
  state = { activeItem: "" };
  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  };

  componentDidMount = async () => {
    await this.props.loadChannels(this.props.user.username);
    if (this.props.channels && this.props.channels.length)
      this.setState({ activeItem: this.props.channels[0].name });
  };

  channelList = channel => (
    <Menu.Item
      name={channel.name}
      key={channel._id}
      active={this.state.activeItem === channel.name}
      onClick={(e, item) => {
        this.handleItemClick(e, item);
        this.props.switchChannel(channel);
      }}
    />
  );

  render = () =>
    this.props.channels ? (
      <Menu text vertical stackable>
        <Menu.Item header>CHANNELS</Menu.Item>
        {this.props.channels.map(channel => this.channelList(channel))}
      </Menu>
    ) : (
      <Loader active inline />
    );
}

const getChannels = ({ user, channels }) => {
  return { user, channels };
};

export default connect(getChannels, { loadChannels, switchChannel })(Channels);
