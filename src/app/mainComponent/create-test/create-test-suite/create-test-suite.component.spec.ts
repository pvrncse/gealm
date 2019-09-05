import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTestSuiteComponent } from './create-test-suite.component';

describe('CreateTestSuiteComponent', () => {
  let component: CreateTestSuiteComponent;
  let fixture: ComponentFixture<CreateTestSuiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTestSuiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTestSuiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
