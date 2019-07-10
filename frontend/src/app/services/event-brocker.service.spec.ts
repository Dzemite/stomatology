/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EventBrokerService } from './event-brocker.service';

describe('Service: EventBrocker', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventBrokerService]
    });
  });

  it('should ...', inject([EventBrokerService], (service: EventBrokerService) => {
    expect(service).toBeTruthy();
  }));
});
