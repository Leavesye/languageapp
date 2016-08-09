import React, {Component} from 'react';
import styles from '../../../css/login.css';
import esPromise from 'es6-promise';
import fetch from 'isomorphic-fetch';
import {browserHistory} from 'react-router';
import cookie from 'react-cookie';

esPromise.polyfill();

export default class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
    }

    login() {
        fetch('http://localhost:3001/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                uName: this.refs.uNameInput.value || '',
                pwd: this.refs.pwdInput.value || '',
            })
        }).then(function (res) {
            return res.json();
        }).then(function (data) {
            if (data.IsSuccess) {
                cookie.save('session', data.Session, { path: '/' });
                browserHistory.push('/');
            } else {
                alert(data.Message)
            }
        }).catch(function (error) {
            alert(error.message);
        })
    }

    render() {
        return (
            <div className="ui middle aligned center aligned grid">
                <div className="column">
                    <h2 className="ui teal image header">
                        <img src="assets/images/logo.png" className="image"></img>
                        <div className="content">
                            Log-in to your account
                        </div>
                    </h2>
                    <form className="ui large form">
                        <div className="ui stacked segment">
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="user icon"></i>
                                    <input type="text" name="email" placeholder="E-mail address" ref="uNameInput"/>
                                </div>
                            </div>
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="lock icon"></i>
                                    <input type="password" name="password" placeholder="Password" ref="pwdInput" />
                                </div>
                            </div>
                            <div className="ui fluid large teal submit button" onClick={this.login}>Login</div>
                        </div>
                        <div className="ui error message"></div>
                    </form>

                    <div className="ui message">
                        New to us?<a href="#">Sign Up</a>
                    </div>
                </div>
            </div>
        );
    }
};
