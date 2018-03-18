import React, {Component} from 'react';

class CenteredLayout extends Component {
    render() {
        let xs = this.props.xs || 12;
        let sm = this.props.sm || 8;
        let md = this.props.md || 4;
        let extra = this.props.extra || '';

        let className = `col-${xs} col-sm-${sm} col-md-${md} ${extra}`;

        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className={className}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}

export default CenteredLayout;