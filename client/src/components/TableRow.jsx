import React from 'react';
import TableCell from './TableCell.jsx';

class TableRow extends React.Component {

  constructor(props) {
    super(props);
    this.keyValArray = [];
    this.createKeyValueArray();
  }

  createKeyValueArray() {
    let keys = Object.keys(this.props.repo);
    let values = Object.values(this.props.repo);
    for (let i = 0; i < keys.length && i < values.length; i++) {
      let tuple = [];
      tuple.push(keys[i]);
      tuple.push(values[i]);
      this.keyValArray.push(tuple);
    }
  }

  render() {
    return (<tr>{
      this.keyValArray.map((cell, idx) => {

        if (cell[0] === 'name') {
          return <TableCell hyperlink={this.props.repo.html_url} cell={cell[1]} key={cell[1]} />;
        } else {
          return <TableCell hyperlink={''} cell={cell[1]} key={cell[1]} />;
        }
      })
    }
    </tr>);
  }
}


export default TableRow;