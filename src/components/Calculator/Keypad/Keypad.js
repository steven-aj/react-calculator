import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Keypad.css';

export default class Keypad extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <button onClick={this.props.selected} className="modifier col-3">AC</button>
                    <button onClick={this.props.selected} className="modifier col-3">+/-</button>
                    <button onClick={this.props.selected} className="modifier col-3">%</button>
                    <button onClick={this.props.selected} className="operator col-3">&#247;</button>
                </div>
                <div className="row">
                    <button onClick={this.props.selected} className="number col-3">7</button>
                    <button onClick={this.props.selected} className="number col-3">8</button>
                    <button onClick={this.props.selected} className="number col-3">9</button>
                    <button onClick={this.props.selected} className="operator col-3">x</button>
                </div>
                <div className="row">
                    <button onClick={this.props.selected} className="number col-3">4</button>
                    <button onClick={this.props.selected} className="number col-3">5</button>
                    <button onClick={this.props.selected} className="number col-3">6</button>
                    <button onClick={this.props.selected} className="operator col-3">-</button>
                </div>
                <div className="row">
                    <button onClick={this.props.selected} className="number col-3">1</button>
                    <button onClick={this.props.selected} className="number col-3">2</button>
                    <button onClick={this.props.selected} className="number col-3">3</button>
                    <button onClick={this.props.selected} className="operator col-3">+</button>
                </div>
                <div className="row">
                    <button onClick={this.props.selected} className="number col-6">0</button>
                    <button onClick={this.props.selected} className="number col-3">.</button>
                    <button onClick={this.props.selected} className="operator col-3">=</button>
                </div>
            </div>
        )
    }

}

Keypad.propTypes = {
    selected: PropTypes.func.isRequired
}