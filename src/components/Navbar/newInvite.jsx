import React, { Component } from "react";
import { Button, Icon, Form, Modal, Dropdown } from "semantic-ui-react";
import { connect } from "react-redux";
import { createInvite, loadChannels } from "../../action creators";
class CreateInvite extends Component {
  state = {
    channel: {},
    username: "",
    modalOpen: false,
    requestSent: false,
    error: { username: false, channel: false }
  };

  handleChange = (e, { name, value }) =>
    this.setState({ [name]: name === "channel" ? JSON.parse(value) : value });
  openModal = () => {
    if (this.props.channels.length < 1) {
      alert("No Channel created to Invite anyone");
    } else this.setState({ modalOpen: true });
  };
  closeModal = () => this.setState({ modalOpen: false });

  validate = () => {
    this.setState({ requestSent: true });
    let error = { username: false, channel: false },
      flag = true;
    if (!this.state.channel._id) {
      error.channel = "Select a Channel";
      flag = false;
    }
    this.setState({ error });
    return flag;
  };

  onSubmit = async () => {
    if (!this.validate()) {
      this.setState({ requestSent: false });
      return;
    }
    const msg = await createInvite({
      channel_id: this.state.channel._id,
      channel_name: this.state.channel.name,
      username: this.state.username,
      sent_by: this.state.channel.username
    });
    this.setState({ requestSent: false });
    if (msg.err) {
      this.setState({
        error: { username: msg.err, channel: false }
      });
    } else {
      this.closeModal();
      alert(msg.msg);
    }
  };

  render() {
    return (
      <Modal
        trigger={
          <Button onClick={this.openModal} icon primary>
            <Icon name="add" /> New Invite
          </Button>
        }
        open={this.state.modalOpen}
        onClose={this.closeModal}
        closeIcon
      >
        <Modal.Header>Send an Invite </Modal.Header>
        <Modal.Content image>
          <Form>
            <Form.Group>
              <Dropdown
                style={{ marginLeft: "2%" }}
                name="channel"
                onChange={this.handleChange}
                placeholder="Channel"
                error={Boolean(this.state.error.channel)}
                options={this.props.channels.map(({ _id, name, username }) => {
                  return {
                    key: _id,
                    text: name,
                    value: JSON.stringify({ _id, name, username })
                  };
                })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Input
                label="Username"
                placeholder="Username"
                name="username"
                onChange={this.handleChange}
                style={{ width: "40rem" }}
                error={
                  this.state.error.username
                    ? {
                        content: this.state.error.username,
                        pointing: "left"
                      }
                    : undefined
                }
              />
            </Form.Group>
            <br />
            <Modal.Actions>
              {this.state.requestSent ? (
                <Button loading primary>
                  Loading
                </Button>
              ) : (
                <Button color="blue" onClick={this.onSubmit}>
                  INVITE
                </Button>
              )}
            </Modal.Actions>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

export default connect(
  ({ channels }) => {
    return { channels };
  },
  { loadChannels }
)(CreateInvite);
