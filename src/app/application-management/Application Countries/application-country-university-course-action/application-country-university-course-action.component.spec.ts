import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationCountryUniversityCourseActionComponent } from './application-country-university-course-action.component';

describe('ApplicationCountryUniversityCourseActionComponent', () => {
  let component: ApplicationCountryUniversityCourseActionComponent;
  let fixture: ComponentFixture<ApplicationCountryUniversityCourseActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationCountryUniversityCourseActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationCountryUniversityCourseActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
