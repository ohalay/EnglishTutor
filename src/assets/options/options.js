const base_url = 'https://eanglish-tutor.firebaseio.com';
const transltr_url = `http://www.transltr.org/api/getlanguagesfortranslate`;

document.addEventListener('DOMContentLoaded', initOptionsContent);

function updateSettings() {
    var newSettings = {};
    newSettings.languageCode = document.getElementById('native-language').value;
    newSettings.imageCount = document.getElementById('image-count').value;

    getChromeUserInfo().then(info => {
        const url = `https://eanglish-tutor.firebaseio.com/users/${info.id}/settings.json`;
        fetch(url, {method: 'PATCH', body: JSON.stringify(newSettings)})
    });
}

function initSettings() {
    getChromeUserInfo().then(info => {
        getUserInfo(info.id).then( userInfo => {
            if(userInfo) {
                var languageSelect = document.getElementById('native-language');
                languageSelect.value = userInfo.settings.languageCode;
                var imageSelect = document.getElementById('image-count');
                imageSelect.value = userInfo.settings.imageCount;
            }
        });
    });
}

function initOptionsContent() {
    var languageSelect = document.getElementById('native-language');
    getAvailableLanguages().then(response => {
        for (var val of response) {
            var option = document.createElement('option');
            option.value = val.languageCode;
            option.text = val.languageName;
            languageSelect.appendChild(option);
        }
        document.getElementById('accept-changes').onclick =  updateSettings;
        initSettings();
    });
}

function getAvailableLanguages() {
    return fetch(transltr_url, {method: 'GET'})
        .then(response => response.json());
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