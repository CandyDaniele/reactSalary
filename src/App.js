import React, { Component } from 'react';
import InputFullSalary from './components/inputFullSalary/InputFullSalary';
import InputReadOnly from './components/inputReadOnly/InputReadOnly';
import { calculateSalaryFrom } from './helpers/salary';
import { formatCurrency, formatPercent } from './helpers/formatNumber';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      fullSalary: 0,
      caculateSalary: {
        baseINSS: 0,
        discountINSS: 0,
        baseIRPF: 0,
        discountIRPF: 0,
        netSalary: 0,
      },
    };
  }

  handleChangeSalary = (newSalary) => {
    const {
      baseINSS,
      discountINSS,
      baseIRPF,
      discountIRPF,
      netSalary,
    } = calculateSalaryFrom(newSalary);

    this.setState({
      fullSalary: newSalary,
      caculateSalary: {
        baseINSS,
        discountINSS,
        baseIRPF,
        discountIRPF,
        netSalary,
      },
    });
  };

  findPercent = (value) => {
    const { fullSalary} = this.state;
    let valuePercent =  formatPercent(isNaN(value / fullSalary) ? 0 : value / fullSalary);
    
    return valuePercent;
  }

  render() {
    const { fullSalary, caculateSalary } = this.state;

    const {
      baseINSS,
      discountINSS,
      baseIRPF,
      discountIRPF,
      netSalary,
    } = caculateSalary;

    return (
      <div>
        <h1 style={styles.centeredTitle}>React Salário</h1>
        <div style={styles.centeredContainer}>
          <InputFullSalary
            valueSalary={fullSalary}
            onChangeSalary={this.handleChangeSalary}
          />
        </div>
        <div style={styles.centeredContainerRead} className="container">
          <InputReadOnly labelName="Base INSS" color="black-text" valueSalary={formatCurrency(baseINSS)} />
          <InputReadOnly labelName="Desconto INSS" color="orange-text" valueSalary={`${formatCurrency(discountINSS)} (${this.findPercent(discountINSS)})`} />
          <InputReadOnly labelName="Base IRRF" color="black-text" valueSalary={formatCurrency(baseIRPF)} />
          <InputReadOnly labelName="Desconto IRRF" color="red-text" valueSalary={`${formatCurrency(discountIRPF)} (${this.findPercent(discountIRPF)})`} />
          <InputReadOnly labelName="Salário Líquido" color="green-text" valueSalary={`${formatCurrency(netSalary)} (${this.findPercent(netSalary)})`} />
        </div>
      </div>
    );
  }
}

const styles = {
  centeredTitle: {
    textAlign: 'center',
  },
  centeredContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredContainerRead: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    width: '1000px',
  },
};
