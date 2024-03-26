import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-assign-task-to-engineers',
  templateUrl: './assign-task-to-engineers.component.html',
  styleUrls: ['./assign-task-to-engineers.component.css']
})
export class AssignTaskToEngineersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  toppings = new FormControl();
  toppingList: string[] = ['Arif', 'Siam', 'Gopal', 'Jamal', 'Shezan', 'Rahiful'];
}
