import React, { Component } from 'react';
import css from './inputReadOnly.module.css';

export default class InputReadOnly extends Component {
  render() {
    const { valueSalary, labelName, color } = this.props;
    return (
      <div className={`input-field ${css.inputReadOnly}`}>
        <input className={`validate ${css.widthInput} ${color}`}
          type="text"
          value={valueSalary}
          readOnly
        />
        <label className={`active`}>
          {labelName}
        </label>
      </div>
    );
  }
}
