/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SearchImageService } from './search-image.service';

describe('SearchImageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchImageService]
    });
  });

  it('should ...', inject([SearchImageService], (service: SearchImageService) => {
    expect(service).toBeTruthy();
  }));
});
