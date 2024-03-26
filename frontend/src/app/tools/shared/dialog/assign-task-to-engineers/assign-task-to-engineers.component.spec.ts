import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignTaskToEngineersComponent } from './assign-task-to-engineers.component';

describe('AssignTaskToEngineersComponent', () => {
  let component: AssignTaskToEngineersComponent;
  let fixture: ComponentFixture<AssignTaskToEngineersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignTaskToEngineersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignTaskToEngineersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
