/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CreatePatientComponent } from './create-patient.component';

describe('CreatePatientComponent', () => {
  let component: CreatePatientComponent;
  let fixture: ComponentFixture<CreatePatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
