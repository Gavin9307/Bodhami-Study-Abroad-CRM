import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationCountryChecklistListComponent } from './application-country-checklist-list.component';

describe('ApplicationCountryChecklistListComponent', () => {
  let component: ApplicationCountryChecklistListComponent;
  let fixture: ComponentFixture<ApplicationCountryChecklistListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationCountryChecklistListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationCountryChecklistListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
