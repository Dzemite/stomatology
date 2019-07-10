import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnkoComponent } from './onko.component';

describe('onkoComponent', () => {
  let component: OnkoComponent;
  let fixture: ComponentFixture<OnkoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnkoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnkoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
