import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDetailsProjectDialogComponent } from './view-details-project-dialog.component';

describe('ViewDetailsProjectDialogComponent', () => {
  let component: ViewDetailsProjectDialogComponent;
  let fixture: ComponentFixture<ViewDetailsProjectDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDetailsProjectDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDetailsProjectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
