import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentSetupComponent } from './document-setup.component';

describe('DocumentSetupComponent', () => {
  let component: DocumentSetupComponent;
  let fixture: ComponentFixture<DocumentSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
