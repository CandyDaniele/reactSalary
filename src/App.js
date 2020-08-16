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
        <div style={styles.centeredContainerBar}>
          <div style={{backgroundColor: 'orange', width:`${this.findPercent(discountINSS).replace(",",".")}`, height:'50px'}}>
            <p style={{padding: '10px'}}>{this.findPercent(discountINSS) === '0%' ? "" : this.findPercent(discountINSS)}</p>
          </div>
          <div style={{backgroundColor: 'red', width:`${this.findPercent(discountIRPF).replace(",",".")}`, height:'50px'}}>
            <p style={{padding: '10px'}}>{this.findPercent(discountIRPF) === '0%' ? "" : this.findPercent(discountIRPF)}</p>
          </div>
          <div style={{backgroundColor: 'green', width:`${this.findPercent(netSalary).replace(",",".")}`, height:'50px'}}>
            <p style={{padding: '10px'}}>{this.findPercent(netSalary) === '0%' ? "" : this.findPercent(netSalary)}</p>
          </div>
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
  centeredContainerBar: {
    display: 'flex',
    margin: '50px 480px',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    textAlign: 'right',
  },
  centeredContainerRead: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    width: '1000px',
  }
};
