import React, { Component } from 'react';

export default class Alert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content:'你确定吗?'
        };
    }

    componentDidMount() { 
        var that = this;
        window.alert = function (content) {
            $("#alertModal").modal("show");
            that.setState({
                content:content
            });
        }
    }

    render() {
        return (
            <div className="ui modal" id="alertModdal">
                <div className="header">提示</div>
                <div className="content">
                    <p>{this.state.content}</p>
                </div>
                <div className="actions">
                    <div className="ui cancel button">关闭</div>
                </div>
            </div>
        );
    }
};
