import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, RequestOptionsArgs } from '@angular/http';
import { SettingsService } from './settings.service';

import { Observable } from 'rxjs/Observable';


@Injectable()
export class OxfordDictionaryService {

  private static BASE_URL = 'https://od-api.oxforddictionaries.com/api/v1';
  private static APP_ID = 'bcfbff17';
  private static APP_KEY = '46c10915b36aac7704fd6ec072fc64d0';

  constructor(private http: Http, private settings: SettingsService) { }

  getEntry(wordName: string): Observable<ODEntry> {
    return this.http.get(`${OxfordDictionaryService.BASE_URL}/entries/${this.settings.fromLanguage}/${wordName}/regions=us`,
     this.getRequestOptions())
      .map(responce => this.createEntry(responce.json()))
      .catch(error => {
        console.log('getEntry', error);
        return error;
      });
  }

  private createEntry(data: any): ODEntry {
    const odEntity = <ODEntry>{};

    const lexicalEntry = data.results[0].lexicalEntries[0];

    odEntity.name = lexicalEntry.text;
    odEntity.phoneticSpelling = lexicalEntry.pronunciations[0].phoneticSpelling;
    odEntity.audioFilePath = lexicalEntry.pronunciations[0].audioFile;

    const sense = lexicalEntry.entries[0].senses[0];

    odEntity.defination = sense.definitions[0];
    odEntity.examples = sense.examples.map(s => s.text);

    return odEntity;
  }

  private getRequestOptions(): RequestOptions {

    const apiHeaders = new Headers({
      'Accept': 'application/json',
      'app_id': OxfordDictionaryService.APP_ID,
      'app_key': OxfordDictionaryService.APP_KEY});

    return new RequestOptions({ headers: apiHeaders});
  }

}
