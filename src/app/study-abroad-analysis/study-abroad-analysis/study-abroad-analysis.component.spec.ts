import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyAbroadAnalysisComponent } from './study-abroad-analysis.component';

describe('StudyAbroadAnalysisComponent', () => {
  let component: StudyAbroadAnalysisComponent;
  let fixture: ComponentFixture<StudyAbroadAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudyAbroadAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyAbroadAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
