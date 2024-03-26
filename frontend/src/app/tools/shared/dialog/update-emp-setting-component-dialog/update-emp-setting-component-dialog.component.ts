import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormControlName  } from '@angular/forms';
import { ProjectService } from 'src/app/service/project/project.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { EmployeeService } from 'src/app/service/employee/employee.service';

export interface DialogData { }

@Component({
  selector: 'app-update-emp-setting-component-dialog',
  templateUrl: './update-emp-setting-component-dialog.component.html',
  styleUrls: ['./update-emp-setting-component-dialog.component.css']
})
export class UpdateEmpSettingComponentDialogComponent implements OnInit {
  language_selector = false;
  lang: any; //1

  status = this.data["status"];
  designation = this.data["designation"];
  department = this.data["department"];
  technologies = this.data["technologies"];
  access = this.data["access"];
  id = this.data["id"];
  index = this.data["index"];

  
  createRoleForm = new FormGroup({
    title: new FormControl('') 
  });

  constructor(
    private employeeService: EmployeeService,
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

  Update(){
    let input_title = this.createRoleForm.value.title;

    if(this.status == 1){
      this.employeeService.update_designation({"id":this.id, "title":input_title}).subscribe((result) => {
        if(result.status == 200){
          let update_designation = result.body;
          this.designation[this.index] = update_designation;
          // window.location.reload();
        }
      })
    }
    if(this.status == 2){
      this.employeeService.update_department({"id":this.id, "title":input_title}).subscribe((result) => {
        if(result.status == 200){
          let update_department = result.body;
          this.department[this.index] = update_department;
          // window.location.reload(); 
        }
      })
    }
    if(this.status == 3){
      this.employeeService.update_technology({"id":this.id, "title":input_title}).subscribe((result) => {
        if(result.status == 200){
          let update_technologies = result.body;
          this.technologies[this.index] = update_technologies;
          // window.location.reload(); technologies
        }
      })
    }
    if(this.status == 4){
      this.employeeService.update_access({
        "id":this.id, 
        "title":input_title,
        "access_modules": ["632bc96c5d7901b57d619e36","632bce9992f84e13697a2e5b"]
      }).subscribe((result) => {
        if(result.status == 200){
          let update_access = result.body;
          this.access[this.index] = update_access;
          // window.location.reload(); access
        }
      })
    }
  }

}
