import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';

import './CalculatorTooltip.css';

export default class CalculatorTooltip extends Component {
    constructor(...args) {
        super(...args);
    
        this.attachRef = target => this.setState({ target });
        this.state = { show: false };
      }
    
      render() {
        const { show, target } = this.state;
        return (
          <div>
            <Button
              block
              size="sm"
              variant="dark"
              ref={this.attachRef}
              onClick={() => this.setState({ show: !show })}
            >Tips</Button>
            <Overlay target={target} show={show} placement="top">
              {props => (
                <Tooltip {...props}>
                  <h6><u><b>Use the keyboard!</b></u></h6> 
                  
                  <p ><i>('0' - '9') and '.' to input a number</i></p>

                  <p><i>'+' to add</i></p>
                  
                  <p><i>'-' to subtract</i></p>

                  <p><i>'x' -or- '*' to multiply</i></p>

                  <p><i>'%' to convert to percentage</i></p>
                  
                  <p><i>'n' to toggle negativity</i></p> 
                   
                  <p><i>'Backspace' to undo last input</i></p>

                  <p><i>'Enter' -or- ''=' to finalize arithmetic</i></p>

                  <p><i>'Esc' -or- 'c' to clear all</i></p>
                </Tooltip>
              )}
            </Overlay>
          </div>
        );
      }
}