import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEmpSettingComponentDialogComponent } from './create-emp-setting-component-dialog.component';

describe('CreateEmpSettingComponentDialogComponent', () => {
  let component: CreateEmpSettingComponentDialogComponent;
  let fixture: ComponentFixture<CreateEmpSettingComponentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEmpSettingComponentDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEmpSettingComponentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
