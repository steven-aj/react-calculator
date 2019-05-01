import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

import database from '../../../database';

import './History.css';
export default class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            history: []
        };
        this.modalOn = this.modalOn.bind(this);
        this.modalOff = this.modalOff.bind(this);
        this.clearData = this.clearData.bind(this);
    }

    modalOn() {
        const fetchHistory = database.history.toArray(item => item);
        fetchHistory.then(data => this.setState({history: data.reverse()}));
        return this.setState({show: true});
    }

    modalOff() {
        return this.setState({show: false, history: []});
    }

    clearData() {
        const confirmation = window.confirm("You're about to clear the history. Are you sure?");

        if (confirmation) {
            database.history.clear();
            this.modalOff();
        }
    }

    render() {
        return (
            <div>
                <Button variant="secondary" size="sm" block onClick={this.modalOn}>View History</Button>

                <Modal centered={true} show={this.state.show} onHide={this.modalOff}>
                    <Modal.Header closeButton className="bg-dark text-white">
                        <h3>History</h3>
                    </Modal.Header>

                    <Modal.Body className="">
                        <ul reversed className="history-list text-center">
                        {this.state.history.map((data, index) => {
                            return (
                                <li className="history-item" key={index} onClick={this.props.selected}>
                                    <Badge variant="secondary">{data.val1}</Badge> {data.operation} <Badge variant="secondary">{data.val2}</Badge> = <Badge variant="info">{data.result}</Badge>
                                </li>
                            )
                        })}
                        </ul>
                    </Modal.Body>

                    <Modal.Footer className="bg-dark text-white">
                        <Button variant="danger" onClick={this.clearData}>Clear</Button>
                        <Button variant="secondary" onClick={this.modalOff}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

History.propTypes = {
    selected: PropTypes.func.isRequired
};
