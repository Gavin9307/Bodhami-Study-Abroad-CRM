import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationCountryUniversityChecklistDocumentListComponent } from './application-country-university-checklist-document-list.component';

describe('ApplicationCountryUniversityChecklistDocumentListComponent', () => {
  let component: ApplicationCountryUniversityChecklistDocumentListComponent;
  let fixture: ComponentFixture<ApplicationCountryUniversityChecklistDocumentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationCountryUniversityChecklistDocumentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationCountryUniversityChecklistDocumentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
