import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from 'src/app/service/login/login.service';
import { Router } from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import { ProjectService } from 'src/app/service/project/project.service';
import { ViewDetailsProjectDialogComponent } from '../../shared/dialog/view-details-project-dialog/view-details-project-dialog.component';
import { AddMemberDialogComponent } from '../../shared/dialog/add-member-dialog/add-member-dialog.component';
import { DeleteConfirmationDialogComponent } from '../../shared/dialog/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { UpdateProjectComponent } from '../../shared/dialog/update-project/update-project.component';
import { EditDetailsProjectDialogComponent } from '../../shared/dialog/edit-details-project-dialog/edit-details-project-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { AddProjectMemberDialogComponent } from '../../shared/dialog/add-project-member-dialog/add-project-member-dialog.component';
import { CreateNewProjectDialogComponent } from '../../shared/dialog/create-new-project-dialog/create-new-project-dialog.component';
import { EditProjectInfoDialogComponent } from '../../shared/dialog/edit-project-info-dialog/edit-project-info-dialog.component';

export interface PeriodicElement {
  id: string;
  title: string;
  version: string;
  deadline: string;
  priority: string;
  status: string;
}
const ELEMENT_DATA: PeriodicElement[] = [];
/**
 * @title Table with filtering
 */

@Component({
  selector: 'app-all-projects',
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.css']
})

export class AllProjectsComponent implements OnInit  {

  @Input() myProject:any;
  
  projects: any;

  showSpinner = true;
  language_selector = false;
  lang: any;
  empty_project:boolean = false;
  admin: boolean;

  emp_id = sessionStorage.getItem('id');

  displayedColumns: string[] = ['id', 'serial', 'title', 'version', 'deadline', 'priority', 'status', 'action'];
  dataSource: any;
  filterValue = '';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) set matSort(mSort: MatSort){
  //   this.dataSource.sort = mSort;
  // };
  @ViewChild('myHeaderCell', {static: false}) myHeaderCell: ElementRef;

  constructor(
    public dialog: MatDialog, 
    private project: ProjectService,
    private loginService: LoginService,
    private router: Router) {

      this.loginService.IsLogin({}).subscribe((result) => {
        if(result.status == 200){
          this.admin = result.isAdmin;
        }
      });
    }

  ngOnInit(): void {
    this.project.show_all_project({}).subscribe((result)=>{
    console.log(result.body);
    this.projects = result.body;
    this.dataSource = new MatTableDataSource<PeriodicElement>(result.body)
    //this.dataSource = result.body;
    this.dataSource.paginator = this.paginator;
    // Set the paginator's pageIndex property to the last page index
    const lastPageIndex = Math.ceil(this.dataSource.length / this.paginator.pageSize) - 1;
    this.paginator.pageIndex = lastPageIndex;

    if(this.projects.length == 0){
      this.empty_project = true;
    }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue;
  }

  createProjectDialogOpen(){
    const dialogRef = this.dialog.open(CreateNewProjectDialogComponent,
      {
        width: 'auto',
        height: 'auto',
        data: {
          projects : this.projects
        }
      });
  }

  openViewDialog(id:any, index:number) {

    const serial = index + 1 + (this.paginator.pageIndex * this.paginator.pageSize);

    let project = this.projects[serial-1];

    this.dialog.open(ViewDetailsProjectDialogComponent,
      {
        width: 'auto',
        height: 'auto',
        data: {
          project : project
        }
      });
  }

  openAddMemberDialog(id:any, index:number) { 
    console.log('id'+ id);
    console.log('index'+ index);
    console.log('projects'+ this.projects);
    const dialogRef = this.dialog.open(AddProjectMemberDialogComponent, {
      width: 'auto',
      height: 'auto',
      data:{
        project_id : id, index:index, projects:this.projects
      }
    });
  }

  openDeleteDialog(project_id:any, index:any) {
    this.dialog.open(DeleteConfirmationDialogComponent,
      {
        width: 'auto',
        height: 'auto',
        data: {
          id : project_id, status: 4, projects: this.projects, index:index
        }
      });
  }

  openEditDialog(project_id:any, index:number) {

    const serial = index + 1 + (this.paginator.pageIndex * this.paginator.pageSize);

    let project = this.projects[serial-1];
    // let project = this.projects[index];
    this.dialog.open(EditProjectInfoDialogComponent,
      {
        width: 'auto',
        height: 'auto',
        data: {
          id : project_id, project: project, projects: this.projects, index: index,
        }
      });
  }
}
