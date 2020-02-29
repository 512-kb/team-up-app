import React from "react";
import { Segment } from "semantic-ui-react";
import Entity from "./EntityTable";

class Top5 extends React.Component {
  render = () => {
    return (
      <React.Fragment>
        <Segment.Group horizontal>
          <Entity name="users" />
          <Entity name="channels" />
        </Segment.Group>
        <Segment.Group horizontal>
          <Entity name="regions" />
          <Entity name="tags" />
        </Segment.Group>
      </React.Fragment>
    );
  };
}

export default Top5;
