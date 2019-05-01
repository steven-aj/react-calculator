import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Output.css';

export default class Output extends Component{
    render() {
        return(
            <div className="output-screen">
                <p className="previous-value">{this.props.previous} {this.props.operation}</p>
                <p className="current-value">{this.props.current}</p>
            </div>
        )
    }   
}

Output.propTypes = {
    current: PropTypes.string.isRequired,
    previous: PropTypes.string || PropTypes.number,
    operation: PropTypes.string
}