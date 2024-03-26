import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ProjectService } from 'src/app/service/project/project.service';
import { EmployeeService } from 'src/app/service/employee/employee.service';
import { Inject } from '@angular/core';

export interface DialogData { }

@Component({
  selector: 'app-add-task-member-dialog',
  templateUrl: './add-task-member-dialog.component.html',
  styleUrls: ['./add-task-member-dialog.component.css']
})
export class AddTaskMemberDialogComponent implements OnInit {

  project_members = this.data["Members"];
  task_id = this.data["task"];
  task_members = this.data["task_members"];
  language_selector = false;
  lang: any;
  new_members:any;

  addMemberForm = new FormGroup({
    member_id : new FormControl('',[Validators.required])
  });

  constructor( 
    private projectService: ProjectService, 
    private employeeService: EmployeeService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AddTaskMemberDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData){
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

  }

  ngOnInit(): void {
    this.new_members = this.project_members;

    for(let i=0; i<this.task_members.length; i++)
    {
      this.new_members = this.new_members.filter((obj:any) => {
        return obj._id !== this.task_members[i]._id;
      });
    }
  }


  addMember(){
    // console.log(this.addMemberForm.value.member_id);
    // console.log(this.task_id);

    let members = this.addMemberForm.value.member_id;

    this.projectService.add_task_member({"id":this.task_id, "memberId": members}).subscribe((result) => {
      // console.log(result);
      if(result.status == 200){
        this.dialog.closeAll();
      }
    });
  }

}
