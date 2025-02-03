import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageStudentsApplicationComponent } from './manage-students-application.component';

describe('ManageStudentsApplicationComponent', () => {
  let component: ManageStudentsApplicationComponent;
  let fixture: ComponentFixture<ManageStudentsApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageStudentsApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageStudentsApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
