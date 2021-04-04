import React from 'react';
import TableRow from './TableRow.jsx';
import TableHeader from './TableHeader.jsx';

const RepoList = (props) => {

  return (
    <div>
      <h4> Repo List Component </h4>
      <span>There are {props.repos.length} repos.</span>
      <table>
        <thead>
          <TableHeader headers={props.headers} />
        </thead>
        <tbody>
          {props.repos.map((repo, idx) => {
            return <TableRow repo={repo} key={Math.random()} />;
          })}
        </tbody>
      </table>
    </div>
  );
};



export default RepoList;