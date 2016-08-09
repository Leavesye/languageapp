import React, {Component} from 'react';
import Alert from './common/alert.jsx';
import Confirm from './common/confirm.jsx';

export default class App extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                {this.props.children}
                <Alert />
                <Confirm />
            </div>
        );
    }
}