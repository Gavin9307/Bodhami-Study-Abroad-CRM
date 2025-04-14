import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentActionComponent } from './student-action.component';

describe('StudentActionComponent', () => {
  let component: StudentActionComponent;
  let fixture: ComponentFixture<StudentActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
