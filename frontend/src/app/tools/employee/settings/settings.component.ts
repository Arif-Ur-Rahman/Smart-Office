import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/service/employee/employee.service';
import { DeleteConfirmDialogEmpModuleComponent } from '../../shared/dialog/delete-confirm-dialog-emp-module/delete-confirm-dialog-emp-module.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CreateEmpSettingComponentDialogComponent } from '../../shared/dialog/create-emp-setting-component-dialog/create-emp-setting-component-dialog.component';
import { UpdateEmpSettingComponentDialogComponent } from '../../shared/dialog/update-emp-setting-component-dialog/update-emp-setting-component-dialog.component';
import { LoginService } from 'src/app/service/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  language_selector = false;
  lang: any; //1
  designations: any;
  departments: any;
  technologies: any;
  access: any;

  constructor(
    private employeeService: EmployeeService,
    public dialog: MatDialog,
    private loginService: LoginService,
    private router: Router) { 
      this.loginService.IsLogin({}).subscribe((result) =>{
        if(result.isActive == false){
          this.router.navigate(['/']);
        }
      },
      (error) => {
        this.router.navigate(['/']);
      })
    }

  ngOnInit(): void {
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
    this.employeeService.show_all_designation({}).subscribe((result) => {
      if(result.status == 200){
        this.designations = result.body;
      }
    })

    this.employeeService.show_all_department({}).subscribe((result) => {
      if(result.status == 200){
        this.departments = result.body;
      }
    })

    this.employeeService.show_all_technology({}).subscribe((result) => {
      // console.log(result);
      if(result.status == 200){
        this.technologies = result.body;
      }
    })

    this.employeeService.show_all_access({}).subscribe((result) => {
      // console.log(result);
      if(result.status == 200){
        this.access = result.body;
      }
    })
  }


  openDesignationDeleteDialog(id:string, index:number){
    // console.log(id);
    // console.log(index)
    const dialogRef = this.dialog.open(DeleteConfirmDialogEmpModuleComponent, {
      width: '350px',
      data: {status:1, id:id, index:index, designation: this.designations}
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
    });
  }

  openDepartmentDeleteDialog(id:string, index:number){
    console.log(id);
    console.log(index)
    const dialogRef = this.dialog.open(DeleteConfirmDialogEmpModuleComponent, {
      width: '350px',
      data: {status:2, id:id, index:index, department: this.departments}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openTechnologyDeleteDialog(id:string, index:number){
    console.log(id);
    console.log(index)
    const dialogRef = this.dialog.open(DeleteConfirmDialogEmpModuleComponent, {
      width: '350px',
      data: {status:3, id:id, index:index, technologies: this.technologies}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openAccessDeleteDialog(id:string, index:number){
    console.log(id);
    console.log(index)
    const dialogRef = this.dialog.open(DeleteConfirmDialogEmpModuleComponent, {
      width: '350px',
      data: {status:4, id:id, index:index, access: this.access}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  CreateDesignationDialog(){
    const dialogRef = this.dialog.open(CreateEmpSettingComponentDialogComponent, {
      width: '350px',
      data: {title: 'designation', status:1, designation:this.designations}
    });
  }
  CreateDepartmentDialog(){
    const dialogRef = this.dialog.open(CreateEmpSettingComponentDialogComponent, {
      width: '350px',
      data: {title: 'department', status:2, department:this.departments}
    });
  }
  CreateTechnologyDialog(){
    const dialogRef = this.dialog.open(CreateEmpSettingComponentDialogComponent, {
      width: '350px',
      data: {title:'technologies',status: 3, technologies: this.technologies}
    });
  }

  CreateAccessDialog(){
    const dialogRef = this.dialog.open(CreateEmpSettingComponentDialogComponent, {
      width: '350px',
      data: {title: 'access', status:4, access:this.access}
    });
  }


  openDesignationUpdateDialog(id:string, index:number){
    console.log(id);
    console.log(index);
    const dialogRef = this.dialog.open(UpdateEmpSettingComponentDialogComponent, {
      width: '350px',
      data: {title:'designation', status:1, designation:this.designations, id:id, index:index}
    });

  }
  openDepartmentUpdateDialog(id:string, index:number){
    console.log(id);
    console.log(index);
    const dialogRef = this.dialog.open(UpdateEmpSettingComponentDialogComponent, {
      width: '350px',
      data: {title:'department', status:2, department:this.departments, id:id, index:index}
    });

  }
  openTechnologyUpdateDialog(id:string, index:number){
    console.log(id);
    console.log(index);
    const dialogRef = this.dialog.open(UpdateEmpSettingComponentDialogComponent, {
      width: '350px',
      data: {title:'technology',status:3, id:id, index:index, technologies: this.technologies}
    });

  }
  openAccessUpdateDialog(id:string, index:number){
    console.log(id);
    console.log(index);
    const dialogRef = this.dialog.open(UpdateEmpSettingComponentDialogComponent, {
      width: '350px',
      data: {title:'access',status:4, id:id, index:index, access: this.access}
    });

  }






}
