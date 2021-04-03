import React from 'react';
import HeaderCell from './HeaderCell.jsx';

const TableHeader = (props) => (
  <tr>{props.headers.map((cell, idx) => <HeaderCell cell={cell} key={idx} />)}</tr>
);


export default TableHeader;