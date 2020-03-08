import React from "react";
import { Dimmer, Loader, Segment, Header, Table } from "semantic-ui-react";
import { loadTop5 } from "../../../action creators";
import { connect } from "react-redux";

class Entity extends React.Component {
  componentDidMount = () => {
    this.props.loadTop5(this.props.name, {});
  };
  createList = arr => {
    return (
      <Table style={{ textAlign: "center" }} basic="very" celled collapsing>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>{this.props.name.toUpperCase()}</Table.HeaderCell>
            <Table.HeaderCell>
              {this.units(this.props.name).toUpperCase()}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {arr.map(item => (
            <Table.Row
              key={this.props.name === "channels" ? item.name : item._id}
            >
              <Table.Cell>
                {this.props.name === "channels" ? item.name : item._id}
              </Table.Cell>
              <Table.Cell>
                {this.props.name === "tags" ? item.channels.length : item.count}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  };
  units(name) {
    switch (name) {
      case "channels":
      case "users":
        return "Posts";
      case "regions":
        return "Users";
      case "tags":
        return "Channels";
      default:
        return "";
    }
  }
  render() {
    return this.props[this.props.name] ? (
      <Segment>
        <Header as="h2" floated="left">
          Top {this.props.name}
        </Header>
        <br />
        {this.createList(this.props[this.props.name])}
      </Segment>
    ) : (
      <Dimmer active inverted>
        <Loader content="Loading" />
      </Dimmer>
    );
  }
}

const getTop5 = ({ top5 }, { name }) => {
  return { [name]: top5[name] };
};

export default connect(getTop5, { loadTop5 })(Entity);
