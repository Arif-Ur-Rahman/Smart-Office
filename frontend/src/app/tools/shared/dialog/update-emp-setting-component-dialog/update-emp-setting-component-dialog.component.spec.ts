import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEmpSettingComponentDialogComponent } from './update-emp-setting-component-dialog.component';

describe('UpdateEmpSettingComponentDialogComponent', () => {
  let component: UpdateEmpSettingComponentDialogComponent;
  let fixture: ComponentFixture<UpdateEmpSettingComponentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateEmpSettingComponentDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateEmpSettingComponentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
