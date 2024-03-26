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
  selector: 'app-single-board-view',
  templateUrl: './single-board-view.component.html',
  styleUrls: ['./single-board-view.component.css']
})
export class SingleBoardViewComponent implements OnInit {

  id: any;
  states: any;
  title: string;
  project_member: any;
  new_tasks : any;
  backlog_tasks : any;
  ready_tasks : any;
  inProgress_tasks : any;
  inReview_tasks : any;
  done_tasks : any;

  state_from : any;
  state_to : any;

  language_selector = false;
  lang: any;

  move_task_error : boolean = false;

  constructor(
    private route: ActivatedRoute, 
    private kanbanService: kanbanBoardService,
    private projectService: ProjectService,
    public dialog: MatDialog){ 
      this.lang = sessionStorage.getItem('lang');

      // if(this.lang){
      //   if(this.lang == "0"){
      //     this.language_selector = false;
      //   }
      //   else if(this.lang == "1"){
      //     this.language_selector = true;
      //   }
      // }
      // else{
      //   this.language_selector = false;
      // }
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    this.kanbanService.get_project_state$({"project": this.id}).subscribe((result)=>{
      this.states = result.body;
      this.project_member = result.projectMember;
      this.title = result.projectTitle;
      
      this.new_tasks = this.states[0].tasks;
      this.backlog_tasks = this.states[1].tasks;
      this.ready_tasks = this.states[2].tasks;
      this.inProgress_tasks = this.states[3].tasks;
      this.inReview_tasks = this.states[4].tasks;
      this.done_tasks = this.states[5].tasks;

      console.log(this.new_tasks);
    });
  }


  // Task Movement
  drop(event: CdkDragDrop<string[]>) {

    // console.log(event.previousIndex);
    // console.log(event.currentIndex);
    
    let previous_task_id = event.previousContainer.data[event.previousIndex]['_id'];
    // let current_task_id = event.container.data[event.currentIndex]['_id'];
 
    this.state_from = event.previousContainer.id;
    this.state_to = event.container.id;


    if(this.state_from == 'cdk-drop-list-0'){
      this.state_from = this.states[0]._id;
    }
    else if(this.state_from == 'cdk-drop-list-1'){
      this.state_from = this.states[1]._id;
    }
    else if(this.state_from == 'cdk-drop-list-2'){
      this.state_from = this.states[2]._id;
    }
    else if(this.state_from == 'cdk-drop-list-3'){
      this.state_from = this.states[3]._id;
    }
    else if(this.state_from == 'cdk-drop-list-4'){
      this.state_from = this.states[4]._id;
    }
    else if(this.state_from == 'cdk-drop-list-5'){
      this.state_from = this.states[5]._id;
    }


    if(this.state_to == 'cdk-drop-list-0'){
      this.state_to = this.states[0]._id;
    }
    else if(this.state_to == 'cdk-drop-list-1'){
      this.state_to = this.states[1]._id;
    }
    else if(this.state_to == 'cdk-drop-list-2'){
      this.state_to = this.states[2]._id;
    }
    else if(this.state_to == 'cdk-drop-list-3'){
      this.state_to = this.states[3]._id;
    }
    else if(this.state_to == 'cdk-drop-list-4'){
      this.state_to = this.states[4]._id;
    }
    else if(this.state_to == 'cdk-drop-list-5'){
      this.state_to = this.states[5]._id;
    }
  
   
    
    if (event.previousContainer === event.container) {
      // console.log("API call from same state");
      moveItemInArray(
        event.container.data, 
        event.previousIndex, 
        event.currentIndex
      );
      this.projectService.move_task({
        "id": previous_task_id, 
        "stateFromId":this.state_from, 
        "stateToId":this.state_to, 
        "currentPosition": event.currentIndex

      }).subscribe((result)=> {
        if(result.status == 200){
          // console.log(result.status);
        }
      }, (error) => {
        if(error){
          this.move_task_error = true;
        }
      });
      

      
    } 
    else {
      // console.log("API call from different state");
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      this.projectService.move_task({
        "id":previous_task_id, 
        "stateFromId":this.state_from, 
        "stateToId":this.state_to, 
        "currentPosition": event.currentIndex
      
      }).subscribe((result)=> {
        if(result.status == 200){
          // console.log(result);
        }
      })
      
    }
  }

