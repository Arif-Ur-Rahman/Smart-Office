import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDetailsProjectDialogComponent } from './edit-details-project-dialog.component';

describe('EditDetailsProjectDialogComponent', () => {
  let component: EditDetailsProjectDialogComponent;
  let fixture: ComponentFixture<EditDetailsProjectDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDetailsProjectDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDetailsProjectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
