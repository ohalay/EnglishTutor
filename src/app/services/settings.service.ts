import { Injectable } from '@angular/core';

@Injectable()
export class SettingsService {

  private _from: string;
  private _to: string;
  private _imgCount: number;
  private _imgOrientation: string;

  constructor() {
    this._from = 'en';
    this._to = 'uk';
    this._imgCount = 3;
    this._imgOrientation = 'horizontal';
  }

  get fromLanguage(): string{
    return this._from;
  }

  get toLanguage(): string{
    return this._to;
  }

  get getImgCount(): number {
    return this._imgCount;
  }

  get getImgOrientation(): string {
    return this._imgOrientation;
  }
}
