import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTeamsActionComponent } from './my-teams-action.component';

describe('MyTeamsActionComponent', () => {
  let component: MyTeamsActionComponent;
  let fixture: ComponentFixture<MyTeamsActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTeamsActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTeamsActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
