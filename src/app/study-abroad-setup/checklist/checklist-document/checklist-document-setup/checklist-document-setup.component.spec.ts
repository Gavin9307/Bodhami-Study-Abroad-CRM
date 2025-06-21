import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistDocumentSetupComponent } from './checklist-document-setup.component';

describe('ChecklistDocumentSetupComponent', () => {
  let component: ChecklistDocumentSetupComponent;
  let fixture: ComponentFixture<ChecklistDocumentSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChecklistDocumentSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecklistDocumentSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
