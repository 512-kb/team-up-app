import React from "react";
import Channels from "./channels";

class Posts extends React.Component {
  render = () => {
    return <Channels data={this.props.data.channels} />;
  };
}

export default Posts;
