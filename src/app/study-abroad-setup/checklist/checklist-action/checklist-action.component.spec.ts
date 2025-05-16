import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistActionComponent } from './checklist-action.component';

describe('ChecklistActionComponent', () => {
  let component: ChecklistActionComponent;
  let fixture: ComponentFixture<ChecklistActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChecklistActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecklistActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
