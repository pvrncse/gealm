import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestRunManagementComponent } from './test-run-management.component';

describe('TestRunManagementComponent', () => {
  let component: TestRunManagementComponent;
  let fixture: ComponentFixture<TestRunManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestRunManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestRunManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
