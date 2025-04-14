import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistSetupComponent } from './checklist-setup.component';

describe('ChecklistSetupComponent', () => {
  let component: ChecklistSetupComponent;
  let fixture: ComponentFixture<ChecklistSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChecklistSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecklistSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
