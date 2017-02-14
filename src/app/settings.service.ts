import { Injectable } from '@angular/core';

@Injectable()
export class SettingsService {

  private _from: string;
  private _to: string;
  private _getImgCount: number;

  constructor() {
    this._from = 'en';
    this._to = 'uk';
    this._getImgCount = 5;
  }

  get fromLanguage(): string{
    return this._from;
  }

  get toLanguage(): string{
    return this._to;
  }

  get getImgCount(): number {
    return this._getImgCount;
  }
}
