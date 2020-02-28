import React from "react";
import { Button, Icon, Form, Modal, TextArea, Label } from "semantic-ui-react";
import { connect } from "react-redux";
import { createChannel } from "../../action creators";

class NewChannelModal extends React.Component {
  state = {
    name: "",
    description: "",
    tag: "",
    tags: [],
    modalOpen: false,
    error: { name: false, description: false, tag: false }
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });
  handleOpen = () => this.setState({ modalOpen: true });
  handleClose = () => this.setState({ modalOpen: false });

  validate = () => {
    let error = { name: false, description: false },
      flag = true;
    if (!this.state.name.length) {
      error.name = "Enter a Channel Name";
      flag = false;
    }
    if (!this.state.description.length) {
      error.description = "Enter a Description";
      flag = false;
    }
    if (this.state.tags.length <= 0) {
      error.tag = "Add atleast one tag";
      flag = false;
    }
    this.setState({ error });
    return flag;
  };

  validateTag = () => {
    let error = { ...this.state.error };
    if (this.state.tag.length <= 0) {
      error.tag = "Enter a Tag";
      this.setState({ error });
      return false;
    } else if (this.state.tags.includes(this.state.tag)) {
      error.tag = "Tag already added";
      this.setState({ error });
      return false;
    }
    error.tag = false;
    this.setState({ error });
    return true;
  };

  onSubmitTag = () => {
    if (this.validateTag())
      this.setState({ tags: [...this.state.tags, this.state.tag] });
  };

  removeTag = t => {
    this.setState({ tags: this.state.tags.filter(tag => tag !== t) });
  };

  onSubmit = () => {
    if (this.validate()) {
      this.props.createChannel({
        name: this.state.name,
        description: this.state.description,
        tags: this.state.tags,
        username: this.props.username
      });
      this.handleClose();
    }
  };

  renderTags = () =>
    this.state.tags.map(tag => {
      return (
        <Label key={tag} color="orange">
          {tag}
          <Icon
            name="delete"
            link
            onClick={() => {
              this.removeTag(tag);
            }}
          />
        </Label>
      );
    });

  render = () => {
    return (
      <Modal
        trigger={
          <Button onClick={this.handleOpen} icon primary>
            <Icon name="add" /> New Channel
          </Button>
        }
        open={this.state.modalOpen}
        onClose={this.handleClose}
        closeIcon
      >
        <Modal.Header>Create a new Channel</Modal.Header>
        <Modal.Content image>
          <Form>
            <Form.Group>
              <Form.Input
                label="Name"
                placeholder="Name"
                name="name"
                onChange={this.handleChange}
                style={{ width: "40rem" }}
                error={
                  this.state.error.name
                    ? {
                        content: this.state.error.name,
                        pointing: "left"
                      }
                    : undefined
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Field
                label="Description"
                placeholder="Description"
                control={TextArea}
                name="description"
                onChange={this.handleChange}
                style={{ width: "40rem", height: "10rem" }}
                error={
                  this.state.error.description
                    ? {
                        content: this.state.error.description,
                        pointing: "left"
                      }
                    : undefined
                }
              />
            </Form.Group>
            <Form.Group inline>
              <Form.Input
                label="Tag"
                placeholder="Tag"
                name="tag"
                onChange={this.handleChange}
                error={
                  this.state.error.tag
                    ? {
                        content: this.state.error.tag,
                        pointing: "left"
                      }
                    : undefined
                }
              />
              <Icon
                size="large"
                color="green"
                name="add"
                link
                onClick={this.onSubmitTag}
              />
            </Form.Group>
            <Form.Group> {this.renderTags()}</Form.Group>
            <br />
            <Modal.Actions>
              <Button color="green" onClick={this.onSubmit}>
                SUBMIT
              </Button>
            </Modal.Actions>
          </Form>
        </Modal.Content>
      </Modal>
    );
  };
}

const getData = ({ user }) => user;

export default connect(getData, { createChannel })(NewChannelModal);
