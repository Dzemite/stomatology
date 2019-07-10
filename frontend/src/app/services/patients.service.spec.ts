/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PatientsService } from './patients.service';

describe('Service: Patients', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PatientsService]
    });
  });

  it('should ...', inject([PatientsService], (service: PatientsService) => {
    expect(service).toBeTruthy();
  }));
});
