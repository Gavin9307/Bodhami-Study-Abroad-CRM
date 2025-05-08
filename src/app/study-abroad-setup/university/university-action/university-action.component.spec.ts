import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversityActionComponent } from './university-action.component';

describe('UniversityActionComponent', () => {
  let component: UniversityActionComponent;
  let fixture: ComponentFixture<UniversityActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniversityActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniversityActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
