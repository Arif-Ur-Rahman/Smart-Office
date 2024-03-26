import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteConfirmDialogEmpModuleComponent } from './delete-confirm-dialog-emp-module.component';

describe('DeleteConfirmDialogEmpModuleComponent', () => {
  let component: DeleteConfirmDialogEmpModuleComponent;
  let fixture: ComponentFixture<DeleteConfirmDialogEmpModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteConfirmDialogEmpModuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteConfirmDialogEmpModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
