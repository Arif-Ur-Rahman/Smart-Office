import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRolePriorityTechComponent } from './update-role-priority-tech.component';

describe('UpdateRolePriorityTechComponent', () => {
  let component: UpdateRolePriorityTechComponent;
  let fixture: ComponentFixture<UpdateRolePriorityTechComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateRolePriorityTechComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateRolePriorityTechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
