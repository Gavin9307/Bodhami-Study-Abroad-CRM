import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversityChecklistComponent } from './university-checklist.component';

describe('UniversityChecklistComponent', () => {
  let component: UniversityChecklistComponent;
  let fixture: ComponentFixture<UniversityChecklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniversityChecklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniversityChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
