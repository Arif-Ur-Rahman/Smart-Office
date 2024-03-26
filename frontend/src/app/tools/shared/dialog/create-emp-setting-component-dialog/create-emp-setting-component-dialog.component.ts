import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormControlName, Validators  } from '@angular/forms';
import { ProjectService } from 'src/app/service/project/project.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { EmployeeService } from 'src/app/service/employee/employee.service';

export interface DialogData { }

@Component({
  selector: 'app-create-emp-setting-component-dialog',
  templateUrl: './create-emp-setting-component-dialog.component.html',
  styleUrls: ['./create-emp-setting-component-dialog.component.css']
})
export class CreateEmpSettingComponentDialogComponent implements OnInit {
  language_selector = false;
  lang: any; //1

  status = this.data["status"];
  designation = this.data["designation"];
  department = this.data["department"];
  technologies = this.data["technologies"];
  access = this.data["access"];
  title = this.data["title"];
  
  createRoleForm = new FormGroup({
    title: new FormControl('',[Validators.required]) 
  });

  constructor(
    private employeeService: EmployeeService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<CreateEmpSettingComponentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,) { }

  ngOnInit(): void {
    {
      this.lang = sessionStorage.getItem('lang'); //2
  
      if(this.lang){
        if(this.lang == "0"){
          this.language_selector = false;
        }
        else if(this.lang == "1"){
          this.language_selector = true;
        }
      }
      else{
        this.language_selector = false;
      }
    }
  }

  Create(){
    // let input_title = this.createRoleForm.value.title;
    // console.log(input_title); [Will be disclosed again, if necessary: Arif: 24.1.23]

    if(this.status == 1){
      let input_title = this.createRoleForm.value.title;
      this.employeeService.create_designation({"title": input_title}).subscribe((result) => {
        if(result.status == 200){
          this.dialog.closeAll();
          let new_designation = result.body;
          this.designation.push(new_designation);
          // window.location.reload();
        }
      })
    }
    else if(this.status == 2){
      let input_title = this.createRoleForm.value.title;
      this.employeeService.create_department({"title": input_title}).subscribe((result) => {
        if(result.status == 200){
          this.dialog.closeAll();
          let new_department = result.body;
          this.department.push(new_department);
          //window.location.reload();
        }
      })
    }
    else if(this.status == 3){
      let input_title = this.createRoleForm.value.title;
      this.employeeService.create_technology({"title": input_title}).subscribe((result) => {
        if(result.status == 200){
          this.dialog.closeAll();
          let new_technologies = result.body;
          this.technologies.push(new_technologies);
          // window.location.reload();access
        }
      })
    }
    else if(this.status == 4){
      let input_title = this.createRoleForm.value.title;
      this.employeeService.create_access({
        "title": input_title,
        "access_modules": ["632bc96c5d7901b57d619e36","632bce9992f84e13697a2e5b"]
      }).subscribe((result) => {
        console.log(result)
        if(result.status == 200){
          this.dialog.closeAll();
          let new_access = result.body;
          this.access.push(new_access);
          // window.location.reload();
        }
      })
    }
  }
}