  // add task from different state
  add_new_task(id : any){
    let tasks = this.new_tasks;
    const dialogRef = this.dialog.open(CreateEditTaskDialogComponent,
      {
        data: {
          state_id: id, members:this.project_member, tasks: tasks
        }
      });
  }

  add_backlog_task(id : any){
    let tasks = this.backlog_tasks;
    const dialogRef = this.dialog.open(CreateEditTaskDialogComponent,
      {
        data: {
          state_id: id, members:this.project_member, tasks: tasks
        }
      });
  }

  add_ready_task(id : any){
    let tasks = this.ready_tasks;
    const dialogRef = this.dialog.open(CreateEditTaskDialogComponent,
      {
        data: {
          state_id: id, members:this.project_member, tasks: tasks
        }
      });
  }

  add_InReview_task(id : any){
    let tasks = this.inReview_tasks;
    const dialogRef = this.dialog.open(CreateEditTaskDialogComponent,
      {
        data: {
          state_id: id, members:this.project_member, tasks: tasks
        }
      });
  }
  
  add_InProgress_task(id : any){
    let tasks = this.inProgress_tasks;
    const dialogRef = this.dialog.open(CreateEditTaskDialogComponent,
      {
        data: {
          state_id: id, members:this.project_member, tasks: tasks
        }
      });
  }

  add_done_task(id : any){
    let tasks = this.done_tasks;
    const dialogRef = this.dialog.open(CreateEditTaskDialogComponent,
      {
        data: {
          state_id: id, members:this.project_member, tasks: tasks
        }
      });
  }

  // Delete task from different state


