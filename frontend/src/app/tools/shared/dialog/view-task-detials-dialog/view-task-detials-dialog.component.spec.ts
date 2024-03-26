import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTaskDetialsDialogComponent } from './view-task-detials-dialog.component';

describe('ViewTaskDetialsDialogComponent', () => {
  let component: ViewTaskDetialsDialogComponent;
  let fixture: ComponentFixture<ViewTaskDetialsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTaskDetialsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTaskDetialsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
