/* eslint-disable jsx-a11y/label-has-associated-control */
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

function makePersonSlug(person) {
  return `${person.name.replace(' ', '-')}-${person.born}`.toLowerCase();
}

function requiredValidator(name, value) {
  return value
    ? null
    : `Field ${name} is required`;
}

function minLengthValidator(name, value) {
  return value.length >= 3
    ? null
    : `Field ${name} should have at least 3 symbols`;
}

function validateNewPerson(newPerson) {
  const errorsEntries = Object.entries(newPerson).map(([name, value]) => {
    let error = requiredValidator(name, value);

    if (!error && name === 'name') {
      error = minLengthValidator(name, value);
    }

    return [name, error];
  });

  const hasErrors = errorsEntries.some(([, error]) => !!error);

  const errors = errorsEntries.reduce((acc, [name, error]) => {
    return {
      ...acc,
      [name]: error,
    };
  }, {});

  return {
    errors,
    hasErrors,
  };
}

const tableColumns = [
  'name',
  'sex',
  'born',
  'died',
];

const NEW_PERSON = tableColumns.reduce((acc, name) => {
  return {
    ...acc,
    [name]: '',
  };
}, {});

const NEW_PERSON_ERRORS = tableColumns.reduce((acc, name) => {
  return {
    ...acc,
    [name]: null,
  };
}, {});

export class PeopleList extends React.Component {
  state = {
    people: peopleList,
    sortedBy: null,
    sortedPeople: peopleList,
    newPerson: NEW_PERSON,
    newPersonErrors: NEW_PERSON_ERRORS,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.sortedBy !== this.state.sortedBy
      || prevState.people !== this.state.people
    ) {
      // NOTE: disable because allowed to use inside condition
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState(({ sortedBy, people }) => ({
        sortedPeople: sortPeopleByColumn(people, sortedBy),
      }));
    }
  }

  handleChange = ({ target }) => {
    this.setState(prevState => ({
      newPerson: {
        ...prevState.newPerson,
        [target.name]: target.value,
      },
    }));
  };

  setDefaultNewPerson = () => {
    this.setState({
      newPerson: {
        name: 'Bob Smith',
        sex: 'm',
        born: 2000,
        died: 2020,
      },
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState(prevState => {
      const {
        errors,
        hasErrors,
      } = validateNewPerson(prevState.newPerson);

      if (hasErrors) {
        return {
          newPersonErrors: errors,
        };
      }

      return {
        newPersonErrors: errors,
        people: [
          ...prevState.people,
          {
            ...prevState.newPerson,
            born: Number(prevState.newPerson.born),
            died: Number(prevState.newPerson.died),
            slug: makePersonSlug(prevState.newPerson),
          },
        ],
        newPerson: NEW_PERSON,
      };
    });
  };

  sortPeople(columnKey) {
    this.setState({
      sortedBy: columnKey,
    });
  }

  render() {
    const {
      sortedBy,
      sortedPeople,
      newPerson,
      newPersonErrors,
    } = this.state;

    return (
      <div className="people">
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

        <form onSubmit={this.handleSubmit} className="ui form" name="newPerson">
          <div className={`field ${newPersonErrors.name ? 'error' : ''}`}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={newPerson.name}
              onChange={this.handleChange}
            />
            {newPersonErrors.name && (
              <label>{newPersonErrors.name}</label>
            )}
          </div>

          <div className={`field ${newPersonErrors.sex ? 'error' : ''}`}>
            <label htmlFor="sex">Sex</label>
            <select
              name="sex"
              id="sex"
              value={newPerson.sex}
              onChange={this.handleChange}
            >
              <option disabled value="">Select sex...</option>
              <option value="f">Female</option>
              <option value="m">Male</option>
            </select>
            {newPersonErrors.sex && (
              <label>{newPersonErrors.sex}</label>
            )}
          </div>

          <div className={`field ${newPersonErrors.born ? 'error' : ''}`}>
            <label htmlFor="born">Born</label>
            <input
              type="number"
              name="born"
              id="born"
              value={newPerson.born}
              onChange={this.handleChange}
            />
            {newPersonErrors.born && (
              <label>{newPersonErrors.born}</label>
            )}
          </div>

          <div className={`field ${newPersonErrors.died ? 'error' : ''}`}>
            <label htmlFor="died">Died</label>
            <input
              type="number"
              name="died"
              id="died"
              value={newPerson.died}
              onChange={this.handleChange}
            />
            {newPersonErrors.died && (
              <label>{newPersonErrors.died}</label>
            )}
          </div>

          <div style={{ display: 'flex' }}>
            <button
              style={{ order: 1 }}
              className="ui button primary"
              type="submit"
            >
              Add person
            </button>

            <button
              type="button"
              className="ui button"
              onClick={this.setDefaultNewPerson}
            >
              Fill example
            </button>
          </div>
        </form>
      </div>
    );
  }
}