  delete_new_task(state_id: any, task_id: any, index: number){
    // console.log(state_id);
    // console.log(task_id);
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent,
      {
        data: {
          state_id:state_id, task_id:task_id, status: 5, tasks: this.new_tasks, index: index
        }
      });
  }

  delete_backlog_task(state_id: any, task_id: any, index: number){
    // console.log(state_id);
    // console.log(task_id);
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent,
      {
        data: {
          state_id:state_id, task_id:task_id, status: 5, tasks: this.backlog_tasks, index: index
        }
      });
  } 

  delete_ready_task(state_id: any, task_id: any, index: number){
    // console.log(state_id);
    // console.log(task_id);
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent,
      {
        data: {
          state_id:state_id, task_id:task_id, status: 5, tasks: this.ready_tasks, index: index
        }
      });
  }

  delete_InProgress_task(state_id: any, task_id: any, index: number){
    // console.log(state_id);
    // console.log(task_id);
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent,
      {
        data: {
          state_id:state_id, task_id:task_id, status: 5, tasks: this.inProgress_tasks, index: index
        }
      });
  }

  delete_InReview_task(state_id: any, task_id: any, index: number){
    // console.log(state_id);
    // console.log(task_id);
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent,
      {
        data: {
          state_id:state_id, task_id:task_id, status: 5, tasks: this.inReview_tasks, index: index
        }
      });
  }

  delete_done_task(state_id: any, task_id: any, index: number){
    // console.log(state_id);
    // console.log(task_id);
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent,
      {
        data: {
          state_id:state_id, task_id:task_id, status: 5, tasks: this.done_tasks, index: index
        }
      });
  }


  // Update task from different state



  edit_new_task(state_id: any, task_id: any, index: number){
    const dialogRef = this.dialog.open(UpdateTaskComponent,
      {
        data: {
          state: state_id, task_id: task_id, index: index, tasks: this.new_tasks, members:this.project_member
        }
      });
  }

  edit_backlog_task(state_id: any, task_id: any, index: number){
    const dialogRef = this.dialog.open(UpdateTaskComponent,
      {
        data: {
          state: state_id, task_id: task_id, index: index, tasks: this.backlog_tasks, members:this.project_member
        }
      });
  }

  edit_ready_task(state_id: any, task_id: any, index: number){
    const dialogRef = this.dialog.open(UpdateTaskComponent,
      {
        data: {
          state: state_id, task_id: task_id, index: index, tasks: this.ready_tasks, members:this.project_member
        }
      });
  }

  edit_InProgress_task(state_id: any, task_id: any, index: number){
    const dialogRef = this.dialog.open(UpdateTaskComponent,
      {
        data: {
          state: state_id, task_id: task_id, index: index, tasks: this.inProgress_tasks, members:this.project_member
        }
      });
  }

  edit_InReview_task(state_id: any, task_id: any, index: number){
    const dialogRef = this.dialog.open(UpdateTaskComponent,
      {
        data: {
          state: state_id, task_id: task_id, index: index, tasks: this.inReview_tasks, members:this.project_member
        }
      });
  }

  edit_done_task(state_id: any, task_id: any, index: number){
    const dialogRef = this.dialog.open(UpdateTaskComponent,
      {
        data: {
          state: state_id, task_id: task_id, index: index, tasks: this.done_tasks, members:this.project_member
        }
      });
  }

 // Show task from different state


  show_details_new_task(index:number){
    let task_details = this.states[0].tasks[index];
    const dialogRef = this.dialog.open(ViewTaskDetialsDialogComponent,
      {
        data: {
          task: task_details, state: 'New Task'
        }
      });
  }

  show_details_backlog_task(index:number){
    let task_details = this.states[1].tasks[index];
    const dialogRef = this.dialog.open(ViewTaskDetialsDialogComponent,
      {
        data: {
          task: task_details, state: 'Backlog Task'
        }
      });
  }

  show_details_ready_task(index:number){
    let task_details = this.states[2].tasks[index];
    const dialogRef = this.dialog.open(ViewTaskDetialsDialogComponent,
      {
        data: {
          task: task_details, state: 'Ready Task'
        }
      });
  }

  show_details_inProgress_task(index:number){
    let task_details = this.states[3].tasks[index];
    const dialogRef = this.dialog.open(ViewTaskDetialsDialogComponent,
      {
        data: {
          task: task_details, state: 'In Progress Task'
        }
      });
  }

  show_details_inReview_task(index:number){
    let task_details = this.states[4].tasks[index];
    const dialogRef = this.dialog.open(ViewTaskDetialsDialogComponent,
      {
        data: {
          task: task_details, state: 'In Review Task'
        }
      });
  }

  show_details_done_task(index:number){
    let task_details = this.states[5].tasks[index];
    const dialogRef = this.dialog.open(ViewTaskDetialsDialogComponent,
      {
        data: {
          task: task_details, state: 'Done Task'
        }
      });
  }


   // Create task from different state

  add_new_task_member(state_id:string, task_id:string, index:number){
    let task_members = this.new_tasks[index].assigned_to;
    const dialogRef = this.dialog.open(AddTaskMemberDialogComponent,
      {
        data: {
          Members: this.project_member, state: state_id, task: task_id, task_members: task_members
        }
      });
  }

  add_backlog_task_member(state_id:string, task_id:string, index:number){
    let task_members = this.backlog_tasks[index].assigned_to;
    const dialogRef = this.dialog.open(AddTaskMemberDialogComponent,
      {
        data: {
          Members: this.project_member, state: state_id, task: task_id, task_members: task_members
        }
      });
  }

  add_ready_task_member(state_id:string, task_id:string, index:number){
    let task_members = this.ready_tasks[index].assigned_to;
    const dialogRef = this.dialog.open(AddTaskMemberDialogComponent,
      {
        data: {
          Members: this.project_member, state: state_id, task: task_id, task_members: task_members
        }
      });
  }

  add_inProgress_task_member(state_id:string, task_id:string, index:number){
    let task_members = this.inProgress_tasks[index].assigned_to;
    const dialogRef = this.dialog.open(AddTaskMemberDialogComponent,
      {
        data: {
          Members: this.project_member, state: state_id, task: task_id, task_members: task_members
        }
      });
  }
  
  add_inReview_task_member(state_id:string, task_id:string, index:number){
    let task_members = this.inReview_tasks[index].assigned_to;
    const dialogRef = this.dialog.open(AddTaskMemberDialogComponent,
      {
        data: {
          Members: this.project_member, state: state_id, task: task_id, task_members: task_members
        }
      });
  }

  add_done_task_member(state_id:string, task_id:string, index:number){
    let task_members = this.done_tasks[index].assigned_to;
    const dialogRef = this.dialog.open(AddTaskMemberDialogComponent,
      {
        data: {
          Members: this.project_member, state: state_id, task: task_id, task_members: task_members
        }
      });
  }


  

}
