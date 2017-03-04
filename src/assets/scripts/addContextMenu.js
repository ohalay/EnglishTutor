function contextMenuOnClick(e) {
    const name = e.selectionText;

    getWordfromVocabilary(name).then(word => {
        if (word) {
            ++word.addAmount;
            word.lastAddedTime = Date.now();
            return word;
        } else {
            return createWord(name);
        }
    }).then(word => setWordToVocabilary(name, word))
}
function createWord(wordName) {
    return getWordInfoOxfordDictionary(wordName)
        .then(word => {
            const date = Date.now();
            word.addAmount = 1;
            word.timestamp = date;
            word.lastAddedTime = date;

            return word;
        })
}

function getWordInfoOxfordDictionary(wordName) {
    
    const lang = 'en';
    const url = `https://od-api.oxforddictionaries.com/api/v1/entries/${lang}/${wordName}/regions=us`

    const option = {
        method: 'GET',
        headers: {
            app_id: 'bcfbff17',
            app_key: '46c10915b36aac7704fd6ec072fc64d0'
        }
    }

    return fetch(url, option)
        .then(response => response.json())
        .then(res => mapToVocabilaryFormat(res));
}

function mapToVocabilaryFormat(data) {
    let odEntity = {};

    const lexicalEntry = data.results[0].lexicalEntries[0];

    odEntity.name = lexicalEntry.text;

    const pronunciaton = lexicalEntry.pronunciations.filter(s => s.audioFile)[0]
    if (pronunciaton) {
        odEntity.phoneticSpelling = pronunciaton.phoneticSpelling;
        odEntity.audioFilePath = pronunciaton.audioFile;
    }

    const sense = lexicalEntry.entries[0].senses[0];

    odEntity.defination = sense.definitions[0];
    if (sense.examples)
        odEntity.examples = sense.examples.map(s => s.text);

    return odEntity;
}

function getWordfromVocabilary(name, callback) {
    const url = `https://eanglish-tutor.firebaseio.com/vocabilary/${name}.json`;

    return fetch(url, {method: 'GET'})
        .then(response => response.json())
}

function setWordToVocabilary(name, word) {
    const url = `https://eanglish-tutor.firebaseio.com/vocabilary/${name}.json`;

    return fetch(url, {method: 'PATCH', body: JSON.stringify(word)})
}

chrome.contextMenus.create({
    'title': 'Add to vocabilary',
    'contexts': ['selection'],
    'onclick' : contextMenuOnClick
});