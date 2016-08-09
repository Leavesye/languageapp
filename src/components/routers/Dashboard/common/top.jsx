import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import Service from './service.jsx';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
    }

    login() {
        browserHistory.push('/login');
    }

    signout() {

        fetch('http://localhost:3001/user/signout', {
            method: 'POST',
            credentials: 'include',
        }).then(function (res) {
            return res.json();
        }).then(function (data) {
            if (data.IsSuccess) {
                browserHistory.push('/login');
            } else {
                alert(data.Message)
            }
        }).catch(function (error) {
            alert(error.message);
        })
    }

    render() {
        return (
            <div>
                <div className="ui attached stackable menu inverted">
                    <div className="ui container">
                        <a className="item" onClick={() => {
                            browserHistory.push('/');
                        } }>
                            <i className="home icon"></i> Home
                        </a>
                        <div className="ui simple dropdown item">
                            More
                            <i className="dropdown icon"></i>
                            <div className="menu">
                                <a className="item"><i className="edit icon"></i> Add Code</a>
                                <a className="item"><i className="globe icon"></i> Choose Language</a>
                                <a className="item"><i className="settings icon"></i> Account Settings</a>
                            </div>
                        </div>
                        <div className="right item">
                            <a className="ui inverted button" onClick={this.login}>Sign in</a>
                            <a className="ui inverted button" onClick={this.signout}>Sign Out</a>
                        </div>
                    </div>
                </div>
                <div className="ui teal progress tiny" id="loading" style={{ backgroundColor: '#dadada' }}>
                    <div className="bar" style={{ backgroundColor: '#dadada' }} id="bar"></div>
                </div>
            </div>
        );
    }

}