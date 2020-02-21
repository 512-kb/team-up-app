import React from "react";
import { Form, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { loginUser } from "../action creators";
import history from "../history";

class Login extends React.Component {
  state = {
    username: "",
    password: "",
    requestSent: false,
    error: { username: false, password: false }
  };

  callBackForSuccess = data => {
    this.setState({ requestSent: false });
    history.push("/user", data);
  };

  callBackForFail = () => {
    this.setState({ requestSent: false });
    alert("Invalid Credentials");
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  validate = formValues => {
    let error = { username: false, password: false };
    if (!formValues.username) error.username = "Enter the username";
    if (!formValues.password) error.password = "Enter the password";
    this.setState({ error });
    if (error.username || error.password) return false;
    return true;
  };

  onSubmit = () => {
    this.setState({ requestSent: true });
    const formValues = {
      username: this.state.username,
      password: this.state.password
    };
    if (this.validate(formValues)) {
      this.props.loginUser({
        formValues,
        callback: {
          success: this.callBackForSuccess,
          fail: this.callBackForFail
        }
      });
    } else this.setState({ requestSent: false });
  };
  render() {
    return (
      <Form>
        <Form.Group>
          {this.state.error.username ? (
            <Form.Input
              label="Username"
              placeholder="Username"
              name="username"
              autoComplete="off"
              onChange={this.handleChange}
              error={{ content: "Enter Username", pointing: "below" }}
            />
          ) : (
            <Form.Input
              label="Username"
              placeholder="Username"
              name="username"
              autoComplete="off"
              onChange={this.handleChange}
            />
          )}
        </Form.Group>
        <Form.Group>
          {this.state.error.password ? (
            <Form.Input
              label="Password"
              placeholder="Password"
              type="password"
              name="password"
              autoComplete="off"
              onChange={this.handleChange}
              error={{ content: "Enter Password", pointing: "below" }}
            />
          ) : (
            <Form.Input
              label="Password"
              placeholder="Password"
              type="password"
              name="password"
              autoComplete="off"
              onChange={this.handleChange}
            />
          )}
        </Form.Group>
        <br />
        {this.state.requestSent ? (
          <Button loading primary>
            Loading
          </Button>
        ) : (
          <Button color="blue" onClick={this.onSubmit}>
            Login
          </Button>
        )}
      </Form>
    );
  }
}

export default connect(state => state, { loginUser })(Login);
