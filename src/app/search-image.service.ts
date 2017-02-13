import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { SettingsService } from './settings.service';

@Injectable()
export class SearchImageService {

  private static API_KEY = '4543341-045e311e13e2afed65191e200';
  private static BASE_URL = 'https://pixabay.com/';

  constructor(private http: Http, private settings: SettingsService) { }

  getImage(text:string): any {
    const params = `q=${text}&key=${SearchImageService.API_KEY}&lang=${this.settings.fromLanguage}&per_page=${this.settings.getImgCount}`;

    return this.http.get(`${SearchImageService.BASE_URL}api/?${params}`)
      .map(responce => responce.json())
      .catch(error => {
        console.log("getImage", error);
        return error;
      });
  }

}
