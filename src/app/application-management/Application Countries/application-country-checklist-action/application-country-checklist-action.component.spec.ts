import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationCountryChecklistActionComponent } from './application-country-checklist-action.component';

describe('ApplicationCountryChecklistActionComponent', () => {
  let component: ApplicationCountryChecklistActionComponent;
  let fixture: ComponentFixture<ApplicationCountryChecklistActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationCountryChecklistActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationCountryChecklistActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
