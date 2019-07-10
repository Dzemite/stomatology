/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { KpiService } from './kpi.service';

describe('Service: Kpi', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KpiService]
    });
  });

  it('should ...', inject([KpiService], (service: KpiService) => {
    expect(service).toBeTruthy();
  }));
});
