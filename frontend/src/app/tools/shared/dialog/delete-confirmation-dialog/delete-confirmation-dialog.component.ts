import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/service/project/project.service';
import { kanbanBoardService } from 'src/app/service/project/kanbanBoard.service';
import { Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
export interface DialogData { }

@Component({
  selector: 'app-delete-confirmation-dialog',
  templateUrl: './delete-confirmation-dialog.component.html',
  styleUrls: ['./delete-confirmation-dialog.component.css']
})
export class DeleteConfirmationDialogComponent implements OnInit {

  id = this.data['id'];
  emp_id = this.data['emp_id'];
  project_id = this.data['project_id'];
  index = this.data['index'];
  status = this.data["status"];
  task = this.data["task"];
  statuses: any;
  dialog_data: any;

 

  projects = this.data["projects"];
  signle_project = this.data["project"];

  state_id = this.data["state_id"];
  task_id = this.data["task_id"];
  tasks = this.data["tasks"];

  // Asset module
  Categories = this.data["Categories"];
  requests = this.data["requests"];



  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DeleteConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private snackBar: MatSnackBar,
    private projectService: ProjectService,) {
      
  }

  ngOnInit(): void {
  
   console.log(this.status);
   console.log(this.task_id);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  delete(): void {

    

    if(this.status == 4){
      this.projectService.delete_project({"id":this.id}).subscribe((result) =>{
        if(result.status == 200){
          this.projects.splice(this.index, 1);
          window.location.reload();
        }
      })
    }

    else if(this.status == 5){
      this.projectService.delete_task({"id":this.task_id}).subscribe((result) =>{
        // console.log(result);
      if(result.status == 200){
        this.dialog_data = result.body;
        this.dialogRef.close(this.dialog_data);
      }
      });
    }

    else if(this.status == 7){
      this.projectService.delete_member({
        "member_id":this.id,
        "project": this.project_id
      }).subscribe((result) =>{
        if(result.status == 200){
          this.signle_project.assign_members.splice(this.index, 1);
          this.snackBar.open('Member removed from project successfully', 'Close', {
            duration: 3000,
            horizontalPosition: 'start',
            verticalPosition: 'bottom'
          });
        }
      });
    }

    
  }

}
