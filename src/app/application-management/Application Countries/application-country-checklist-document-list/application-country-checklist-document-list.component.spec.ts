import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationCountryChecklistDocumentListComponent } from './application-country-checklist-document-list.component';

describe('ApplicationCountryChecklistDocumentListComponent', () => {
  let component: ApplicationCountryChecklistDocumentListComponent;
  let fixture: ComponentFixture<ApplicationCountryChecklistDocumentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationCountryChecklistDocumentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationCountryChecklistDocumentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
