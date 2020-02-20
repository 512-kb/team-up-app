import React from "react";
import { Form, Button } from "semantic-ui-react";

class Register extends React.Component {
  render() {
    return (
      <Form>
        <Form.Group>
          <Form.Input
            label="Email"
            placeholder="Email"
            name="email"
            // value={email}
            onChange={this.handleChange}
            error={{
              content: "Please enter a valid email address",
              pointing: "below"
            }}
          />
        </Form.Group>
        <Form.Group>
          <Form.Input
            label="Region"
            placeholder="Region"
            name="region"
            //  value={region}
            error={{
              content: "Please enter Region",
              pointing: "below"
            }}
          />
        </Form.Group>
        <Form.Group>
          <Form.Input
            label="Username"
            placeholder="Username"
            name="username"
            // value={mobile}
            error={{
              content: "Username error",
              pointing: "below"
            }}
          />
        </Form.Group>
        <Form.Group>
          <Form.Input
            label="Password"
            placeholder="Password"
            name="password"
            // value={password}
            error={{
              content:
                "Invalid Password Format ( only '.' , '@' , '_' , a-z , A-z , 0-9 are allowed. Min Length = 8 )",
              pointing: "below"
            }}
          />
        </Form.Group>
        <br />
        <Button color="green">Register</Button>
      </Form>
    );
  }
}

export default Register;
