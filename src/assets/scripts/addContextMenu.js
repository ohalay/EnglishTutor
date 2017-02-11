function translateOnClick(e){
    chrome.storage.sync.set({'lastWord' : e.selectionText})
}

chrome.contextMenus.create({
    'title': 'Translate',
    'contexts': ['selection'],
    'onclick' : translateOnClick
});