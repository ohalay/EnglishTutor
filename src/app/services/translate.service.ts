import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { SettingsService } from './settings.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TranslateService {

  private static BASE_URL = 'http://www.transltr.org/';

  constructor(private http: Http, private settings: SettingsService) { }

  translate(text: string): Promise<string> {
    const params = `text=${text}&from=${this.settings.fromLanguage}&to=${this.settings.toLanguage}`;

    return this.http.get(`${TranslateService.BASE_URL}api/translate?${params}`).toPromise()
      .then(responce => responce.json().translationText)
      .catch(error => console.log('translate', error));
  }
}
