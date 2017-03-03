import { TestBed, inject } from '@angular/core/testing';

import { OxfordDictionaryService } from '../services/oxford-dictionary.service';

describe('OxfordDictionaryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OxfordDictionaryService]
    });
  });

  it('should ...', inject([OxfordDictionaryService], (service: OxfordDictionaryService) => {
    expect(service).toBeTruthy();
  }));
});
