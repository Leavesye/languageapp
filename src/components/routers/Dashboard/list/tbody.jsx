import React, { Component } from 'react';
import {browserHistory} from 'react-router';

const Tr = ({lan, handleDeleteClick, handleUpdateClick,handleCopyClick,handleCheckboxClick}) => (
    <tr>
        <td>
            <input type="checkbox"  id={lan.LangID} onClick={handleCheckboxClick.bind(this,lan.LangID)} />
        </td>
        <td>{lan.Code}</td>
        <td>{lan.ContentType}</td>
        <td>{lan.Project}</td>
        <td>{lan.CNText}</td>
        <td>{lan.ENText}</td>
        <td>{lan.Desc}</td>
        <td>{lan.CreateDate}</td>
        <td>
            <div className="ui buttons">
                <div className="ui button green" onClick={handleUpdateClick.bind(this, lan) }>
                    编辑
                </div>
                <div className="ui button blue" onClick={handleCopyClick.bind(this, lan) }>
                    复制
                </div>
                <div className="ui button red" onClick={handleDeleteClick.bind(this, lan.LangID) }>
                    删除
                </div>
            </div>
        </td>
    </tr>
);

export default class TBody extends Component {
    constructor(props) {
        super(props);
        this.modal = null;
        this.delete = this.delete.bind(this);
        this.copy = this.copy.bind(this);
        this.handleCheckboxClick = this.handleCheckboxClick.bind(this);
    }

    delete(langID) {
        var that = this;
        confirm("确定要删除吗?", function () {
            $("#confirmModal").modal("hide");
            fetch('http://localhost:3001/language/del', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    langID: langID || '',
                })
            }).then(function (res) {
                return res.json();
            }).then(function (data) {
                if (data.IsSuccess) {
                    that.props.getLangList(that.props.pageIndex);
                } else {
                    alert(data.Message);
                }

            }).catch(function (err) {
                alert(err.message);
            })
        });
    }

    update(lang) {
        browserHistory.push(`/dashboard/modify/${lang.LangID}`);
        localStorage.setItem('currentLang', JSON.stringify(lang));
    }

    copy(lang) {
        var that = this;
        fetch('http://localhost:3001/language/copy', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                code: lang.Code || '',
                contentType: lang.ContentType || '',
                project: lang.Project || '',
                cnText: lang.CNText || '',
                enText: lang.ENText || '',
                desc: lang.Desc || '',
            })
        }).then(function (res) {
            return res.json();
        }).then(function (data) {
            if (data.IsSuccess) {
                that.props.getLangList(that.props.pageIndex);
            } else { 
                alert(data.Message);
            }
        }).catch(function (err) {
            alert(err.message)
        })

    }

    handleCheckboxClick(langID) {
        if ($('#' + langID).prop('checked')) {
            $('#' + langID).prop('checked', true);
            this.props.selectOne(langID, true);
        } else { 
            $('#' + langID).prop('checked', false);
            this.props.selectOne(langID, false);
        }
    }

    render() {
        return (
            <tbody>
                {this.props.lans.map((lan) => <Tr key={lan.LangID} lan={lan} handleDeleteClick={this.delete} handleUpdateClick={this.update} handleCopyClick={this.copy} pageIndex={this.props.pageIndex} handleCheckboxClick = {this.handleCheckboxClick}/>) }
            </tbody>
        );
    }
};
