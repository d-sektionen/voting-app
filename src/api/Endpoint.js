import Configuration from "../configuration/Configuration";
import Token from "./Token";

class Endpoint {
    static build(endpoint_url) {
        return Configuration.getConfiguration().SERVER_URL + endpoint_url;
    }

    static get(endpoint_url) {
        let token = Token.acquire();
        if (token === null) {
            return new Promise(function () {});
        }

        return this.process(
            fetch(this.build(endpoint_url), {headers: token.asHeaders()})
        );
    }

    static post(endpoint_url, data) {
        let token = Token.acquire();
        if (token === null) {
            return new Promise(function () {});
        }

        let headers = token.asHeaders();
        headers.set('Content-Type', 'application/json');

        return this.process(
            fetch(this.build(endpoint_url), {
                headers: headers,
                method: 'POST',
                body: JSON.stringify(data)
            })
        );
    }

    static process(fetchRequest) {
        return fetchRequest
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                if (json.error !== undefined) {
                    return Promise.reject(json.error);
                } else if (json.detail !== undefined) {
                    return Promise.reject('Ett oväntat fel uppstod');
                } else {
                    return json;
                }
            })
    }
}

export default Endpoint;