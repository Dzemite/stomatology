/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PatientsListComponent } from './patients-list.component';

describe('PatientsListComponent', () => {
  let component: PatientsListComponent;
  let fixture: ComponentFixture<PatientsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
