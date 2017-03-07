
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { SettingsService } from './settings.service';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class DataService {

  private static BASE_URL = 'https://eanglish-tutor.firebaseio.com';

  constructor(private http: Http, private settings: SettingsService) {
  }

  private toWords(data: any): WordStatistic[] {
    return Object.getOwnPropertyNames(data).map(name =>
      Object.assign({name}, data[name]));
  }

  getLastUserWords(limitTo = 5): Promise<WordStatistic[]> {
    return this.getUserInfo().then(id => {
      return this.http.get(`${DataService.BASE_URL}/users/${id}/userVocabilary.json?orderBy="timestamp"&limitToFirst=${limitTo}`)
      .toPromise().then(responce => this.toWords(responce.json()))
      .catch(error => {
        console.log('getVocabilary', error);
      });
    });
  }

  getVocabilaryWordInfo(words: string[]): Promise<WordInfo[]> {
    const requests = words.map(name => {
        return this.http.get(`${DataService.BASE_URL}/vocabilary/${name}.json`)
          .map(res => <WordInfo>Object.assign({name}, res.json()));
    });
    return Observable.forkJoin(requests)
      .toPromise();
  }

  updateWord(word: Word) {
    this.updateWordInfo(word);
    this.updateUserWordStatistic(word);
  }

  updateWordInfo(word: WordInfo) {
    return this.http.patch(`${DataService.BASE_URL}/vocabilary/${word.name}.json`, {translation: word.translation} )
      .toPromise()
      .then(responce => responce.json())
      .catch(error => {
        console.log('getVocabilary', error);
      });
  }

  updateUserWordStatistic(word: WordStatistic) {
     return this.getUserInfo().then(id => {
      return this.http.patch(`${DataService.BASE_URL}/users/${id}/userVocabilary/${word.name}.json?`,
        {
            translateAmount: word.translateAmount,
            lastTranslated: word.lastTranslated
        })
      .toPromise().then(responce => responce.json())
      .catch(error => {
        console.log('getVocabilary', error);
      });
    });
  }

  private getUserInfo(): Promise<string> {
   return new Promise<string>((resolve, reject) => {
        chrome.identity.getProfileUserInfo(info => {
            resolve(info.id);
        });
    });
  }
}

