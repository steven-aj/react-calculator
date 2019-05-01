import React, { Component } from 'react';

import CalculatorTooltip from './components/CalculatorTooltip/CalculatorTooltip';
import Calculator from './components/Calculator/Calculator';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="App calculator">
          <Calculator />
          <CalculatorTooltip />
        </div>
      </div>
    );
  }
}

export default App;
