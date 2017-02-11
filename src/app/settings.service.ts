import { Injectable } from '@angular/core';

@Injectable()
export class SettingsService {

  private _from: string;
  private _to: string;
  constructor() {
    this._from = 'en';
    this._to = 'uk';
  }

  get fromLanguage(): string{
    return this._from;
  }

  get toLanguage(): string{
    return this._to;
  }

}
