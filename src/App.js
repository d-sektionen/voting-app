import React, {Component} from 'react';
import './App.css';
import Token from "./api/Token";
import RootComponent from "./components/RootComponent";
import LoadingComponent from "./components/LoadingComponent";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ready: false
        };
    }

    componentDidMount() {
        this.setState({ready: Token.acquire() !== null});
    }

    render() {
        if (this.state.ready) {
            return (
                <RootComponent/>
            )
        } else {
            return (
                <LoadingComponent/>
            );
        }
    }
}

export default App;
