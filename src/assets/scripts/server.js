class Server {
    constructor() {
        this.BASE_URL = 'http://35.187.74.122/api/v1';
    }

    getLanguages() {
        return this._sendRequest('information/languages');
    }

    createUser(languageCode) {
        const createUserBody = userInfo => {
            return {
                email: userInfo.email,
                    settings : {
                        imageCount: 3,
                        languageCode
                    }
            }
        }
        return this._getChromeUserInfo()
            .then(createUserBody)
            .then(body => this._sendRequest('user', 'POST', body));
    }

    getSettings() {
        return this._sendRequest('user/settings');
    }

    addWord(languageCode, word) {
        return this._sendRequest(`vocabulary/${languageCode}/word/${word}`
            , 'POST');
    }

    translateWord(languageCode, word) {
        return this._sendRequest(`vocabulary/${languageCode}/word/${word}/translate`);
    }

    getLastWord(languageCode, limitTo) {
        return this._sendRequest(`vocabulary/${languageCode}/words?limitTo=${limitTo}`);
    }

    _createServerRequest(url, method, body) {
        return this._getAuthToken()
            .then(token => new Request(`${this.BASE_URL}/${url}`, {
                    method,
                    body: body ? JSON.stringify(body) : null,
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            );
    }

    _sendRequest(url, method = 'GET', body = null) {
        const getToken = headers => {
            const splitValues = headers.get('Authorization').split(' ');
            return splitValues[1];
        };
        const requestFunc = (retry, token) => this._createServerRequest(url, method, body)
            .then(request => fetch(request))
            .then(response => {
                if (response.status === 401 && retry) {
                    chrome.identity.removeCachedAuthToken({token : getToken(request.headers)})
                    return requestFunc(false)
                }
                return response.json();
            }).catch(error => console.log(`server error `, error));

        return requestFunc(true);
    }

    _getChromeUserInfo() {
        return new Promise((resolve, reject) => {
            chrome.identity.getProfileUserInfo(resolve)
        });
    }

    _getAuthToken() {
        return new Promise((resolve, reject) => {
            chrome.identity.getAuthToken({ 'interactive': true }, resolve);
        });
    }
}