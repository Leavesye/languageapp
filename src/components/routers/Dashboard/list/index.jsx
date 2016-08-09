import React, {Component} from 'react';
import {Link} from 'react-router';
import esPromise from 'es6-promise';
import fetch from 'isomorphic-fetch';
import {browserHistory} from  'react-router';
import THead from './thead.jsx';
import TBody from './tbody.jsx';
import TFoot from './tfoot.jsx';
import LoadingBar from '../../../common/loading.jsx';

esPromise.polyfill();
var loadBar = new LoadingBar();
export default class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            theads: ['引用标识', '文字类型', '所属项目', '中文', '英文', '备注', '创建时间', '操作'],
            lans: [],
            paginations: [],
            size: 300,
            pageIndex: 0,
            totalPage: 0,
        };
        this.handleChange = this.handleChange.bind(this);
        this.getLangList = this.getLangList.bind(this);
        this.selectAll = this.selectAll.bind(this);
        this.selectOne = this.selectOne.bind(this);
        this.batchDelete = this.batchDelete.bind(this);
        this.timer = null;
        this.selectIDs = [];

    }

    selectAll(checked) {
        var that = this;
        if (checked) {
            this.state.lans.forEach(function (lan) {
                $("#" + lan.LangID).prop('checked', true);
                that.selectIDs.push(lan.LangID);
            })
        } else {
            this.state.lans.forEach(function (lan) {
                $("#" + lan.LangID).prop('checked', false);
                that.selectIDs.splice(that.selectIDs.indexOf(lan.LangID), 1);
            });
        }

    }

    selectOne(langID, checked) {
        if (checked) {
            this.selectIDs.push(langID);
        } else {
            this.selectIDs.splice(this.selectIDs.indexOf(langID), 1);
        }
    }

    /**
     * 绑定分页
     * @param  {Number} pageSize 页面容纳条数
     * @param  {Number} pageIndex 页码
     * @param  {Number} totalPage 总页数
     */
    getPages(pageSize, pageIndex, totalPage) {
        var start = 0;
        var end = totalPage;
        if (pageIndex - 2 > 0) {
            start = pageIndex - 2;
            if (start > totalPage - 5) {
                start = totalPage - 5;
            }
        }
        if (start < 0) {
            start = 0;
        }
        if (pageIndex + 3 < totalPage) {
            end = pageIndex + 3;
            if (end < 5) {
                end = 5;
            }
            if (end > totalPage) {
                end = totalPage;
            }
        }
        var pageList = [];
        for (var i = start; i < end; i++) {
            var trmpObj = {};
            trmpObj.select = false;
            if (i == pageIndex) {
                trmpObj.select = true;
            }
            trmpObj.index = i + 1;
            pageList.push(trmpObj);
        }
        return pageList;
    }

    /**
     * 获取多语言列表
     * @param  {Number} index 索引
     */
    getLangList(index) {
        var that = this;
        var sort = '-CreateDate';
        var queryStr = this.refs.queryInput.value;
        var size = this.state.size;
        var url = 'http://localhost:3001/language/lans?sort=' + sort + '&index=' + index + '&queryStr=' + queryStr + '&size=' + size;

        loadBar.loadingStart();
        fetch(url, {
            credentials: 'include',
            headers: {
                'code':'lll'
            },
        }).then(function (res) {
            return res.json();
        }).then(function (data,dd,ss) {
            if (data.IsSuccess) {
                that.setState({
                    lans: data.lanList,
                    paginations: that.getPages(that.state.size, index, data.PageCount),
                    pageIndex: index,
                    totalPage: data.PageCount,
                })

            } else {
                if (data.Message == 'session timeout') {
                    browserHistory.push('/login');
                }
                alert(data.Message);
            }
            loadBar.loadingEnd();
        }).catch(function (ex) {
            alert(ex.message);
            loadBar.loadingEnd();
        })
    }

    /**
     * 导出json文件
     * @param  {String} project 所属项目
     */
    export(project) {

        loadBar.loadingStart();
        fetch('http://localhost:3001/language/export', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                project: project || '',
            })
        }).then(function (res) {
            return res.json();
        }).then(function (data) {
            if (!data.IsSuccess) {
                alert(data.Message);
            }
        }).catch(function (err) {
            alert(err.message);
            loadBar.loadingEnd();
        })
    }

    /**
     * 监听输入框变化搜索数据
     */
    handleChange(event) {
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout((params) => {
            this.getLangList(0);
        }, 300);
    }

    batchDelete() {

        var that = this;
        loadBar.loadingStart();
        fetch('http://localhost:3001/language/batchDelete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                langIDs: this.selectIDs || [],
            })
        }).then(function (res) {
            return res.json();
        }).then(function (data) {
            if (data.IsSuccess) {
                that.getLangList(0);
            } else {
                alert(data.Message);
            }
            loadBar.loadingEnd();
        }).catch(function (err) {
            alert(err.message);
            loadBar.loadingEnd();
        })
    }

    componentDidMount() {
        this.getLangList(0);
    }

    render() {
        var theads = this.state.theads;
        var lans = this.state.lans;
        var paginations = this.state.paginations;

        return (
            <div className="ui container" style={{ marginTop: 20 }}>
                <div className="ui fluid icon input">
                    <input type="text" onChange={this.handleChange} placeholder="Search a very wide input..." ref='queryInput' />

                    <div className="ui button" onClick={() => {
                        browserHistory.push('/dashboard/modify');
                    } }><i className="plus icon"></i>New Code</div>
                </div>
                <div className="ui buttons" style={{ marginTop: 20 }}>
                    <div className="ui button white" onClick={this.batchDelete}>
                        批量删除
                    </div>
                    <div className="ui button white" onClick={this.export.bind(this, 'All') }>
                        全部导出
                    </div>
                    <div className="ui button blue" onClick={this.export.bind(this, 'Common') }>
                        Common
                    </div>
                    <div className="ui button yellow" onClick={this.export.bind(this, 'Front') }>
                        Front
                    </div>
                    <div className="ui button red" onClick={this.export.bind(this, 'Design') }>
                        Design
                    </div>
                    <div className="ui button green" onClick={this.export.bind(this, 'Main') }>
                        Main
                    </div>
                    <div className="ui button orange" onClick={this.export.bind(this, 'Login') }>
                        Login
                    </div>
                    <div className="ui button black" onClick={this.export.bind(this, 'Index') }>
                        Index
                    </div>
                </div>
                <table className="ui celled table">
                    <THead theads = {theads} selectAll={this.selectAll}/>
                    <TBody lans = {lans} getLangList={this.getLangList} pageIndex={this.state.pageIndex} selectOne={this.selectOne}/>
                    <TFoot paginations = {paginations} totalPage={this.state.totalPage} getLangList={this.getLangList} pageIndex={this.state.pageIndex}/>
                </table>

            </div>
        );
    }
}