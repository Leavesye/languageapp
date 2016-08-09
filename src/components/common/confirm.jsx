import React, { Component } from 'react';

export default class Confirm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '你确定吗?',
            leftText: '取消',
            rightText: '确认',
            handleOkClick: function () { }
        };
    }

    componentDidMount() {
        var that = this;
        window.confirm = function (content, cb, leftText, rightText) {
            $("#confirmModal").modal("show");
            that.setState({
                content: content,
                leftText: leftText || "取消",
                rightText: rightText || "确定",
                handleOKClick: cb
            });
        }
    }


    render() {
        return (
            <div className="ui modal" id="confirmModal">
                <div className="header">提示</div>
                <div className="content">
                    <p>{this.state.content}</p>
                </div>
                <div className="actions">
                    <div className="ui cancel button">{this.state.leftText}</div>
                    <div className="ui button" onClick={this.state.handleOKClick}>{this.state.rightText}</div>
                </div>
            </div>
        );
    }
};
