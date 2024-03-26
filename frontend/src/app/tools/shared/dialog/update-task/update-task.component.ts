import { Component, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ProjectService } from 'src/app/service/project/project.service';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {

  task_id = this.data['task_id'];
  project_id = this.data['project_id'];

  task: any;
  dialog_data: any;

  

  updateTaskForm = new FormGroup({
    task_title: new FormControl(''),
    description: new FormControl(''),
    start_date: new FormControl(''),
    end_date: new FormControl(''),
    dificulty: new FormControl(''),
    assign_member: new FormControl('')
  });

  constructor(public dialogRef: MatDialogRef<UpdateTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    public dialog: MatDialog,
    private projectService: ProjectService) { 
     
  }

  ngOnInit(): void {
    // console.log(this.task_id);
    this.projectService.show_task_details({ "id":this.task_id}).subscribe((result) =>{
      console.log(result.body);
      if(result.status == 200){
        this.task = result.body;
      }
    })
  }


  update_Task(){
    // console.log(this.updateTaskForm.value);

    let task_title = this.updateTaskForm.value["task_title"];
    let description = this.updateTaskForm.value["description"];
    
    let end_date = this.updateTaskForm.value["end_date"];
    let start_date = this.updateTaskForm.value["start_date"];
    let assign_member = this.updateTaskForm.value["assign_member"];

    if(task_title == ''){
      task_title = this.task.title;
    }

    if(description == ''){
      description = this.task.description;
    }

    if(start_date == ''){
      start_date = this.task.start_date;
    }

    if(end_date == ''){
      end_date = this.task.end_date;
    }

    
    this.projectService.update_task({
      "id": this.task._id,
      "title": task_title,
      "description": description,
      "assigned_to": this.task.assigned_to,
      "assigned_by": this.task.assigned_by,
      "state": this.task.state,
      "start_date": start_date,
      "end_date": end_date,
      "project_id": this.project_id
    }).subscribe((result) =>{

      console.log(result);
      if(result.status == 200){
        // this.dialog_data = result.body;
        // this.dialogRef.close('Dipu');
      }
    });

  }

}
