import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamActionComponent } from './team-action.component';

describe('TeamActionComponent', () => {
  let component: TeamActionComponent;
  let fixture: ComponentFixture<TeamActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
