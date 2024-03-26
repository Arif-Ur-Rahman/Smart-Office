import { Component, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { FormGroup, FormControl, FormControlName, Validators  } from '@angular/forms';
import { ProjectService } from 'src/app/service/project/project.service';



@Component({
  selector: 'app-create-edit-task-dialog',
  templateUrl: './create-edit-task-dialog.component.html',
  styleUrls: ['./create-edit-task-dialog.component.css']
})
export class CreateEditTaskDialogComponent implements OnInit {
 

  add_task_flag:boolean;
  login_emp_id = sessionStorage.getItem('id')
  
  
  lang: any;

  dialog_data : any;

  project_members = this.data.members;
  project_id = this.data.project_id;

  createTaskForm = new FormGroup({
    title: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required]),
    start_date: new FormControl('',[Validators.required]),
    end_date: new FormControl('',[Validators.required]),
    dificulty: new FormControl('',[Validators.required]),
    assign_member: new FormControl('',[Validators.required]),
  });

  constructor(public dialogRef: MatDialogRef<CreateEditTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    public dialog: MatDialog,
    private prjectService: ProjectService) { 

      // console.log(this.project_members);
      
  }

  ngOnInit(): void {
    
  }


  create(){

    let title = this.createTaskForm.value['title'];
    let description = this.createTaskForm.value['description'];
    let start_date = this.createTaskForm.value['start_date'];
    let end_date = this.createTaskForm.value['end_date'];
    let assign_member = this.createTaskForm.value['assign_member'];


    this.prjectService.create_task({
      "title": title,
      "description": description,
      "assigned_to": assign_member,
      "assigned_by": this.login_emp_id,
      "state":"NEW",
      "start_date": start_date,
      "end_date": end_date,
      "project_id": this.project_id,
    }).subscribe((result) => {
      console.log(result);
      if(result.status == 200){
        this.dialog_data = result.body;
        this.dialogRef.close(this.dialog_data);
      }
     
    });
   

  }
}
