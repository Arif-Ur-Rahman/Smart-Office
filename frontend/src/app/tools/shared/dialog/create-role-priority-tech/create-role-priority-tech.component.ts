import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormControlName, Validators  } from '@angular/forms';
import { ProjectService } from 'src/app/service/project/project.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';

export interface DialogData { }

@Component({
  selector: 'app-create-role-priority-tech',
  templateUrl: './create-role-priority-tech.component.html',
  styleUrls: ['./create-role-priority-tech.component.css']
})
export class CreateRolePriorityTechComponent implements OnInit {

  status = this.data["status"];
  title = this.data["title"];

  roles = this.data["roles"];
  priorities = this.data["priorities"];
  technologies = this.data["technologies"];
  dificulties = this.data["dificulties"];

  language_selector = false;
  lang: any;

  module_id = "632bce9992f84e13697a2e5b";

  createRoleForm = new FormGroup({
    title: new FormControl('',[Validators.required]) 
  });

  constructor(
    private projectService: ProjectService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<CreateRolePriorityTechComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {

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

  }


  Create(){
    if(this.status == 1){
      let input_title = this.createRoleForm.value.title;
      this.projectService.add_Role({"module": this.module_id, "title": input_title}).subscribe((result) =>{
        if(result.status == 200){
          this.dialog.closeAll();
          let new_role = result.body;
          this.roles.push(new_role);
        }
      });
    }

    else if(this.status == 2){
      let title = this.createRoleForm.value.title;
      this.projectService.add_Priority({"title": title}).subscribe((result) =>{
        if(result.status == 200){
          this.dialog.closeAll();
          let new_priority = result.body;
          this.priorities.push(new_priority);
        }
      });
    }

    else if(this.status == 3){
      let title = this.createRoleForm.value.title;
      this.projectService.add_Tech({"title": title}).subscribe((result) =>{
        if(result.status == 200){
          this.dialog.closeAll();
          let new_technology = result.body;
          this.technologies.push(new_technology);
        }
      });
    }

    else if(this.status == 4){
      let title = this.createRoleForm.value.title;
      this.projectService.add_dificulty({"title": title}).subscribe((result) =>{
        if(result.status == 200){
          this.dialog.closeAll();
          let new_dificulty = result.body;
          this.dificulties.push(new_dificulty);
        }
      });
    }


    
  }

}
