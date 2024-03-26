import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskMemberDialogComponent } from './add-task-member-dialog.component';

describe('AddTaskMemberDialogComponent', () => {
  let component: AddTaskMemberDialogComponent;
  let fixture: ComponentFixture<AddTaskMemberDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTaskMemberDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaskMemberDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
