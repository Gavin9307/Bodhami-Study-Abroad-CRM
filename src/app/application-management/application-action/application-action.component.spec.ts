import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationActionComponent } from './application-action.component';

describe('ApplicationActionComponent', () => {
  let component: ApplicationActionComponent;
  let fixture: ComponentFixture<ApplicationActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
