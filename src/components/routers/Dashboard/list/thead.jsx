import React, { Component } from 'react';

const Th = ({thName}) => (
    <th>{thName}</th>
);

export default class THead extends Component {
    constructor(props) {
        super(props);
        this.checked = false;
        this.handleCheckboxClick = this.handleCheckboxClick.bind(this);
    }

    handleCheckboxClick() {
        this.checked = !this.checked;
        this.props.selectAll(this.checked);
    }

    render() {
        return (
            <thead>
                <tr>
                    <th><input type="checkbox" onClick={this.handleCheckboxClick}/></th>
                    {this.props.theads.map((thName) => <Th key={thName} thName={thName}/>) }
                </tr>
            </thead>
        );
    }
};
