import React, {Component} from 'react';

export default class PaperTransparent extends Component {
    render() {
        return (
            <div className="paperTransparent">
                 { this.props.children }
            </div>
        );
    }
}
