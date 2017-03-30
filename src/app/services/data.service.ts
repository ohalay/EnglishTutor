
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, RequestOptionsArgs, Response } from '@angular/http';
import { SettingsService } from './settings.service';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class DataService {

  private static BASE_URL = 'http://35.187.74.122/api/v1';

  constructor(private http: Http, private settings: SettingsService) {
  }

  getLastWords(limitTo = 5): Promise<Word[]> {
    return this.sendGetRequest(`vocabulary/${this.settings.toLanguage}/words?limitTo=${limitTo}`)
      .catch(error => {
        console.log('get user vocabulary', error);
      });
  }

  translateWord(word): Promise<string> {
    return this.sendGetRequest(`vocabulary/${this.settings.toLanguage}/word/${word}/translate`)
      .then(s => s.translation)
      .catch(error => {
        console.log('get user vocabulary', error);
      });
  }

  private sendGetRequest(url) {
    const getOption = token => new RequestOptions({
      headers: new Headers({
        'Authorization': `Bearer ${token}`
      })
    });

    return this.getAuthToken()
      .then(token => this.http.get(`${DataService.BASE_URL}/${url}`, getOption(token)).toPromise())
      .then(res => (<Response>res).json());
  }

  private getAuthToken() {
      return new Promise((resolve, reject) => {
          chrome.identity.getAuthToken({ 'interactive': true }, resolve);
      });
  }
}

