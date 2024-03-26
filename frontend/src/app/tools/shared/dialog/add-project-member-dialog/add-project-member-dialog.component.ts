import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ProjectService } from 'src/app/service/project/project.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/service/employee/employee.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface DialogData { }

@Component({
  selector: 'app-add-project-member-dialog',
  templateUrl: './add-project-member-dialog.component.html',
  styleUrls: ['./add-project-member-dialog.component.css']
})
export class AddProjectMemberDialogComponent implements OnInit {

  addMemberForm = new FormGroup({
    member_id : new FormControl('',[Validators.required]),
    role_id : new FormControl('',[Validators.required]),
  });

  employees: any;
  project_id = this.data["project_id"];
  projects = this.data["projects"];
  index = this.data["index"];

  constructor(
    private projectService: ProjectService,
    private employeeService: EmployeeService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AddProjectMemberDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) { }

  ngOnInit(): void {
    console.log(this.project_id);
    console.log(this.index);
    console.log(this.projects);
    this.employeeService.show_all_emp({}).subscribe((result) =>{
      if(result.status == 200){
        console.log('+ all emp', result.body);
        this.employees = result.body;
      }
    });
  }

  addMember(){
    // console.log('to a' + this.addMemberForm.value.member_id);
    // console.log('to ad' + this.addMemberForm.value.role_id);
    // console.log('to add' + this.project_id);
    let member_id = this.addMemberForm.value.member_id;
    let role_id = this.addMemberForm.value.role_id;

      this.projectService.add_member({
        "employee": member_id,
        "role": role_id,
        "project": this.project_id
      }).subscribe((result) => {
        
      if(result.status == 200){
        console.log('add' + result.body);
        let new_member = result.body;
        this.projects[this.index].member.push(new_member);
        this.dialog.closeAll();
      }
      if (result.status == 400) {
        //console.log('add error');
        this.snackBar.open('Member already exists in this project!', 'Close', {
          duration: 3000,
          horizontalPosition: 'start',
          verticalPosition: 'bottom'
        });

        this.dialogRef.close(); // Close the dialog
      }
    })
  }
}