const defaultSettings = {
    languageCode : 'uk',
    imageCount : 3
}

function onInstalled(details) {
    if (details.reason == 'install') {
        // todo implement for not signed user
        setUserInfo();
    }
}

function setUserInfo() {
    getChromeUserInfo().then(info => {
        getUserInfo(info.id).then( userInfo => {
            if(userInfo) return;
            const url = `https://eanglish-tutor.firebaseio.com/users/${info.id}.json`;
            const body = {
                email: info.email,
                settings: defaultSettings,
                statistics: ''
            };
            fetch(url, {method: 'PATCH', body: JSON.stringify(body)})
        });
    });
}

function getUserInfo(id) {
    const url = `https://eanglish-tutor.firebaseio.com/users/${id}.json`;

    return fetch(url, {method: 'GET'})
        .then(response => response.json());
}


function getChromeUserInfo() {
   return new Promise((resolve, reject) => {
        chrome.identity.getProfileUserInfo(info => {
            resolve(info);
        });
    });
}

function onSignInChanged(account, signedIn) {
    if(signedIn) {
        // todo implement user changed
        setUserInfo();
    }
}

function getAuthToken(){
    return new Promise((resolve, reject) => {
       chrome.identity.getAuthToken({ 'interactive': true }, token => {
            resolve(token);
        });
    });
}

chrome.runtime.onInstalled.addListener(onInstalled);

chrome.identity.onSignInChanged.addListener(onSignInChanged);