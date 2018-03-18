import React, {Component} from 'react';

class Alternative extends Component {
    constructor(props) {
        super(props);

        this.notifyParent = this.notifyParent.bind(this);
    }

    notifyParent() {
        this.props.onChecked(this.props.alternative.id);
    }

    render() {
        let id = 'alternative-' + this.props.alternative.id;
        return (
            <div className="custom-control custom-radio">
                <input type="radio" name="alternative-radio" className="custom-control-input" id={id} checked={this.props.checked} onChange={this.notifyParent}/>
                <label className="custom-control-label" htmlFor={id}>{this.props.alternative.text}</label>
            </div>
        );
    }
}

export default Alternative;