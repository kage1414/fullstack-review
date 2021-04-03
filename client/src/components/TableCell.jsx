import React from 'react';

const TableCell = (props) => {

  if (props.hyperlink) {
    return (<td><a href={props.hyperlink}>{props.cell}</a></td>);
  } else {
    return (<td>{props.cell}</td>);
  }

};

export default TableCell;