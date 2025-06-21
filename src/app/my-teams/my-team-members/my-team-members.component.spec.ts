import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTeamMembersComponent } from './my-team-members.component';

describe('MyTeamMembersComponent', () => {
  let component: MyTeamMembersComponent;
  let fixture: ComponentFixture<MyTeamMembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTeamMembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTeamMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
