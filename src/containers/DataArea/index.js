import React, { Component } from 'react';
import DataTable from '../../components/DataTable';
import Nav from '../../components/Nav';
import API from '../../utils/API';
import './style.css';

class DataArea extends Component {
  state = {
    users: [{}],
    order: 'descend',
    filteredUsers: [{}],
  }

  headings = [
    { name: 'Image', width: '10%' },
    { name: 'Name', width: '10%' },
    { name: 'Phone', width: '20%' },
    { name: 'Email', width: '20%' },
    { name: 'Date of Birth', width: '10%' },
  ]

  componentDidMount() {
    API.getUsers().then((results) => {
      this.setState({
        users: results.data.results,
        filteredUsers: results.data.results,
      });
    });
  }

  handleSort = (heading) => {
    if (this.state.order === 'descend') {
      this.setState({
        order: 'ascend',
      });
    } else {
      this.setState({
        order: 'descend',
      });
    }

    const compareFnc = (a, b) => {
      if (this.state.order === 'ascend') {
        // account for missing values
        if (a[heading] === undefined) {
          return 1;
        } else if (b[heading] === undefined) {
          return -1;
        } else if (heading === 'name') {
          // numerically
          return a[heading].first.localeCompare(b[heading].first);
        } else {
          return a[heading] - b[heading];
        }
      } else {
        // account for missing values
        if (a[heading] === undefined) {
          return 1;
        } else if (b[heading] === undefined) {
          return -1;
        } else if (heading === 'name') {
          // numerically
          return b[heading].first.localeCompare(a[heading].first);
        } else {
          return b[heading] - a[heading];
        }
      }
    };
    const sortedUsers = this.state.filteredUsers.sort(compareFnc);
    this.setState({ filteredUsers: sortedUsers });
  }

  handleSearchChange = (event) => {
    const filter = event.target.value;
    const filteredList = this.state.users.filter((item) => {
      // merge data together, then see if user input is anywhere inside
      const values = Object.values(item)
        .join('')
        .toLowerCase();
      return values.indexOf(filter.toLowerCase()) !== -1;
    });
    this.setState({ filteredUsers: filteredList });
  }

  render() {
    return (
      <>
        <Nav handleSearchChange={this.handleSearchChange} />
        <div className="data-area">
          <DataTable
            headings={this.headings}
            users={this.state.filteredUsers}
            handleSort={this.handleSort}
          />
        </div>
      </>
    );
  }
}

export default DataArea;
