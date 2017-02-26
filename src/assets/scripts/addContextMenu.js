
var config = {
    apiKey: "AIzaSyCVuhcVbj1EfrB3iP6I9LQGce8Wzlk-k8U",
    authDomain: "eanglish-tutor.firebaseapp.com",
    databaseURL: "https://eanglish-tutor.firebaseio.com",
    storageBucket: "eanglish-tutor.appspot.com",
    messagingSenderId: "456223131583"
};
firebase.initializeApp(config);

function translateOnClick(e){
    var ref = firebase.database().ref('vocabilary');
    ref.child(e.selectionText).set(e.selectionText);

    chrome.storage.sync.set({'lastWord' : e.selectionText})
}

chrome.contextMenus.create({
    'title': 'Add to vocabilary',
    'contexts': ['selection'],
    'onclick' : translateOnClick
});