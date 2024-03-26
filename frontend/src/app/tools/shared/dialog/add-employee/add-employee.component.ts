import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/service/employee/employee.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})
export class AddEmployeeComponent implements OnInit {
  departments: any;
  pass_error:boolean = false;
  designations: any; 
  employees = this.data.employees;

  createEmployeeForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private employee: EmployeeService,
    public dialogRef: MatDialogRef<AddEmployeeComponent>) {}

  ngOnInit(): void {

    this.createEmployeeForm = new FormGroup(
      {
        name: new FormControl('',[Validators.required]),
        gender: new FormControl('',[Validators.required]),
        joining_date: new FormControl('',[Validators.required]),
        emp_id: new FormControl('',[Validators.required]),
        email: new FormControl('',[Validators.required]),
        password: new FormControl('',[Validators.required]),
        contactNumber: new FormControl('',[Validators.required]),
        address: new FormControl('',[Validators.required]),
        department_name: new FormControl('',[Validators.required]),
        designation: new FormControl('',[Validators.required]),
        description: new FormControl('',[Validators.required]),
      }
    )
  }

  addEmployee(data: any) {
    console.log(data);

    this.employee.create_emp(
      {
        name: data.name,
        email: data.email,
        password: data.password,
        employee_id_no: data.emp_id,
        contact_number: data.contactNumber,
        address: data.address,
        designation: data.designation,
        department_name: data.department_name,
        description: data.description,
        gender: data.gender,
        joining_date: data.joining_date,
      })
      .subscribe((result) => {
        console.log(result);
        if(result.status == 200){
          this.dialogRef.close();
          // let newEmployee = result.body;
          // this.employees.push(newEmployee);
          window.location.reload();
        }
      });






// if(password == confirm_password)
// {
//   this.employee
//   .create_emp({
//     name: data.name,
//     email: data.email,
//     password: data.password,
//     employee_id: data.emp_id,
//     contact_number: data.contactNumber,
//     address: data.address,
//     designation: data.designation,
//     department: data.department,
//     description: data.description,
//     gender: data.gender,
//     joining_date: data.joining_date,
//     admin: false,
//     active_status: true,
//   })
//   .subscribe((result) => {
//     console.log(result);
//     if(result.status == 200){
//       this.dialog.closeAll();
//       let newEmployee = result.body;
//       this.employees.push(newEmployee);
//     }
//   });

// }
// else{
//   this.pass_error = true;
// }
    
  }
}