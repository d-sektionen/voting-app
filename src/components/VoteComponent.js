import React, {Component} from 'react';
import Alternative from "./Alternative";
import Endpoint from "../api/Endpoint";

class VoteComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            checkedId: -1
        };

        this.onAlternativeChecked = this.onAlternativeChecked.bind(this);
        this.placeVote = this.placeVote.bind(this);
        this.showMessage = this.props.onMessage;
    }

    onAlternativeChecked(alternativeId) {
        this.setState({
            checkedId: alternativeId
        });
    }

    placeVote() {
        let showMessage = this.showMessage;
        let voteData = {
            vote_id: this.props.vote.id,
            alternative_id: this.state.checkedId
        };

        Endpoint.post('/voting/made_votes/', voteData)
            .then(function (json) {
                showMessage('Tack!', 'Din röst har registrerats');
            })
            .catch(function (error) {
                showMessage('Ett fel uppstod', error);
            });
    }

    render() {
        let alternatives = this.props.vote.alternatives.map(function (alternative) {
            return (
                <Alternative key={alternative.id} alternative={alternative} onChecked={this.onAlternativeChecked}/>
            );
        }.bind(this));

        let votingDisabled = this.state.checkedId === -1;
        let buttonText = votingDisabled ? 'Välj ett alternativ' : 'Rösta';

        return (
            <div>
                <b>{this.props.vote.question}</b>
                <ul>
                    {alternatives}
                </ul>
                <button type="button"
                        className="btn btn-primary btn-lg btn-block"
                        disabled={votingDisabled}
                        onClick={this.placeVote}>
                    {buttonText}
                </button>
            </div>
        )
    }
}

export default VoteComponent;