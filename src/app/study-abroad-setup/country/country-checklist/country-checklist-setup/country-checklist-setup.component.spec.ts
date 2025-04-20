import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryChecklistSetupComponent } from './country-checklist-setup.component';

describe('CountryChecklistSetupComponent', () => {
  let component: CountryChecklistSetupComponent;
  let fixture: ComponentFixture<CountryChecklistSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountryChecklistSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryChecklistSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
