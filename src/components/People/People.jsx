/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import peopleList from '../../api/people.json';
import { PersonForm } from '../PersonForm';
import { PeopleTable } from '../PeopleTable';
import { makePersonSlug } from './makePersonSlug';
import './People.scss';

export class People extends React.Component {
  state = {
    people: peopleList,
  };

  addPerson = (person) => {
    this.setState(prevState => ({
      people: [
        ...prevState.people,
        {
          ...person,
          born: Number(person.born),
          died: Number(person.died),
          slug: makePersonSlug(person),
        },
      ],
    }));
  };

  render() {
    const { people } = this.state;

    return (
      <div className="people">
        <PeopleTable people={people} />
        <PersonForm onSubmit={this.addPerson} />
      </div>
    );
  }
}
