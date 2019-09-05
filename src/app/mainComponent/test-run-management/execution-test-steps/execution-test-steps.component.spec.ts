import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutionTestStepsComponent } from './execution-test-steps.component';

describe('ExecutionTestStepsComponent', () => {
  let component: ExecutionTestStepsComponent;
  let fixture: ComponentFixture<ExecutionTestStepsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExecutionTestStepsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecutionTestStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
