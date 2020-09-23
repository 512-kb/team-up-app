import React from "react";
import { Form, Message } from "semantic-ui-react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";

import { loginUser } from "../action creators";
import history from "../history";

class Login extends React.Component {
  state = {};
  componentDidUpdate = () => {
    const { user, submitSucceeded } = this.props;
    //console.log({ user, submitSucceeded });
    if (user._id) {
      sessionStorage.setItem("user", JSON.stringify(user));
      history.push("/user");
    } else if (!this.state.err && submitSucceeded) this.setState({ err: true });
  };

  renderInput = ({ input, type }) => {
    return (
      <Form.Input
        label={input.name[0].toUpperCase() + input.name.slice(1)}
        type={type}
        style={{ width: "25vw" }}
        {...input}
        required
        autoComplete={"off"}
      />
    );
  };

  render = () => {
    const { loginUser, handleSubmit, submitting } = this.props;
    return (
      <Form error={this.state.err} onSubmit={handleSubmit(loginUser)}>
        <Field name="username" type="text" component={this.renderInput} />
        <Field name="password" type="password" component={this.renderInput} />
        <Message
          error
          header="Login Failed"
          style={{ width: "25vw" }}
          content="Invalid Username or Password"
        />
        <br />
        <Form.Button loading={submitting} type="submit" color="blue">
          Login
        </Form.Button>
      </Form>
    );
  };
}

const mapStateToProps = ({ user }) => {
  return { user };
};

export default connect(mapStateToProps, { loginUser })(
  reduxForm({
    form: "login"
  })(Login)
);
