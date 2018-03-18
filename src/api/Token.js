import Endpoint from "./Endpoint";
import Cookies from 'js-cookie';
import queryString from 'query-string';

let TOKEN_KEY = 'api-token';

class Token {
    constructor(token) {
        this.token = token;
    }

    asHeaders() {
        return new Headers({
            "Authorization": "JWT " + this.token
        });
    }

    static acquire() {
        let query = queryString.parse(window.location.search);
        let storedToken = Cookies.get(TOKEN_KEY);
        let queryToken = query.token;

        if (storedToken !== undefined) {
            return new Token(storedToken);
        } else if (queryToken !== undefined) {
            // Store the retrieved token and pop it from the url
            Cookies.set(TOKEN_KEY, queryToken);
            delete query.token;
            window.location.search = queryString.stringify(query);
        } else {
            window.location = Endpoint.build('/account/token') + '?redirect=' + window.location.href;
        }

        return null;
    }

    static reset() {
        Cookies.remove(TOKEN_KEY);
    }
}

export default Token;