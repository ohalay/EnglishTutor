
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()
export class DataService {

  private static BASE_URL = 'https://eanglish-tutor.firebaseio.com/vocabilary';

  constructor(private http: Http) {
  }

  private toWords(data: any): Word[] {
    return Object.getOwnPropertyNames(data).map(s => {
      const word = <Word>data[s];
      word.name = s;
      return word;
    });
  }

  getLastWords(limitTo = 5): Observable<Word[]> {
    return this.http.get(`${DataService.BASE_URL}.json?orderBy="timestamp"&limitToLast=${limitTo}`)
      .map(responce => this.toWords(responce.json()))
      .catch(error => {
        console.log(error);
        return error;
      });
  }
}
