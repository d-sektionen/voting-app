import React, {Component} from 'react';
import WelcomeComponent from "./WelcomeComponent";
import ActiveVoteComponent from "./ActiveVoteContainer";
import Endpoint from "../api/Endpoint";
import LoadingComponent from "./LoadingComponent";
import Token from "../api/Token";
import CenteredLayout from "./CenteredLayout";

class RootComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
            readyCount: 0,
            message: null,
            displayReloadCloseText: false
        };

        this.showMessage = this.showMessage.bind(this);
        this.closeMessage = this.closeMessage.bind(this);
        this.onRequestFailed = this.onRequestFailed.bind(this);
    }

    componentDidMount() {
        Endpoint.get('/account/user/me')
            .then(function (json) {
                this.setState({
                    user: json,
                    readyCount: this.state.readyCount + 1
                });
            }.bind(this))
            .catch(this.onRequestFailed);

        Endpoint.get('/voting/votes')
            .then(function (json) {
                this.setState({
                    votes: json,
                    readyCount: this.state.readyCount + 1
                });
            }.bind(this))
            .catch(this.onRequestFailed);
    }

    showMessage(title, content, displayReloadCloseText) {
        this.setState({
            displayReloadCloseText: displayReloadCloseText,
            message: {
                title: title,
                content: content
            }
        });
    }

    closeMessage() {
        this.setState({
            message: null,
            readyCount: 0
        });
        this.componentDidMount();
    }

    onRequestFailed() {
        Token.reset();
        this.showMessage('Utloggad', 'Du har blivit utloggad.', true);
    }

    render() {
        if (this.state.message !== null) {
            let buttonText = this.state.displayReloadCloseText ? 'Ladda om sidan' : 'Stäng';

            return (
                <CenteredLayout>
                    <h3 className="mt-5">{this.state.message.title}</h3>
                    <p>{this.state.message.content}</p>

                    <button type="button" className="btn btn-secondary btn-lg btn-block" onClick={this.closeMessage}>
                        {buttonText}
                    </button>
                </CenteredLayout>
            )
        } else if (this.state.readyCount === 2) {
            return (
                <CenteredLayout>
                    <h1 className="text-center">D-cide</h1>
                    <WelcomeComponent user={this.state.user}/>
                    <ActiveVoteComponent votes={this.state.votes} onMessage={this.showMessage}/>
                </CenteredLayout>
            )
        } else {
            return <LoadingComponent/>
        }

    }
}

export default RootComponent;
