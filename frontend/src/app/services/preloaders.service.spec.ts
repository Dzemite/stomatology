/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PreloadersService } from './preloaders.service';

describe('Service: Preloaders', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PreloadersService]
    });
  });

  it('should ...', inject([PreloadersService], (service: PreloadersService) => {
    expect(service).toBeTruthy();
  }));
});
