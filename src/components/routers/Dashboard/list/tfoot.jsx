import React, { Component } from 'react';

export default class TFoot extends Component {
    constructor(props) {
        super(props);
    }

    prePage(index) {
        if (index < 0) {
            return;
        }
        this.props.getLangList(index);

    }

    nextPage(index) {
        if (index >= this.props.totalPage) {
            return;
        }
        this.props.getLangList(index);

    }

    turnPage(index) {
        this.props.getLangList(index);
    }


    render() {
        return (
            <tfoot>
                <tr>
                    <th colSpan="9">
                        <div className="ui right floated pagination menu">
                            <a className="icon item" onClick={this.prePage.bind(this, this.props.pageIndex-1) }>
                                <i className="left chevron icon"></i>
                            </a>
                            {this.props.paginations.map((page) => <a className="item" style={page.select ? { color: 'red' } : {}}key={page.index} onClick={this.turnPage.bind(this, page.index - 1) }>{page.index}</a>) }
                            <a className="icon item" onClick={this.nextPage.bind(this, this.props.pageIndex + 1) }>
                                <i className="right chevron icon"></i>
                            </a>
                        </div>
                    </th>
                </tr>
            </tfoot>
        );
    }
};
