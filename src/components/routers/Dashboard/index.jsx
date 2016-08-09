import React,{Component} from 'react';
import Top from './common/top.jsx';


export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        
    }
    
    render() {
        return (
            <div>
                <Top />
                {this.props.children}
            </div>
        );
    }
};
