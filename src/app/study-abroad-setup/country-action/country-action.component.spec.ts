import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryActionComponent } from './country-action.component';

describe('CountryActionComponent', () => {
  let component: CountryActionComponent;
  let fixture: ComponentFixture<CountryActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountryActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
