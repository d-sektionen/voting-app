import React, {Component} from 'react';

class WelcomeComponent extends Component {
    render() {
        var name;
        if (this.props.user.first_name !== '') {
            name = this.props.user.first_name + ' ' + this.props.user.last_name;
        } else {
            name = this.props.user.username;
        }

        return (
            <div className="text-center">
                <span>Inloggad som</span>
                <p><b>{name}</b></p>
            </div>
        );
    }
}

export default WelcomeComponent;