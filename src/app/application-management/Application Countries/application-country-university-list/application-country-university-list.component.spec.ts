import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationCountryUniversityListComponent } from './application-country-university-list.component';

describe('ApplicationCountryUniversityListComponent', () => {
  let component: ApplicationCountryUniversityListComponent;
  let fixture: ComponentFixture<ApplicationCountryUniversityListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationCountryUniversityListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationCountryUniversityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
