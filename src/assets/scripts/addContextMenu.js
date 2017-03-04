function contextMenuOnClick(e) {
    getWordfromVocabilary(e.selectionText, function(word) {
        if (word) {
            ++word.addAmount;
            word.lastAddedTime = Date.now();
        } else {
            word = createWord();
        }
        setWordToVocabilary(e.selectionText, word);
    })
}

function createWord() {
    var date = Date.now();
    return {
        addAmount: 1,
        timestamp: date,
        lastAddedTime: date
    }
}

function getWordfromVocabilary(name, callback) {
    var url = 'https://eanglish-tutor.firebaseio.com/vocabilary/' 
        + name + '.json'
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            var resp = JSON.parse(xhr.responseText);
            callback(resp)
        }
    }
    xhr.send();
}

function setWordToVocabilary(name, word) {
    var url = 'https://eanglish-tutor.firebaseio.com/vocabilary/'
        + name + '.json'
    var xhr = new XMLHttpRequest();
    xhr.open("PATCH", url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            var resp = JSON.parse(xhr.responseText);
            console.log(resp)
        }
    }
    xhr.send(JSON.stringify(word));
}

chrome.contextMenus.create({
    'title': 'Add to vocabilary',
    'contexts': ['selection'],
    'onclick' : contextMenuOnClick
});