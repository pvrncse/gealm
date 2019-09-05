import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutionTestCasesComponent } from './execution-test-cases.component';

describe('ExecutionTestCasesComponent', () => {
  let component: ExecutionTestCasesComponent;
  let fixture: ComponentFixture<ExecutionTestCasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExecutionTestCasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecutionTestCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
