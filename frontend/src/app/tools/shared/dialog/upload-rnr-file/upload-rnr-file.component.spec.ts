import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadRnrFileComponent } from './upload-rnr-file.component';

describe('UploadRnrFileComponent', () => {
  let component: UploadRnrFileComponent;
  let fixture: ComponentFixture<UploadRnrFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadRnrFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadRnrFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
