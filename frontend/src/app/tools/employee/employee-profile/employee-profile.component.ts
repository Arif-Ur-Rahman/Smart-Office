import { Component, OnInit } from '@angular/core';
import {EmployeeService} from '../../../service/employee/employee.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UpdateEmployeeDialogComponent } from '../../shared/dialog/update-employee-dialog/update-employee-dialog.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DeleteConfirmDialogEmpModuleComponent } from '../../shared/dialog/delete-confirm-dialog-emp-module/delete-confirm-dialog-emp-module.component';
import { LoginService } from 'src/app/service/login/login.service';
import { ProjectService } from 'src/app/service/project/project.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css']
})
export class EmployeeProfileComponent implements OnInit {
  language_selector = false;
  lang: any; //1
  pipe = new DatePipe('en-US');
  emp_id:any;
  employee_profile: any;
  admin = false;
  emp_admin: boolean;
  role_change_error = false;
  projects: any;

  constructor(
    private activateRoute:ActivatedRoute,  
    private employee: EmployeeService,
    public dialog: MatDialog,
    private loginService: LoginService,
    private projectService: ProjectService,) {

      activateRoute.params.subscribe((params) => {
        this.emp_id = params['id'];
      });
   }

  ngOnInit(): void {
    {

    } 
    
    this.loginService.IsLogin({}).subscribe((result) =>{
      if(result.isAdmin == true){
        this.admin =true;
      }
    },
    (error) => {
      this.admin = false;
    });

    
    this.employee.show_emp_profile({"id": this.emp_id}).subscribe((result) =>{
      if(result.status == 200){
        this.employee_profile = result.body;   
        this.emp_admin = result.body.admin;   
      }
    });

    this.projectService.show_my_project({"employeeId":this.emp_id}).subscribe((result) =>{
      this.projects = result.body;
    })
  }

  updateEmployee(id: string){
    const dialogRef = this.dialog.open(UpdateEmployeeDialogComponent, {
      data: {emp_id: id, emp_profile:this.employee_profile}
    });
  }


  deleteEmployee(id: string){
    const dialogRef = this.dialog.open(DeleteConfirmDialogEmpModuleComponent, {
      width: '400px',
      data: {emp_id: id}
    })
  }

  roleChange(id: string){
    this.loginService.role_change({"id": id}).subscribe((result) =>{
      if(result.status == 200){
        window.location.reload();
      }
      else if(result.status == 201){
        this.role_change_error = true;
      }
    });
  }

}
