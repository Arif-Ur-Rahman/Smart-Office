import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/service/employee/employee.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-show-employee-details',
  templateUrl: './show-employee-details.component.html',
  styleUrls: ['./show-employee-details.component.css']
})
export class ShowEmployeeDetailsComponent implements OnInit {
  departments: any;
  pass_error:boolean = false;
  designations: any; 
  employees = this.data.employees;

  emp_id = this.data.employee_id;

  employee: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private employeeService: EmployeeService,
    public dialog: MatDialog) {}

  ngOnInit(): void {
    console.log(this.emp_id);

    this.employeeService.show_emp_profile({"id": this.emp_id}).subscribe((result) => {
      console.log(result.body);
      this.employee = result.body
    })
  }

}
