import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSuiteDetailsComponent } from './test-suite-details.component';

describe('TestSuiteDetailsComponent', () => {
  let component: TestSuiteDetailsComponent;
  let fixture: ComponentFixture<TestSuiteDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestSuiteDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSuiteDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
