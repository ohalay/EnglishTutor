
import { Injectable } from '@angular/core';


@Injectable()
export class DataService {

  constructor() {
  }

  getLastWord(): Promise<string> {
    const name = 'lastWord';
    return new Promise(resolve => {
       if(chrome.storage)
        chrome.storage.sync.get([name], cb => {
          resolve(cb[name]);
        });
      else
        resolve('smile'); // for test localy
    });
  }
}
