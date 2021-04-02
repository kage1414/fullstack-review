import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
      headers: []
    };
    this.getRepos();
  }


  getRepos () {
    $.ajax('/repos', {
      type: 'GET',
      success: (data) => {
        let headers = Object.keys(data[0]);
        this.setState({
          repos: data,
          headers: headers
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  search (term) {
    console.log(`${term} was searched`);
    $.ajax('/repos', {
      type: 'POST',
      data: {
        username: term
      },
      success: (data) => {
        let headers = Object.keys(data[0]);
        this.setState( {
          repos: data,
          headers: headers
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos} headers={this.state.headers}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>);
  }
}

ReactDOM.render(<App />, document.getElementById('app'));