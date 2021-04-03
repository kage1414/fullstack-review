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
  }

  componentDidMount() {
    $.ajax('/repos', {
      type: 'GET',
      success: (data) => {
        let headers = Object.keys(data[0]);
        console.log(data);
        this.setState({
          repos: data,
          headers: headers
        });
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  search (term) {
    // this.setState({
    //   repos: [],
    //   headers: []
    // });
    console.log(`${term} was searched`);
    $.ajax('/repos', {
      type: 'POST',
      data: {
        username: term
      },
      success: (data) => {
        console.log(data);
        let headers = Object.keys(data[0]);
        this.setState({
          repos: data
        });
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <h2>{this.state.repos.length}</h2>
      <RepoList repos={this.state.repos} headers={this.state.headers}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>);
  }
}

ReactDOM.render(<App />, document.getElementById('app'));