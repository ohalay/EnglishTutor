function onInstalled(details) {
    if (details.reason == 'install') {
        // todo implement for not signed user
        const server = new Server();
        server.createUser('uk');
    }
}

function onSignInChanged(account, signedIn) {
    if (signedIn) {
        // todo new double check user changed
        const server = new Server();
        server.createUser('uk');
    }
}

function contextMenuOnClick(e) {
    const wordName = e.selectionText;

    const server = new Server();
    server.addWord('uk', wordName);
}

chrome.contextMenus.create({
    'title': 'Add to vocabulary',
    'contexts': ['selection'],
    'onclick' : contextMenuOnClick
});

chrome.runtime.onInstalled.addListener(onInstalled);

chrome.identity.onSignInChanged.addListener(onSignInChanged);