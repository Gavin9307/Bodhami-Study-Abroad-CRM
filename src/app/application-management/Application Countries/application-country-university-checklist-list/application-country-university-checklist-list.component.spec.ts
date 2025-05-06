import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationCountryUniversityChecklistListComponent } from './application-country-university-checklist-list.component';

describe('ApplicationCountryUniversityChecklistListComponent', () => {
  let component: ApplicationCountryUniversityChecklistListComponent;
  let fixture: ComponentFixture<ApplicationCountryUniversityChecklistListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationCountryUniversityChecklistListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationCountryUniversityChecklistListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
