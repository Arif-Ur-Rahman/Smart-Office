import { Component, OnInit, Input } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from '../../dialog/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { ViewDetailsProjectDialogComponent } from '../../dialog/view-details-project-dialog/view-details-project-dialog.component';
import { UpdateProjectComponent } from '../../dialog/update-project/update-project.component';
import { AddMemberDialogComponent } from '../../dialog/add-member-dialog/add-member-dialog.component';
import {ProjectService} from 'src/app/service/project/project.service';
import { LoginService } from 'src/app/service/login/login.service';
import { EditDetailsProjectDialogComponent } from '../../dialog/edit-details-project-dialog/edit-details-project-dialog.component';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css']
})
export class ProjectCardComponent implements OnInit {
  @Input() myProject:any;

  color: ThemePalette = 'primary';
  mode: ProgressBarMode = 'buffer';
  value = 30;
  bufferValue = 70;
  projects: any;
  employees: any;
  roles:any;
  admin: boolean;
  flag:true;

  language_selector = false;
  lang: any;
  empty_project:boolean = false;

  emp_id = sessionStorage.getItem('id');

  // module_id = "62c2b440827d955c1423fd2d"; 
  
  constructor(
    public dialog: MatDialog, 
    private project: ProjectService,
    private loginService: LoginService) {

      this.lang = sessionStorage.getItem('lang');

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
      
      this.loginService.IsLogin({}).subscribe((result) => {
        if(result.status == 200){
          this.admin = result.isAdmin;
        }      
        // console.log(this.admin);
      });

      
  }

  ngOnInit(): void {
    if(this.myProject == 0){
      this.project.show_all_project({}).subscribe((result)=>{
        this.projects = result.body;
      });
    }
    else if(this.myProject == 1){
      this.project.show_my_project({"employeeId": this.emp_id}).subscribe((result)=>{
        this.projects = result.body;
        if(this.projects.length == 0){
          this.empty_project = true;
        }
      });
    }
  }

  createProjectDialogOpen(){
    const dialogRef = this.dialog.open(EditDetailsProjectDialogComponent,
      {
        data: {
          projects : this.projects
        }
      });
  }


  openViewDialog(id:any, index: number) {
    let project = this.projects[index];
    const dialogRef = this.dialog.open(ViewDetailsProjectDialogComponent,
      {
        data: {
          project : project
        }
      });
  }

  openEditDialog(project_id:any, index:number) {
    let project = this.projects[index];
    const dialogRef = this.dialog.open(UpdateProjectComponent,
      {
        data: {
          id : project_id, project: project, projects: this.projects, index: index
        }
      });
  }

  openDeleteDialog(project_id:any, index) {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent,
      {
        data: {
          id : project_id, status: 4, projects: this.projects, index:index
        }
      });
  }


  openAddMemberDialog(id:any, index:number){ 
    const dialogRef = this.dialog.open(AddMemberDialogComponent, {
      data:{
        project_id : id, index:index, projects:this.projects
      }
    });
  }

}
