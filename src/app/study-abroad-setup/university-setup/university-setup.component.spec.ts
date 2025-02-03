import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversitySetupComponent } from './university-setup.component';

describe('UniversitySetupComponent', () => {
  let component: UniversitySetupComponent;
  let fixture: ComponentFixture<UniversitySetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniversitySetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniversitySetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
