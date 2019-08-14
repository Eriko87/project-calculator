import React from 'react';
import './App.css';

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentInput: "",
      currentDisplay: "0",
      currentFormula: "",
      formulaDisplay: ""
    };
    this.numberHandler = this.numberHandler.bind(this);
    this.operatorHandlar = this.operatorHandlar.bind(this);
    this.equalsHandlar = this.equalsHandlar.bind(this);
    this.decimalHandlar = this.decimalHandlar.bind(this);
    this.clearHandlar = this.clearHandlar.bind(this);

  };

  numberHandler(event) {
    if (this.state.currentDisplay === "0") {
      this.setState({
        currentInput: event.target.value,
        currentDisplay: event.target.value,
        currentFormula: event.target.value,
        formulaDisplay: event.target.value
      })
    } else if (this.state.formulaDisplay.includes("=") === true) {
      this.setState({
        currentInput: event.target.value,
        currentDisplay: event.target.value,
        currentFormula: event.target.value,
        formulaDisplay: event.target.value
      })

    } else {
      let currentDisplay = this.state.currentDisplay.concat(event.target.value);
      let currentInput = this.state.currentInput.concat(event.target.value);
      let currentFormula = this.state.currentFormula.concat(event.target.value);
      let formulaDisplay = this.state.formulaDisplay.concat(event.target.value);
      this.setState({
        currentInput: currentInput,
        currentDisplay: (currentInput.length > 12) ? "Digit Limit Met" : currentInput,
        currentFormula: currentFormula,
        formulaDisplay: (formulaDisplay.length > 18) ? "Digit Limit Met" : formulaDisplay,
      });
    }

  }

  operatorHandlar(event) {

    let currentDisplay = this.state.currentInput.concat(event.target.value);
    let currentInput = this.state.currentInput.concat(event.target.value);
    let currentFormula = this.state.currentFormula.concat(event.target.value);
    let formulaDisplay = this.state.currentFormula.concat(event.target.value);
    this.setState({
      currentInput: "",
      currentDisplay: event.target.value,
      currentFormula: currentFormula,
      formulaDisplay: formulaDisplay
    })
    if (this.state.currentFormula.endsWith("+") ||
      this.state.currentFormula.endsWith("-") ||
      this.state.currentFormula.endsWith("*") ||
      this.state.currentFormula.endsWith("/")
    ) {

      let currentOperators = this.state.currentFormula;
      let shouldbeusedOperator = event.target.value;
      let lastOperatorIndex = currentOperators.length - 1
      let replaced = currentOperators.slice(0, -1) + shouldbeusedOperator
      let currentformla = this.state.currentFormula.concat(replaced)


      this.setState({
        currentInput: "",
        currentDisplay: event.target.value,
        currentFormula: replaced,
        formulaDisplay: replaced,
      });
    };
  }

  equalsHandlar() {
    if (this.state.formulaDisplay.endsWith("+") === true ||
      this.state.formulaDisplay.endsWith("-") === true ||
      this.state.formulaDisplay.endsWith("*") === true ||
      this.state.formulaDisplay.endsWith("/") === true ||
      this.state.formulaDisplay.endsWith(".") === true
    ) {
      let removed = this.state.formulaDisplay.substring(0, this.state.formulaDisplay.length - 1)
      let sum = eval(removed)
      sum = Math.round(sum * 10000) / 10000
      let formuladisplay = removed.concat("=" + sum)
      this.setState({
        currentInput: "",
        currentDisplay: sum.toString(),
        currentFormula: sum.toString(),
        formulaDisplay: formuladisplay
      })
    } else {
      let sum = eval(this.state.formulaDisplay)
      sum = Math.round(sum * 10000) / 10000
      let formuladisplay = this.state.currentFormula.concat("=" + sum)
      this.setState({
        currentInput: "",
        currentDisplay: sum.toString(),
        currentFormula: sum.toString(),
        formulaDisplay: formuladisplay
      })
    }
  }

  decimalHandlar(event) {
    if (this.state.formulaDisplay.includes("=") === true) {
      this.setState({
        currentInput: event.target.value,
        currentDisplay: event.target.value,
        currentFormula: event.target.value,
        formulaDisplay: event.target.value
      })

    }

    else if (this.state.currentInput.indexOf(".") >= 1) {
      this.setState({
        currentFormula: "",
        formuladisplay: this.state.currentFormula,
        currentnum: ""
      })
    } else {
      let currentformla = this.state.currentFormula.concat(event.target.value)
      let currentdisplay = this.state.currentInput.concat(event.target.value)
      this.setState({
        formulaDisplay: currentformla,
        currentFormula: currentformla,
        currentDisplay: currentdisplay,
        currentInput: currentdisplay
      });
    }
  }

  clearHandlar() {
    this.setState({
      currentInput: "",
      currentDisplay: "0",
      currentFormula: "",
      formulaDisplay: ""
    })
  }




  render() {
    return (
      <div className="calculator">
        <h1>Ericio</h1>
        <Display
          display={this.state.currentDisplay}
          formula={this.state.formulaDisplay}
        />
        <Buttons
          numbers={this.numberHandler}
          operators={this.operatorHandlar}
          clear={this.clearHandlar}
          equals={this.equalsHandlar}
          decimal={this.decimalHandlar}
        />
      </div>
    );
  }
}

class Buttons extends React.Component {
  render() {
    return (
      <div className="buttons">
        <button id="clear" value="" className="large" onClick={this.props.clear}>AC</button>
        <button id="divide" value="/" className="calc" onClick={this.props.operators}>/</button>
        <button id="multiply" value="*" className="calc" onClick={this.props.operators}>x</button>
        <button id="seven" value="7" className="button" onClick={this.props.numbers}>7</button>
        <button id="eight" value="8" className="button" onClick={this.props.numbers}>8</button>
        <button id="nine" value="9" className="button" onClick={this.props.numbers}>9</button>
        <button id="subtract" value="-" className="calc" onClick={this.props.operators}>-</button>
        <button id="four" value="4" className="button" onClick={this.props.numbers}>4</button>
        <button id="five" value="5" className="button" onClick={this.props.numbers}>5</button>
        <button id="six" value="6" className="button" onClick={this.props.numbers}>6</button>
        <button id="add" value="+" className="calc" onClick={this.props.operators}>+</button>
        <button id="one" value="1" className="button" onClick={this.props.numbers}>1</button>
        <button id="two" value="2" className="button" onClick={this.props.numbers}>2</button>
        <button id="three" value="3" className="button" onClick={this.props.numbers}>3</button>
        <button id="equals" value="=" className="calc" onClick={this.props.equals}>=</button>
        <button id="zero" value="0" className="button" onClick={this.props.numbers}>0</button>
        <button id="decimal" value="." className="calc" onClick={this.props.decimal}>.</button>
      </div>)
  }
}

class Display extends React.Component {
  render() {
    return (
      <div id="displaywindow">
        <h3 id="displayformula">{this.props.formula}</h3>
        <h3 id="display">{this.props.display}</h3>
      </div>
    );
  };
}


export default Calculator;
