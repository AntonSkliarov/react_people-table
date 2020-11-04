import React, { Component } from 'react';
import { peopleConfig } from '../../constants';
import { sortObjectsByKey } from '../../utils';

export class PeopleTable extends Component {
  state = {
    sortedBy: null,
    people: this.props.people,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.sortedBy !== this.state.sortedBy
      || prevProps.people !== this.props.people
    ) {
      // NOTE: disable because allowed to use inside condition
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState(({ sortedBy }) => ({
        people: sortObjectsByKey(this.props.people, sortedBy),
      }));
    }
  }

  sortPeople(columnKey) {
    this.setState({
      sortedBy: columnKey,
    });
  }

  render() {
    const { people, sortedBy } = this.state;

    return (
      <table className="ui celled table">
        <thead>
          <tr>
            {peopleConfig.map((columnKey) => (
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
          {people.map((person) => (
            <tr key={person.slug}>
              {peopleConfig.map((columnKey) => (
                <td key={columnKey}>{person[columnKey]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
