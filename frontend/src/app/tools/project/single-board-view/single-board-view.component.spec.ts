import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleBoardViewComponent } from './single-board-view.component';

describe('SingleBoardViewComponent', () => {
  let component: SingleBoardViewComponent;
  let fixture: ComponentFixture<SingleBoardViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleBoardViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleBoardViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
