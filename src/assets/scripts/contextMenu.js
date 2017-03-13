function contextMenuOnClick(e) {
    const wordName = e.selectionText;
    
    getNormalizedWordForOD(wordName).then(normalizedName => {
       processUserWord(normalizedName);
       processVocabularyWord(normalizedName);
    }); 
}

function processUserWord(wordName) {
    getUserWord(wordName).then(word => {
        if (word) {
            ++word.addAmount;
            word.lastAddedTime = Date.now();
            return word;
        } else {
            return createWord();
        }
    }).then(word => updateUserWord(wordName, word));
}

function processVocabularyWord(wordName){
    getWordFromVocabulary(wordName).then(word => {
        if (!word) {
            getWordFromOD(wordName)
            .then(newWord => setWordToVocabulary(wordName, newWord));
        }
    }); 
}

function createWord() {
    const date = Date.now();

    return {
        addAmount: 1,
        timestamp: date,
        lastAddedTime: date
    }
}

function getODoption() {

    return option = {
        url: 'https://od-api.oxforddictionaries.com/api/v1',
        method: 'GET',
        headers: {
            app_id: 'bcfbff17',
            app_key: '46c10915b36aac7704fd6ec072fc64d0'
        }
    }
}

function getNormalizedWordForOD(wordName) {
    const lang = 'en';
   
    var option = getODoption();
    option.url += `/search/${lang}?q=${wordName}&prefix=false&limit=2&offset=0`

    return fetch(option.url, option)
        .then(response => response.json())
        .then(res => res.results[0].word)
        .catch(error => console.log('getNormalizedWordForOD', error));
}

function getWordFromOD(wordName) {
    
    const lang = 'en';
   
    var option = getODoption();
    option.url += `/entries/${lang}/${wordName}`

    return fetch(option.url, option)
        .then(response => response.json())
        .then(res => mapToVocabularyFormat(res))
        .catch(error => console.log('getWordFromOD', error));
}

function mapToVocabularyFormat(data) {
    let odEntity = {};

    const lexicalEntry = data.results[0].lexicalEntries[0];

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

const base_url = 'https://eanglish-tutor.firebaseio.com';

function getWordFromVocabulary(name) {
    return getChromeUserInfo().then(info => {
        const url = `${base_url}/vocabulary/${name}.json`;

        return fetch(url, {method: 'GET'})
            .then(response => response.json())
            .catch(error => console.log('getWordFromVocabulary', error));
    })
}

function getUserWord(name) {
    return getChromeUserInfo().then(info => {
        const url = `${base_url}/users/${info.id}/statistics/${name}.json`;

        return fetch(url, {method: 'GET'})
            .then(response => response.json())
            .catch(error => console.log('getUserWord', error));
    })
}

function setWordToVocabulary(name, word) {
    const url = `${base_url}/vocabulary/${name}.json`;
    fetch(url, {method: 'PATCH', body: JSON.stringify(word)})
    .catch(error => console.log('setWordToVocabulary', error));
}

function updateUserWord(name, word) {
   
    getChromeUserInfo().then(info => {
        const url = `${base_url}/users/${info.id}/statistics/${name}.json`;
        fetch(url, {method: 'PATCH', body: JSON.stringify(word)})
        .catch(error => console.log('updateUserWord', error));
    });
}

chrome.contextMenus.create({
    'title': 'Add to vocabulary',
    'contexts': ['selection'],
    'onclick' : contextMenuOnClick
});