import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {CdkDragDrop,CdkDragEnter,CdkDragMove, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { CreateEditTaskDialogComponent } from '../../shared/dialog/create-edit-task-dialog/create-edit-task-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from '../../shared/dialog/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { UpdateTaskComponent } from '../../shared/dialog/update-task/update-task.component';
import { ProjectService } from 'src/app/service/project/project.service';
import { ViewTaskDetialsDialogComponent } from '../../shared/dialog/view-task-detials-dialog/view-task-detials-dialog.component';
import { AddTaskMemberDialogComponent } from '../../shared/dialog/add-task-member-dialog/add-task-member-dialog.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  project_id:any;
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
  task_move_msg : boolean = false;


  constructor(private route: ActivatedRoute, 
    private projectService: ProjectService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.project_id = this.route.snapshot.paramMap.get('id');
    // console.log(this.project_id);

    this.projectService.show_single_project_info({"id": this.project_id}).subscribe((result) => {
      console.log(result.body[0].member);
        this.project = result.body[0];
        this.project_members = result.body[0].member;
    })


    this.projectService.show_project_new_tasks({"project_id": this.project_id}).subscribe((result) => {
      // console.log(result);
        this.new_tasks = result.body;
    })

    this.projectService.show_project_backlog_tasks({"project_id": this.project_id}).subscribe((result) => {
      // console.log(result);
      this.backlog_tasks = result.body;
    })

    this.projectService.show_project_ready_tasks({"project_id": this.project_id}).subscribe((result) => {
      // console.log(result);
      this.ready_tasks = result.body;
    })

    this.projectService.show_project_InProgress_tasks({"project_id": this.project_id}).subscribe((result) => {
      // console.log(result);
      this.inProgress_tasks = result.body;
    })

    this.projectService.show_project_InReview_tasks({"project_id": this.project_id}).subscribe((result) => {
      // console.log(result);
      this.inReview_tasks = result.body;
    })

    this.projectService.show_project_done_tasks({"project_id": this.project_id}).subscribe((result) => {
      // console.log(result);
      this.done_tasks = result.body;
    })
  }

  closeAlert(){
    this.task_create_msg  = ! this.task_create_msg;
  }

  closeTaskMoveAlert(){
    this.task_move_msg  = ! this.task_move_msg;
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


    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex,
    );
    
    this.projectService.moves_task({
      "id": previous_task_id,
      "state":this.state
    }).subscribe((result) => {
      // console.log(result);
      if(result.status == 200){
        this.task_move_msg = true;
      }
    })

    
  
   
    
    
  }



  add_new_task(): void{
    const dialogRef = this.dialog.open(CreateEditTaskDialogComponent,
      {
        data: {
          members: this.project_members, project_id: this.project_id
         }
      });

      dialogRef.afterClosed().subscribe(result => {
  
        console.log('Dialog closed with result:', result);

        if(result){
          this.new_tasks.push(result);
          this.new_tasks = [...this.new_tasks];
          this.task_create_msg =true;
        }
      });
  }


  edit_task(task_id: string, index: number): void{
    const dialogRef = this.dialog.open(UpdateTaskComponent,
      {
        data: {
          task_id: task_id, project_id: this.project_id
         }
      });

    dialogRef.afterClosed().subscribe(result => {
  
      console.log('Dialog closed with result:', result);
      if(result){
        // window.location.reload();
      }
        
    });
  }

  delete_task(task_id: string, index: number){
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent,
      {
        data: {
          task_id: task_id,status:5
         }
      });

      dialogRef.afterClosed().subscribe(result => {
  
        // console.log('Dialog closed with result:', result);

        if(result){
          window.location.reload();
        }

        
      });
  }

  show_details_task(task_id: string, index: number){
    // console.log(task_id);

    const dialogRef = this.dialog.open(ViewTaskDetialsDialogComponent,
      {
        data: {
          task_id: task_id
         }
      });
  }

  

}
