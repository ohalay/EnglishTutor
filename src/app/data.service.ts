import { Injectable } from '@angular/core';

@Injectable()
export class DataService {

  constructor() { 
  }

  
  getTitle():Promise<string> {
    const name = 'test';
    return new Promise(resolve => {
       chrome.storage.sync.get([name], cb=>{
        resolve(cb[name]);
      });
    })
  }
}
