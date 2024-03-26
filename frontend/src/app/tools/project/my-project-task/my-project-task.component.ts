import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {CdkDragDrop,CdkDragEnter,CdkDragMove, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { kanbanBoardService } from 'src/app/service/project/kanbanBoard.service';
import { CreateEditTaskDialogComponent } from '../../shared/dialog/create-edit-task-dialog/create-edit-task-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from '../../shared/dialog/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { UpdateTaskComponent } from '../../shared/dialog/update-task/update-task.component';
import { ProjectService } from 'src/app/service/project/project.service';
import { ViewTaskDetialsDialogComponent } from '../../shared/dialog/view-task-detials-dialog/view-task-detials-dialog.component';
import { AddTaskMemberDialogComponent } from '../../shared/dialog/add-task-member-dialog/add-task-member-dialog.component';

@Component({
  selector: 'app-my-project-task',
  templateUrl: './my-project-task.component.html',
  styleUrls: ['./my-project-task.component.css']
})
export class MyProjectTaskComponent implements OnInit {

  emp_id = sessionStorage.getItem('id')

  id:any;
  project: any;

  project_members : any;

  new_tasks:any;
  backlog_tasks:any;
  ready_tasks:any;
  inProgress_tasks:any;
  inReview_tasks:any;
  done_tasks:any;

  state_from : any;
  state_to : any;
  state : any;

  task_create_msg : boolean = false;


  constructor(private route: ActivatedRoute, 
    private kanbanService: kanbanBoardService,
    private projectService: ProjectService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.id = '6461ae10f3be354fb0b68b7b';
    // console.log(this.id);

    // this.projectService.show_all_task_ofSingleEmp({"id": this.id}).subscribe((result) => {
    //   console.log(result.body[0].member);
    //     this.project = result.body[0];
    //     this.project_members = result.body[0].member;
    // })


    this.projectService.show_all_task_ofSingleEmp({
      "id": this.emp_id,
      "state":"NEW"
    }).subscribe((result) => {
      // console.log(result);
        this.new_tasks = result.body;
    })

    this.projectService.show_all_task_ofSingleEmp({
      "id": this.emp_id,
      "state":"BACKLOG"
    }).subscribe((result) => {
      // console.log(result);
      this.backlog_tasks = result.body;
    })

    this.projectService.show_all_task_ofSingleEmp({
      "id": this.emp_id,
      "state":"READY"
    }).subscribe((result) => {
      // console.log(result);
      this.ready_tasks = result.body;
    })

    this.projectService.show_all_task_ofSingleEmp({
      "id": this.emp_id,
      "state":"IN_PROGRESS"
    }).subscribe((result) => {
      // console.log(result);
      this.inProgress_tasks = result.body;
    })

    this.projectService.show_all_task_ofSingleEmp({
      "id": this.emp_id,
      "state":"IN_REVIEW"
    }).subscribe((result) => {
      // console.log(result);
      this.inReview_tasks = result.body;
    })

    this.projectService.show_all_task_ofSingleEmp({
      "id": this.emp_id,
      "state":"DONE"
    }).subscribe((result) => {
      // console.log(result);
      this.done_tasks = result.body;
    })
  }


  // Task Movement
  drop(event: CdkDragDrop<string[]>) {

    // console.log(event.previousIndex);
    // console.log(event.currentIndex);
    
    let previous_task_id = event.previousContainer.data[event.previousIndex]['_id'];
    // let current_task_id = event.container.data[event.currentIndex]['_id'];

    console.log(previous_task_id)
    // console.log(current_task_id)
 
    this.state_from = event.previousContainer.id;
    this.state_to = event.container.id;

    console.log(this.state_from);
    console.log(this.state_to);

    if(this.state_to == 'cdk-drop-list-0'){
      this.state = "NEW";
    }
    else if(this.state_to == 'cdk-drop-list-1'){
      this.state = "BACKLOG";
    }
    else if(this.state_to == 'cdk-drop-list-2'){
      this.state = "READY";
    }
    else if(this.state_to == 'cdk-drop-list-3'){
      this.state = "IN_PROGRESS";
    }
    else if(this.state_to == 'cdk-drop-list-4'){
      this.state = "IN_REVIEW";
    }
    else if(this.state_to == 'cdk-drop-list-5'){
      this.state = "DONE";
    }


    // transferArrayItem(
    //   event.previousContainer.data,
    //   event.container.data,
    //   event.previousIndex,
    //   event.currentIndex,
    // );
    
    // this.projectService.moves_task({
    //   "id": previous_task_id,
    //   "state":this.state
    // }).subscribe((result) => {
    //   console.log(result);
    // }) 
  }



}
