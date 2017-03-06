
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

  private toWords(data: any): Word[] {
    return Object.getOwnPropertyNames(data).map(s => {
      const word = <Word>data[s];
      word.name = s;
      return word;
    });
  }

  getLastUserWords(limitTo = 5): Promise<Word[]> {
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
          .map(res => res.json());
    });
    return Observable.forkJoin(requests)
      .toPromise();
  }

  updateWord(word: Word) {
    return this.http.patch(`${DataService.BASE_URL}/vocabilary/${word.name}.json`, this.createWordDetail(word))
      .map(responce => responce.json())
      .catch(error => {
        console.log('set Word', error);
        return error;
      });
  }

  private getUserInfo(): Promise<string> {
   return new Promise<string>((resolve, reject) => {
        chrome.identity.getProfileUserInfo(info => {
            resolve(info.id);
        });
    });
}

  private createWordDetail(word: Word): any {
    const info = Object.assign({}, word);
    delete info['name'];
    return info;
  }
}

