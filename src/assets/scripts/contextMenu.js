function contextMenuOnClick(e) {
    const name = e.selectionText;

    getUserWord(name).then(word =>{
        if (word) {
            ++word.addAmount;
            word.lastAddedTime = Date.now();
            return word;
        } else {
            return createWord();
        }
    }).then(word => updateUserWord(name, word));
    
    getWordfromVocabilary(name).then(word => {
        if (!word) {
           getWordInfoOxfordDictionary(name)
            .then(newWord => setWordToVocabilary(name, newWord));
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

function getWordfromVocabilary(name) {
    return getChromeUserInfo().then(info => {
        const url = `${base_url}/vocabilary/${name}.json`;

        return fetch(url, {method: 'GET'})
            .then(response => response.json())
    })
}

function getUserWord(name) {
    return getChromeUserInfo().then(info => {
        const url = `${base_url}/users/${info.id}/userVocabilary/${name}.json`;

        return fetch(url, {method: 'GET'})
            .then(response => response.json())
    })
}

function setWordToVocabilary(name, word) {
    const url = `${base_url}/vocabilary/${name}.json`;
    fetch(url, {method: 'PATCH', body: JSON.stringify(word)})
}

function updateUserWord(name, word) {
   
    getChromeUserInfo().then(info => {
        const url = `${base_url}/users/${info.id}/userVocabilary/${name}.json`;
        fetch(url, {method: 'PATCH', body: JSON.stringify(word)})
    });
}

chrome.contextMenus.create({
    'title': 'Add to vocabilary',
    'contexts': ['selection'],
    'onclick' : contextMenuOnClick
});