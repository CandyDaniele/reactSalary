import React, { Component } from 'react';
import css from './inputFullSalary.module.css';

export default class InputFullSalary extends Component {
  handleInputChange = (event) => {
    const newSalary = event.target.value;
    this.props.onChangeSalary(newSalary);
  };

  render() {
    const { valueSalary } = this.props;
    return (
      <div className={`input-field ${css.inputFullSalary}`}>
        <input
          className= {`validate ${css.inputFullSalary}`}
          type="number"
          id="fullSalary"
          value={valueSalary}
          onChange={this.handleInputChange}
        />
        <label className={`active ${css.inputFullSalary}`} htmlFor="fullSalary">
          Salário Bruto
        </label>
      </div>
    );
  }
}
