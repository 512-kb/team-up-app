import React from "react";
import { Form, Button } from "semantic-ui-react";
import { Field, reduxForm, SubmissionError } from "redux-form";
import _ from "lodash";

import history from "../history";
import axios from "../apis/axios";

class Register extends React.Component {
  state = {
    requestSent: false
  };

  onSubmit = async (formValues) => {
    this.setState({ requestSent: true });
    let error = {};
    const validator = {
      email: {
        // eslint-disable-next-line
        pattern: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
        err: "Please enter a valid email address"
      },
      password: {
        pattern: /^[a-zA-Z0-9._@]{8,}$/,
        err:
          "Invalid Password Format ( only '.' , '@' , '_' , a-z , A-Z , 0-9 are allowed. Min Length = 8 )"
      },
      region: { pattern: /^[a-zA-Z]{2,}$/, err: "Enter a valid region" },
      username: {
        pattern: /^[a-z0-9_-]{3,}$/,
        err:
          "Enter a valid username ( only '-' , '_' , a-z , A-Z , 0-9 are allowed. Min Length = 3 )  "
      }
    };

    for (let [key, val] of Object.entries(formValues)) {
      const { pattern, err } = validator[key];
      if (!pattern.test(val)) {
        error[key] = err;
      }
    }
    if (!Object.entries(error).length) {
      const { data } = await axios.post("/register", formValues);
      if (data._id) {
        sessionStorage.setItem("user", JSON.stringify(data));
        this.props.reset();
        history.push("/user");
      } else _.assign(error, data);
    }
    this.setState({ requestSent: false });
    if (Object.entries(error).length) throw new SubmissionError(error);
  };

  renderInput = ({
    input,
    type,
    meta: { asyncValidating, error, touched }
  }) => {
    return (
      <Form.Group>
        <Form.Input
          label={input.name[0].toUpperCase() + input.name.slice(1)}
          type={type}
          error={touched && error ? error : undefined}
          {...input}
          loading={asyncValidating}
          required
          autoComplete={"off"}
        />
      </Form.Group>
    );
  };

  render = () => {
    console.log(this.props);
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <Form onSubmit={handleSubmit(this.onSubmit)}>
        <Field name="email" type="email" component={this.renderInput} />
        <Field name="region" type="text" component={this.renderInput} />
        <Field name="username" type="text" component={this.renderInput} />
        <Field name="password" type="password" component={this.renderInput} />
        <br />
        <Button type="submit" loading={this.state.requestSent} color="green">
          Register
        </Button>
        <Button disabled={pristine || submitting} onClick={reset} color="red">
          Reset
        </Button>
      </Form>
    );
  };
}
export default reduxForm({
  form: "register",
  asyncValidate: async ({ email, username }) => {
    const { data } = await axios.get("/validate", {
      params: { email, username }
    });
    if (data.email || data.username) throw data;
  },
  asyncChangeFields: ["username", "email"]
})(Register);
