import React, { Component } from "react";
import { Form } from "semantic-ui-react";
import _ from "lodash";
import { loadTop5 } from "../../../action creators";
import { connect } from "react-redux";
import moment from "moment";

class Filter extends Component {
  state = {};
  handleChange = (e, { name, value }) => {
    const time =
      name === "$lte"
        ? moment(value)
            .add("1", "day")
            .subtract("1", "milliseconds")
            .format("x")
        : moment(value).format("x");

    if (value === "") {
      this.updateTop5(_.omit(this.state, name));
      delete this.state[name];
      this.setState({});
    } else {
      if (!this.validate(name, time)) {
        alert("Invalid Range");
        return;
      }
      this.updateTop5({ ...this.state, [name]: time });
      this.setState({
        [name]: time
      });
    }
  };

  validate = (name, time) => {
    if (name === "$lte" && this.state.$gte)
      return this.state.$gte.localeCompare(time) === -1;
    if (name === "$gte" && this.state.$lte)
      return time.localeCompare(this.state.$lte) === -1;
    return true;
  };

  updateTop5 = filter => {
    this.props.loadTop5("channels", filter);
    this.props.loadTop5("users", filter);
    this.props.loadTop5("tags", filter);
    this.props.loadTop5("regions", filter);
  };
  s;

  render = () => {
    return (
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <Form.Input
          label="FROM:"
          name="$gte"
          type="date"
          style={{ marginLeft: "1rem" }}
          onChange={this.handleChange}
          max={moment(Date.now(), "x").format("YYYY-MM-DD")}
        />
        <div style={{ marginLeft: "3rem" }}>
          <Form.Input
            label="TO:"
            name="$lte"
            type="date"
            style={{ marginLeft: "1rem" }}
            onChange={this.handleChange}
            max={moment(Date.now(), "x").format("YYYY-MM-DD")}
          />
        </div>
      </div>
    );
  };
}

export default connect(null, { loadTop5 })(Filter);
