import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/service/employee/employee.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Inject } from '@angular/core';

export interface DialogData {}

@Component({
  selector: 'app-update-employee-dialog',
  templateUrl: './update-employee-dialog.component.html',
  styleUrls: ['./update-employee-dialog.component.css'],
})
export class UpdateEmployeeDialogComponent implements OnInit {

  // employees = this.data["employees"];
  // index = this.data["index"];
  
  emp_id = this.data["employee_id"];
  // name = this.data["name"];
  // employee_id_no = this.data["employee_id_no"];
  // joining_date = this.data["joining_date"];
  // email = this.data["email"];
  // contactNumber = this.data["contactNumber"];
  // address = this.data["address"];
  // description = this.data["description"];
  // department_name = this.data["department_name"];
  // designation = this.data["designation"];
  // gender = this.data["gender"];

  employee:any;
 

  constructor(
    private employeeService : EmployeeService,
    public dialogRef: MatDialogRef<UpdateEmployeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    console.log(this.emp_id);
  }

  ngOnInit(): void {
    this.employeeService.show_emp_profile({"id": this.emp_id}).subscribe((result) => {
      console.log(result.body);
      this.employee = result.body
    })
  }

  updateEmployeeDialog(data:any){
    
    console.log(data)


    let name = data.name;
    let email = data.email;
    let gender = data.gender;
    let employee_id_no = data.employee_id_no;
    let joining_date = data.joining_date;
    let emp_id = data.emp_id;
    let contactNumber = data.contactNumber;
    let address = data.address;
    let department_name = data.department_name;
    let designation = data.designation;
    let description = data.description;

    if(name == ''){
      name = name;
    }
    if(email == ''){
      email = email;
    }
    if(joining_date == ''){
      joining_date = joining_date;
    }
    if(emp_id == ''){
      emp_id = this.emp_id;
    }
    if(contactNumber == ''){
      contactNumber = contactNumber;
    }
    if(employee_id_no == ''){
      employee_id_no = employee_id_no;
    }
    
    if(department_name == ''){
      department_name = department_name;
    }
    if(address == ''){
      address = address;
    }
    if(designation == ''){
      designation = designation;
    }
    if(description == ''){
      description = description;
    }
    if(gender == ''){
      gender = gender;
    }

    console.log(name);
    console.log(email);
    console.log(joining_date);
    console.log(this.emp_id);
    console.log(contactNumber);
    console.log(employee_id_no);
    console.log(department_name);
    console.log(address);
    console.log(designation);
    console.log(description);
    console.log(gender);

    this.employeeService.update_employee({
      "id": this.emp_id,
      "employee_id_no": employee_id_no,
      "name": name,
      "email": email,
      "contact_number": contactNumber,
      "address": address,
      "description": description,
      "gender": gender,
      "joining_date": joining_date,
      "designation": designation,
      "department_name": department_name
    }).subscribe((result)=>{
      console.log(result);
      if(result.status == 200){
        window.location.reload();
      }
    })

    
  };



  

}
