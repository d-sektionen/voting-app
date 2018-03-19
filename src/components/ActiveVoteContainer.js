import React, {Component} from 'react';
import VoteComponent from "./VoteComponent";

class ActiveVoteContainer extends Component {
    render() {
        if (this.props.votes.length === 0) {
            return (
                <div className="card">
                    <div className="card-body text-center">
                        Det finns ingen aktiv omröstning
                    </div>
                </div>
            )
        } else {
            let shownVote = this.props.votes[0];

            if (shownVote.has_voted) {
                return (
                    <p className="text-center text-secondary">Du har redan röstat i den nuvarande omröstningen.</p>
                )
            } else {
                return (
                    <VoteComponent vote={shownVote} onMessage={this.props.onMessage}/>
                )
            }
        }
    }
}

export default ActiveVoteContainer;