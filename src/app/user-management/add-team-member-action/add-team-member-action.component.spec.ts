import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTeamMemberActionComponent } from './add-team-member-action.component';

describe('AddTeamMemberActionComponent', () => {
  let component: AddTeamMemberActionComponent;
  let fixture: ComponentFixture<AddTeamMemberActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTeamMemberActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTeamMemberActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
