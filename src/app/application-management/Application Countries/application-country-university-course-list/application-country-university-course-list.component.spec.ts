import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationCountryUniversityCourseListComponent } from './application-country-university-course-list.component';

describe('ApplicationCountryUniversityCourseListComponent', () => {
  let component: ApplicationCountryUniversityCourseListComponent;
  let fixture: ComponentFixture<ApplicationCountryUniversityCourseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationCountryUniversityCourseListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationCountryUniversityCourseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
