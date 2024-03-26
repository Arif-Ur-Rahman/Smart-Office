import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ProjectService } from 'src/app/service/project/project.service';
import { EmployeeService } from 'src/app/service/employee/employee.service';
import { Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface DialogData { }

@Component({
  selector: 'app-add-member-dialog',
  templateUrl: './add-member-dialog.component.html',
  styleUrls: ['./add-member-dialog.component.css']
})
export class AddMemberDialogComponent implements OnInit {

  addMemberForm = new FormGroup({
    member_id : new FormControl('',[Validators.required]),
    role_id : new FormControl('',[Validators.required]),
  });

  roles: any;
  employees: any;
  check_member_flag = false;
  language_selector = false;
  lang: any;

  // type check_member_flag = true | false;

  
  id = '632bce9992f84e13697a2e5b';

  project_id = this.data["project_id"];
  projects = this.data["projects"];
  index = this.data["index"];

  number_of_members =this.projects[this.index].assign_members.length;

  constructor( 
    private projectService: ProjectService, 
    private employeeService: EmployeeService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AddMemberDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      
      console.log(this.project_id);
      console.log(this.index);
      console.log(this.projects);
  }

  ngOnInit(): void {
    // this.projectService.show_all_role({"id":this.id}).subscribe((result) =>{
    //   if(result.status == 200){
    //     console.log('all role', result.body)
    //     this.roles = result.body;
    //   }
    // });
    // this.employeeService.show_all_emp({}).subscribe((result) =>{
    //   if(result.status == 200){
    //     console.log('all emp', result.body)
    //     this.employees = result.body;
    //   }
    // });
  }

  addMember(){
    let member_id = this.addMemberForm.value.member_id;
    let role_id = this.addMemberForm.value.role_id;

    for(let i=0; i<this.number_of_members; i++){
      if(this.projects[this.index].assign_members[i].employee._id == member_id){
        this.check_member_flag = true;
      }
    }

    if(this.check_member_flag){
      this.check_member_flag = true;
    }
    else{
      this.projectService.add_member({
        "employee": member_id, 
        "role":role_id, 
        "project": this.project_id
      }).subscribe((result) => {
        
      if(result.status == 200){
        console.log('add' + result.body);
        this.dialog.closeAll();
        let new_member = result.body;
        this.projects[this.index].assign_members.push(new_member);
        this.snackBar.open('Member assigned into project successfully', 'Close', {
          duration: 3000,
          horizontalPosition: 'start',
          verticalPosition: 'bottom'
        });
      }
    })
    }

    
  }










 

}
