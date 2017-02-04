function translateOnClick(e){
    chrome.storage.sync.set({'test' : e.selectionText})
}

chrome.contextMenus.create({
    'title': 'Translate',
    'contexts': ['selection'],
    'onclick' : translateOnClick
});