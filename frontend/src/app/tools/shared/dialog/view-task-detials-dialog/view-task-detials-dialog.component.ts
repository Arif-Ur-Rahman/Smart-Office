import { Component, OnInit,Inject  } from '@angular/core';
import {MatDialog,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';
import { LoginService } from 'src/app/service/login/login.service';
import { ProjectService } from 'src/app/service/project/project.service';

@Component({
  selector: 'app-view-task-detials-dialog',
  templateUrl: './view-task-detials-dialog.component.html',
  styleUrls: ['./view-task-detials-dialog.component.css']
})
export class ViewTaskDetialsDialogComponent implements OnInit {
  
  pipe = new DatePipe('en-US');
  task_id = this.data.task_id;
  
  admin: boolean;

  task: any;

  

  constructor( 
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private loginService: LoginService,
    private projectService: ProjectService) {
      loginService.IsLogin({}).subscribe((result) => {
        if(result.status == 200){
          this.admin = result.isAdmin;
        }      
      });
  }

  ngOnInit(): void {
    console.log(this.task_id);
    
    this.projectService.show_task_details({ "id":this.task_id}).subscribe((result) =>{
      console.log(result.body);
      if(result.status == 200){
        this.task = result.body;
      }
    })
  }

  deleteTaskMember(emp_id:string, index:number){
    
  }


}
