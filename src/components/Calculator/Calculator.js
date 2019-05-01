import React, { Component } from 'react';

import input from './input';

import Output from './Output/Output';
import Keypad from './Keypad/Keypad';
import History from './History/History';

import database from '../../database';


export default class Calculator extends Component {

    constructor(props) {
        super(props);

        this.state = {
            input: String(0),
            storage: null,
            operation: null,
            hasCalculation: false
        };
        
        this.interpretInput = this.interpretInput.bind(this);
        this.getSelectedHistory = this.getSelectedHistory.bind(this);
    };
    
    componentDidMount() {
        document.addEventListener("keydown", this.handleKeypress.bind(this));
    }

    /*
        Gets the event of a keypad selection.

        Handles numerical, modifying & operating values accordingly.
    */
    interpretInput(e) {
        const selection = e.target.innerText;
        // Handle keypad input for...

        if ( input.is.numerical(selection) ) { // ... numbers,
            let newState = this.constructNumber(selection, this.state);
            return this.setState(newState);

        } else if ( input.is.modifier(selection) ) { // ... modifiers,
            let newState = this.applyModifier(selection, this.state);
            return this.setState(newState);

        } else if ( input.is.operation(selection) ) { // ... operations
            let newState = this.applyOperator(selection, this.state);
            return this.setState(newState);

        } else {   
            return console.log("Invalid input from keypad. How did you do that?!");
        }
    };

    handleKeypress(e) {
        const selection = e.key
        // Handle keypresses for...
        
        if ( input.is.numerical(selection) ) { // ... numbers,
            let newState = this.constructNumber(selection, this.state);
            return this.setState(newState);

        } else if ( input.is.modifier(selection) ) { // ... modifiers,
            let newState = this.applyModifier(selection, this.state);
            return this.setState(newState);

        } else if ( input.is.operation(selection) ) { // ... operations
            let newState = this.applyOperator(selection, this.state);
            return this.setState(newState);

        } else {   
            return console.log("Invalid input from keyboard.");
        }
    };

    getSelectedHistory(e) {
        let result = e.target.closest('li').children[2].innerText;
        return this.sendToOutput(result);
    }

    sendToOutput(value) {
        return this.setState({input: value});
    }

    /* 
        Takes in a numerical value and original state.

        Constructs & returns a new state with value concatenated.
    */
    constructNumber(digit, oState) {
        // terminate early if the input already has a decimal
        if (digit === '.' && oState.input.includes('.')) return
        
        let newState = oState;
        // if display is '0', 'NaN' or has a previous calculation... 
        if (oState.input === '0' || oState.input === 'NaN' || oState.hasCalculation) {
            newState.input = digit;             // set display to digit...
            newState.hasCalculation = false;    // reset calc confirmations
        // otherwise...
        } else {                                
            newState.input += digit;            // concat digit                        
        };

        return newState;
    };


    /*
        Takes in an operator and original state.

        Returns a new state with updated operator.
    */
    applyOperator(operator, oState) {
        //terminate early if first operation is '=' or 'Enter'
        if (!oState.storage && (operator === '=' || operator === 'Enter')) return oState;

        let newState = oState;
        // if neither 'operation' nor 'storage' value exists and operator isn't '='...
        if (!oState.operation && !oState.storage) {
            newState.operation = operator;      // set current operation,
            newState.storage = oState.input;    // shift input to storage,
            newState.input = String(0);         // and reset input

        // else, if the operation has been chosen and isn't '='...
        } else if (oState.operation && (operator !== '=' && operator !== 'Enter')) {
            newState.operation = operator;      // reset operation
            
        // otherwise...
        } else {                                
            let result = this.completeArithmetic(oState); // ... calculate result,
            newState.operation = null;          // reset operation,
            newState.storage = null;            // reset storage,
            newState.hasCalculation = true;     // confirm calculation finished
            newState.input = String(result);    // and display result
        }

        return newState
    };


