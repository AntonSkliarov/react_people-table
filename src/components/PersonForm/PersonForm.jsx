/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import { validateNewPerson } from './validateNewPerson';
import { initialValues, initialErrors } from './constants';
import { peopleConfig } from '../../constants';

export class PersonForm extends Component {
  state = {
    values: initialValues,
    errors: initialErrors,
  };

  handleChange = ({ target }) => {
    this.setState(prevState => ({
      values: {
        ...prevState.values,
        [target.name]: target.value,
      },
    }));
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { onSubmit } = this.props;

    this.setState(prevState => {
      const {
        errors,
        hasErrors,
      } = validateNewPerson(prevState.values);

      if (hasErrors) {
        return {
          errors,
        };
      }

      onSubmit(prevState.values);

      return {
        errors,
        values: initialValues,
      };
    });
  };

  setDefaultNewPerson = () => {
    this.setState({
      values: {
        name: 'Bob Smith',
        sex: 'm',
        born: 2000,
        died: 2020,
      },
    });
  };

  render() {
    const { values, errors } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className="ui form" name="newPerson">
        {/* TODO: extend tableColumns, add type, validators fields */}
        {peopleConfig.map((name) => (
          <div className={`field ${errors[name] ? 'error' : ''}`}>
            <label htmlFor={name}>
              {name.toUpperCase()}
            </label>
            <input
              type="text"
              name={name}
              id={name}
              value={values[name]}
              onChange={this.handleChange}
            />
            {errors[name] && (
              <label>{errors[name]}</label>
            )}
          </div>
        ))}

        {/* <div className={`field ${errors.sex ? 'error' : ''}`}> */}
        {/*  <label htmlFor="sex">Sex</label> */}
        {/*  <select */}
        {/*    name="sex" */}
        {/*    id="sex" */}
        {/*    value={values.sex} */}
        {/*    onChange={this.handleChange} */}
        {/*  > */}
        {/*    <option disabled value="">Select sex...</option> */}
        {/*    <option value="f">Female</option> */}
        {/*    <option value="m">Male</option> */}
        {/*  </select> */}
        {/*  {errors.sex && ( */}
        {/*    <label>{errors.sex}</label> */}
        {/*  )} */}
        {/* </div> */}

        {/* <div className={`field ${errors.born ? 'error' : ''}`}> */}
        {/*  <label htmlFor="born">Born</label> */}
        {/*  <input */}
        {/*    type="number" */}
        {/*    name="born" */}
        {/*    id="born" */}
        {/*    value={values.born} */}
        {/*    onChange={this.handleChange} */}
        {/*  /> */}
        {/*  {errors.born && ( */}
        {/*    <label>{errors.born}</label> */}
        {/*  )} */}
        {/* </div> */}

        {/* <div className={`field ${errors.died ? 'error' : ''}`}> */}
        {/*  <label htmlFor="died">Died</label> */}
        {/*  <input */}
        {/*    type="number" */}
        {/*    name="died" */}
        {/*    id="died" */}
        {/*    value={values.died} */}
        {/*    onChange={this.handleChange} */}
        {/*  /> */}
        {/*  {errors.died && ( */}
        {/*    <label>{errors.died}</label> */}
        {/*  )} */}
        {/* </div> */}

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
    );
  }
}
