import React from "react";
import { Form, Button } from "semantic-ui-react";

class Login extends React.Component {
  render() {
    return (
      <Form>
        <Form.Group>
          <Form.Input label="Username" placeholder="Username" name="username" />
        </Form.Group>
        <Form.Group>
          <Form.Input
            label="Password"
            placeholder="Password"
            type="password"
            name="password"
          />
        </Form.Group>
        <br />
        <Button color="blue">Login</Button>
      </Form>
    );
  }
}

export default Login;
