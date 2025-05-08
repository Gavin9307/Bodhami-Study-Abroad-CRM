import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationViewCountryActionComponent } from './application-view-country-action.component';

describe('ApplicationViewCountryActionComponent', () => {
  let component: ApplicationViewCountryActionComponent;
  let fixture: ComponentFixture<ApplicationViewCountryActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationViewCountryActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationViewCountryActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
