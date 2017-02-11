
import { Injectable } from '@angular/core';


@Injectable()
export class DataService {

  constructor() {
  }

  getLastWord(): Promise<string> {
    const name = 'lastWord';
    return new Promise(resolve => {
       chrome.storage.sync.get([name], cb => {
        resolve(cb[name]);
      });
    });
  }
}
