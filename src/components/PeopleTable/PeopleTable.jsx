import React from 'react';
import './PeopleTable.scss';

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

export class PeopleTable extends React.Component {
  state = {
    peopleToRender: [],
    prevPeople: [],
    prevSortBy: null,
  };

  static getDerivedStateFromProps(nextProps, state) {
    if (
      nextProps.people !== state.prevPeople
      || nextProps.sortedBy !== state.prevSortBy
    ) {
      return {
        prevPeople: nextProps.people,
        prevSortBy: nextProps.sortedBy,
        peopleToRender: sortPeopleByColumn(nextProps.people, nextProps.sortedBy),
      };
    }

    return null;
  }

  render() {
    const { sortedBy, changeSortBy } = this.props;
    const { peopleToRender } = this.state;

    return (
      <table className="ui celled table">
        <thead>
          <tr>
            {tableColumns.map((columnKey) => (
              <th
                key={columnKey}
                className={`people-table-head ${sortedBy === columnKey ? 'active' : ''}`}
                onClick={() => changeSortBy(columnKey)}
              >
                {columnKey}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {peopleToRender.map((person) => (
            <tr key={person.slug}>
              {tableColumns.map((columnKey) => (
                <td key={columnKey}>{person[columnKey]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
