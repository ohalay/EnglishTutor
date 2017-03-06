import { Injectable } from '@angular/core';

@Injectable()
export class SettingsService {

  private _from: string;
  private _to: string;
  private _imgCount: number;
  private _imgOrientation: string;
  private _wordAmount: number;
  private _userId: string;

  constructor() {
    this._from = 'en';
    this._to = 'uk';
    this._imgCount = 3;
    this._imgOrientation = 'horizontal';
    this._wordAmount = 5;
  }

  get fromLanguage(): string{
    return this._from;
  }

  get toLanguage(): string{
    return this._to;
  }

  get imgCount(): number {
    return this._imgCount;
  }

  get imgOrientation(): string {
    return this._imgOrientation;
  }
   get wordAmount(): number {
    return this._wordAmount;
  }
}
