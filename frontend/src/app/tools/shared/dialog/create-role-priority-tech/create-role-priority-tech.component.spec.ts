import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRolePriorityTechComponent } from './create-role-priority-tech.component';

describe('CreateRolePriorityTechComponent', () => {
  let component: CreateRolePriorityTechComponent;
  let fixture: ComponentFixture<CreateRolePriorityTechComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateRolePriorityTechComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRolePriorityTechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
