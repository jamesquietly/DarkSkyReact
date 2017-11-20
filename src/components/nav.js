import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navigation extends Component {
    render() {
        return (
            <div className="Nav">
                <Link className="btn btn-primary" to="/">Weather</Link>
                <Link className="btn btn-primary" to="/history">History</Link>
            </div>
        );
    }
}

export default Navigation;