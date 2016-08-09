import React, {Component} from 'react';
import esPromise from 'es6-promise';
import fetch from 'isomorphic-fetch';
import {browserHistory} from  'react-router';

esPromise.polyfill();

var refs;
export default class ModifyForm extends Component {
    constructor(props) {
        super(props);
        this.modify = this.modify.bind(this);
    }

    componentDidMount() {
        var langID = this.props.params.langID || '';
        var lang = localStorage.getItem('currentLang');
        if (langID && lang) {
            lang = JSON.parse(lang);
            this.refs.codeInput.value = lang.Code;
            this.refs.typeInput.value = lang.ContentType;
            this.refs.prjSelect.value = lang.Project;
            this.refs.cnTxta.value = lang.CNText;
            this.refs.enTxta.value = lang.ENText;
            this.refs.remarkTxta.value = lang.Desc;
        }
    }

    add() {
        fetch('http://localhost:3001/language/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                code: this.refs.codeInput.value,
                contentType: this.refs.typeInput.value,
                project: this.refs.prjSelect.value,
                cnText: this.refs.cnTxta.value,
                enText: this.refs.enTxta.value,
                desc: this.refs.remarkTxta.value,
            })
        }).then(function (res) {
            return res.json();
        }).then(function (data) {
            if (data.IsSuccess) {
                browserHistory.push('/')
            } else {
                alert(data.Message);
            }
        }).catch(function (err) {
            console.log(err.message)
        })
        
    }
    update(langID) {
        fetch('http://localhost:3001/language/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                langID:langID,
                code: this.refs.codeInput.value,
                contentType: this.refs.typeInput.value,
                project: this.refs.prjSelect.value,
                cnText: this.refs.cnTxta.value,
                enText: this.refs.enTxta.value,
                desc: this.refs.remarkTxta.value,
            })
        }).then(function (res) {
            return res.json();
        }).then(function (data) {
            if (data.IsSuccess) {
                browserHistory.push('/')
            } else {
                alert(data.Message);
            }
        }).catch(function (err) {
            console.log(err.message)
        })
        
    }
    modify() {
        var langID = this.props.params.langID || '';
        if (langID) {
            this.update(langID);
        } else { 
            this.add();
        }
    }

    render() {
        return (
            <div className="ui container" style={{ marginTop: 20 }}>
                <div className="ui form">
                    <div className="field">
                        <label>引用标识</label>
                        <input type="text" placeholder="引用标识" ref="codeInput" />
                    </div>
                    <div className="field">
                        <label>文本类型</label>
                        <input type="text" placeholder="文本类型" ref="typeInput" />
                    </div>
                    <div className="field">
                        <label>所属项目</label>
                        <select name="skills" className="ui fluid search dropdown" ref="prjSelect">
                            <option value="All">All</option>
                            <option value="Common">Common</option>
                            <option value="Front">Front</option>
                            <option value="Design">Design</option>
                            <option value="Main">Main</option>
                            <option value="Login">Login</option>
                            <option value="Index">Index</option>
                        </select>
                    </div>
                    <div className="field">
                        <label>中文</label>
                        <textarea ref="cnTxta"></textarea>
                    </div>
                    <div className="field">
                        <label>英文</label>
                        <textarea ref="enTxta"></textarea>
                    </div>

                    <div className="field">
                        <label>备注</label>
                        <textarea rows="2" ref='remarkTxta'></textarea>
                    </div>
                    <div className="ui submit button primary" onClick={this.modify}>提交</div>
                </div>
            </div>
        );
    }
}