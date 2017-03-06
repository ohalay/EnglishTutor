
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

  private toWords(data: any): any {
    return Object.getOwnPropertyNames(data).map(s => {
      const word = data[s];
      word.name = s;
      return word;
    });
  }

  getLastUserWords(limitTo = 5): Promise<any> {
    return this.getUserInfo().then(id => {
      return this.http.get(`${DataService.BASE_URL}/users/${id}/userVocabilary.json?orderBy="timestamp"&limitToFirst=${limitTo}`)
      .toPromise().then(responce => this.toWords(responce.json()))
      .catch(error => {
        console.log('getVocabilary', error);
        return error;
      });
    });
  }

  getVocabilaryWordInfo(words: string[]) {
    const requests = words.map(name => {
        return this.http.get(`${DataService.BASE_URL}/vocabilary/${name}.json`)
          .map(res => Object.assign({name}, res.json()));
    });
    return Observable.forkJoin(requests)
      .toPromise();
  }

  updateWord(word: Word) {
    this.updateWordInfo(word);
    this.updateUserWordStatistic(word);
  }

  updateWordInfo(word: WordInfo) {
    return this.http.put(`${DataService.BASE_URL}/vocabilary/${word.name}.json`, {translation: word.translation} )
      .map(responce => responce.json())
      .catch(error => {
        return error;
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
        return error;
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

