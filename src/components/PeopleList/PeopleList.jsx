import React from 'react';
import peopleList from '../../api/people.json';
import './PeopleList.scss';

function sortPeopleByColumn(people, columnKey) {
  return people.sort((prevPerson, nextPerson) => {
    if (typeof prevPerson[columnKey] === 'string') {
      return prevPerson[columnKey].localeCompare(nextPerson[columnKey]);
    }

    if (typeof prevPerson[columnKey] === 'number') {
      return prevPerson[columnKey] - nextPerson[columnKey];
    }

    return 0;
  });
}

const tableColumns = [
  'name',
  'sex',
  'born',
  'died',
];

export class PeopleList extends React.Component {
  people = peopleList;

  state = {
    sortedBy: null,
    sortedPeople: this.people,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.sortedBy !== this.state.sortedBy) {
      // NOTE: disable because allowed to use inside condition
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState(({ sortedBy }) => ({
        sortedPeople: sortPeopleByColumn(this.people, sortedBy),
      }));
    }
  }

  sortPeople(columnKey) {
    this.setState({
      sortedBy: columnKey,
    });
  }

  render() {
    const { sortedBy, sortedPeople } = this.state;

    return (
      <div className="people-table-wrapper">
        <table className="ui celled table">
          <thead>
            <tr>
              {tableColumns.map((columnKey) => (
                <th
                  key={columnKey}
                  className={`people-table-head ${sortedBy === columnKey ? 'active' : ''}`}
                  onClick={() => this.sortPeople(columnKey)}
                >
                  {columnKey}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {sortedPeople.map((person) => (
              <tr key={person.slug}>
                {tableColumns.map((columnKey) => (
                  <td key={columnKey}>{person[columnKey]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
