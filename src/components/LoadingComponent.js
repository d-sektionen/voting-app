import React, {Component} from 'react';
import CenteredLayout from "./CenteredLayout";

class LoadingComponent extends Component {
    render() {
        return (
            <CenteredLayout xs={6} md={3} extra="text-center">
                <h3 className="mt-5">Laddar...</h3>
                <div className="progress">
                    <div className="progress-bar progress-bar-striped progress-bar-animated w-100"
                         role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"/>
                </div>
            </CenteredLayout>
        )
    }
}

export default LoadingComponent;