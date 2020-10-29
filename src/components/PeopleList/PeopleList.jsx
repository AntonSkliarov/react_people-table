import React from 'react';
import peopleList from '../../api/people.json';
import './PeopleLsit.scss';
import { PeopleTable } from '../PeopleTable';

export class PeopleList extends React.Component {
  people = peopleList;

  state = {
    sortedBy: null,
  };

  sortPeople = (columnKey) => {
    this.setState({
      sortedBy: columnKey,
    });
  };

  render() {
    const { sortedBy } = this.state;

    return (
      <div className="people-table-wrapper">
        <PeopleTable
          sortedBy={sortedBy}
          people={this.people}
          changeSortBy={this.sortPeople}
        />
      </div>
    );
  }
}
