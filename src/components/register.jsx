import React from "react";
import { Form, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import history from "../history";
import { registerUser } from "../action creators";

class Register extends React.Component {
  state = {
    email: "",
    region: "",
    username: "",
    password: "",
    requestSent: false,
    error: { email: false, region: false, username: false, password: false }
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  emailValidator = email => {
    // eslint-disable-next-line
    const pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (email === "" || !pattern.test(email)) return false;
    return true;
  };
  passValidator = pass => {
    if (pass === "" || !/[a-zA-Z0-9._@]{8,}/.test(pass)) return false;
    return true;
  };
  regionValidator = pass => {
    if (pass === "" || !/^[a-zA-Z]{2,}$/.test(pass)) return false;
    return true;
  };
  usernameValidator = pass => {
    if (pass === "" || !/^[a-z0-9_-]{3,}$/.test(pass)) return false;
    return true;
  };

  validate = formValues => {
    let error = {
      email: false,
      region: false,
      username: false,
      password: false
    };

    if (!this.usernameValidator(formValues.username))
      error.username =
        "Enter a valid username ( only '-' , '_' , a-z , A-z , 0-9 are allowed. Min Length = 3 )  ";
    if (!this.regionValidator(formValues.region))
      error.region = "Enter a valid region";

    if (!this.emailValidator(formValues.email))
      error.email = "Please enter a valid email address";
    if (!this.passValidator(formValues.password))
      error.password =
        "Invalid Password Format ( only '.' , '@' , '_' , a-z , A-z , 0-9 are allowed. Min Length = 8 )";
    this.setState({ error, requestSent: false });
    if (error.email || error.region || error.username || error.password)
      return false;
    return true;
  };

  onSubmit = () => {
    this.setState({ requestSent: true });
    const formValues = {
      email: this.state.email,
      region: this.state.region,
      username: this.state.username,
      password: this.state.password
    };
    if (this.validate(formValues)) {
      this.props.registerUser(formValues);
    }
  };

  render = () => {
    return (
      <Form>
        <Form.Group>
          <Form.Input
            label="Email"
            placeholder="Email"
            name="email"
            onChange={this.handleChange}
            error={
              this.state.error.email
                ? {
                    content: this.state.error.email,
                    pointing: "below"
                  }
                : undefined
            }
          />
        </Form.Group>
        <Form.Group>
          <Form.Input
            label="Region"
            placeholder="Region"
            name="region"
            onChange={this.handleChange}
            error={
              this.state.error.region
                ? {
                    content: this.state.error.region,
                    pointing: "below"
                  }
                : undefined
            }
          />
        </Form.Group>
        <Form.Group>
          <Form.Input
            label="Username"
            placeholder="Username"
            name="username"
            onChange={this.handleChange}
            error={
              this.state.error.username
                ? {
                    content: this.state.error.username,
                    pointing: "below"
                  }
                : undefined
            }
          />
        </Form.Group>
        <Form.Group>
          <Form.Input
            label="Password"
            placeholder="Password"
            name="password"
            onChange={this.handleChange}
            error={
              this.state.error.password
                ? {
                    content: this.state.error.password,
                    pointing: "below"
                  }
                : undefined
            }
          />
        </Form.Group>
        <br />
        {this.state.requestSent ? (
          <Button loading primary>
            Loading
          </Button>
        ) : (
          <Button color="green" onClick={this.onSubmit}>
            Register
          </Button>
        )}
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

export default connect(mapStateToProps, { registerUser })(Register);
