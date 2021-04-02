import React from 'react';
import TableRow from './TableRow.jsx';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    <span>There are {props.repos.length} repos.</span>
    <table>
      <tbody>
        {props.repos.map((repo, idx) => <TableRow row={repo} key={idx} />)}
      </tbody>
    </table>
  </div>
);



export default RepoList;