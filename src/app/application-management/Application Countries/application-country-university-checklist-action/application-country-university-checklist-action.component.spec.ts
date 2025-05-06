import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationCountryUniversityChecklistActionComponent } from './application-country-university-checklist-action.component';

describe('ApplicationCountryUniversityChecklistActionComponent', () => {
  let component: ApplicationCountryUniversityChecklistActionComponent;
  let fixture: ComponentFixture<ApplicationCountryUniversityChecklistActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationCountryUniversityChecklistActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationCountryUniversityChecklistActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
