import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationCountryUniversityActionComponent } from './application-country-university-action.component';

describe('ApplicationCountryUniversityActionComponent', () => {
  let component: ApplicationCountryUniversityActionComponent;
  let fixture: ComponentFixture<ApplicationCountryUniversityActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationCountryUniversityActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationCountryUniversityActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