    /*
        Takes in the original state.

        Returns the result of desired operation on 'storage' & 'input' as a new state
    */
    completeArithmetic(oState) {
        switch(oState.operation) {
            case '+': return this._handleAddition(oState);
            case '-': return this._handleSubtraction(oState);
            case 'x': case '*': return this._handleMultiplication(oState);
            case '÷': case '/': return this._handleDivision(oState);
            default: console.log("Something went wrong calculating....");
        }
    };

    /*
        Takes in the original state.

        Adds 'storage' and 'input' values, pushes arithmetic data to database then constructs a new state and returns it
    */
    _handleAddition(oState) {
        let result = Number(oState.storage) + Number(oState.input);
        database.history.put({
            val1: oState.storage, 
            val2: oState.input, 
            operation: oState.operation,
            result: result
        });
        return result;
    }

    /*
        Takes in the original state.

        Subtracts 'input' from 'storage' value, pushes arithmetic data to database then constructs a new state and returns it
    */
    _handleSubtraction(oState) {
        let result = Number(oState.storage) - Number(oState.input);
        database.history.put({
            val1: oState.storage, 
            val2: oState.input, 
            operation: oState.operation,
            result: result
        });
        return  result;
    }

    /*
        Takes in the original state

        Multiplies 'storage' by 'input' value, pushes arithmetic data to database then constructs a new state and returns it.
    */

    _handleMultiplication(oState) {
        let result = Number(oState.storage) * Number(oState.input);
        database.history.put({
            val1: oState.storage, 
            val2: oState.input, 
            operation: 'x',
            result: result
        });
        return result;
    }

    /*
        Takes in the original state

        If neither 'storage' nor 'input' values are 0, then constructs a new state and returns it
    */
    _handleDivision(oState) {
        let result = (oState.storage === '0' || oState.input === '0') ? 'Error' : Number(oState.storage) / Number(oState.input);

        if (result !== 'Error') {
            database.history.put({
                val1: oState.storage, 
                val2: oState.input, 
                operation: oState.operation,
                result: result
            });
        }

        return result;
    }



    /*
        Takes in selected modifier and original state.

        Applies the selected modifier to the input on display.
    */
    applyModifier(selection, oState) {
        switch(selection) {
            case 'AC': case 'Escape': case 'c': return this.clearScreen();
            case '+/-': case 'n': return this.toggleNegativity(oState);
            case '%': return this.toPercent(oState);
            case 'Backspace': return this.undoLastEntry(oState);
            default: console.log("Something went wrong applying that modifier...");
        }
    };


    /* 
        Takes in original state.

        Converts the input value to a negative/positive value
    */
   toggleNegativity(oState) {
    let value = Number(oState.input)
    if (value === 0) return;    // early termination
    
    let newState = oState;
    if(value > 0) {
        newState.input = "-" + oState.input;
    } else {
        newState.input = oState.input.substring(1);
    }

    return newState;
   }

   /* 
        Takes in original state

        Removes the last character in 'input'.
   */
   undoLastEntry(oState) {
       let newState = oState;
       if (newState.input === '0') return;

       if (newState.input.length > 1) {
           newState.input = newState.input.slice(0, -1);
       } else {
           newState.input = String(0);
       }

       return newState;
   }


    /*
        Takes in original state.

        Converts the input to a percentage, returning the updated state
    */
    toPercent(oState) {
        let newState = oState;
        newState.input = oState.input / 100;
        return newState;
    }


    /*
        Returns a new state of empty values
    */
    clearScreen() {
        return {
            input: String(0),
            storage: null,
            modifier: null,
            operation: null,
            hasCalculation: false
        };
    };


    render() {
        return (
            <div>
                <Output 
                    operation={this.state.operation}
                    previous={this.state.storage} 
                    current={this.state.input}
                    onKeyPress={this.handleKeypress}
                />

                <History 
                    selected={this.getSelectedHistory}
                />

                <Keypad 
                    selected={this.interpretInput} 
                />


            </div>
        )
    };
}