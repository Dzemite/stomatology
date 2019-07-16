import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StomComponent } from './stom.component';

describe('StomComponent', () => {
  let component: StomComponent;
  let fixture: ComponentFixture<StomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
