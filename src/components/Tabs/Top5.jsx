import React from "react";
import { connect } from "react-redux";
import { loadTop5 } from "../../action creators";

class Top5 extends React.Component {
  componentDidMount = () => {
    this.props.loadTop5();
  };
  render() {
    return <h2>TOP 5</h2>;
  }
}

const getTop5 = ({ top5 }) => {
  return { top5 };
};

export default connect(getTop5, { loadTop5 })(Top5);
