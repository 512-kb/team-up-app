import React from "react";
import { Form } from "semantic-ui-react";
import { connect } from "react-redux";
import { loginUser } from "../action creators";
import history from "../history";

class Login extends React.Component {
  state = {
    username: "",
    password: "",
    error: { username: false, password: false }
  };

  validate = formValues => {
    let error = { username: false, password: false };
    if (!formValues.username) error.username = "Enter the username";
    if (!formValues.password) error.password = "Enter the password";
    this.setState({ error });
    if (error.username || error.password) return false;
    return true;
  };

  onSubmit = () => {
    const formValues = {
      username: this.state.username,
      password: this.state.password
    };
    if (this.validate(formValues)) {
      this.props.loginUser(formValues);
    }
  };

  handleChange = (e, input) => {
    return this.setState({ [input.name]: input.value });
  };

  render = () => {
    return (
      <Form>
        <Form.Group>
          <Form.Input
            label="Username"
            placeholder="Username"
            name="username"
            autoComplete="off"
            onChange={this.handleChange}
            error={
              this.state.error.username ? this.state.error.username : undefined
            }
          />
        </Form.Group>
        <Form.Group>
          <Form.Input
            label="Password"
            placeholder="Password"
            type="password"
            name="password"
            autoComplete="off"
            onChange={this.handleChange}
            error={
              this.state.error.password ? this.state.error.password : undefined
            }
          />
        </Form.Group>
        <br />
        <Form.Button onClick={this.onSubmit} color="blue">
          Login
        </Form.Button>
      </Form>
    );
  };
}

const mapStateToProps = ({ user }) => {
  if (user.username) {
    sessionStorage.setItem("user", JSON.stringify(user));
    history.push("/user");
  }
  if (user.msg) {
    alert(user.msg);
  }
  return user;
};

export default connect(mapStateToProps, { loginUser })(Login);
