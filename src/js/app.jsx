import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import path from 'path';
import {Router, Route, Link, browserHistory, IndexRoute, IndexRedirect} from 'react-router';
import useBasename from 'history/lib/useBasename'
import App from '../components/App.jsx';
import Dashboard from '../components/routers/Dashboard/index.jsx';
import LoginForm from '../components/routers/Login/index.jsx';
import ModifyForm from '../components/routers/dashboard/modify/index.jsx';
import LangList from '../components/routers/dashboard/list/index.jsx';


ReactDOM.render(
    <Router history={browserHistory}>
        <Route path ='/' component={App}>
            <IndexRedirect to='/dashboard' />
            <Route path='/login' component={LoginForm}/>
            <Route path='/dashboard' component={Dashboard} >
                <IndexRedirect to='/dashboard/list' />
                <Route path='/dashboard/list' component={LangList}></Route>
                <Route path='/dashboard/modify(/:langID)' component={ModifyForm} />
            </Route>         
        </Route>
    </Router>
    , document.getElementById('main'));