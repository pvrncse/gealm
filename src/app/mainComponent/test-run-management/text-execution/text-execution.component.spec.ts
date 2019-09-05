import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextExecutionComponent } from './text-execution.component';

describe('TextExecutionComponent', () => {
  let component: TextExecutionComponent;
  let fixture: ComponentFixture<TextExecutionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextExecutionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextExecutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
