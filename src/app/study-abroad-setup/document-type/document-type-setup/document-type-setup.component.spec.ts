import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentTypeSetupComponent } from './document-type-setup.component';

describe('DocumentTypeSetupComponent', () => {
  let component: DocumentTypeSetupComponent;
  let fixture: ComponentFixture<DocumentTypeSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentTypeSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentTypeSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
