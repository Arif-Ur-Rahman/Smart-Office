import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/service/project/project.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

export interface DialogData { }

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.css']
})
export class UpdateProjectComponent implements OnInit {

  project_id = this.data["id"];
  project = this.data["project"];
  projects = this.data["projects"];
  index = this.data["index"];

  technologies: any;
  priorities: any;
  statuses: any;

  language_selector = false;
  lang: any;

  constructor(
    private projectService: ProjectService,
    public dialogRef: MatDialogRef<UpdateProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  ngOnInit(): void {
    // this.projectService.show_all_technology({}).subscribe((result) => {
    //   if(result.status == 200){
    //     this.technologies = result.body;
    //   }
    // });

    // this.projectService.show_Priorities({}).subscribe((result) => {
    //   if(result.status == 200){
    //     this.priorities = result.body;
    //   }
    // });

    // this.projectService.show_status({}).subscribe((result) => {
    //   if(result.status == 200){
    //     this.statuses = result.body;
    //   }
    // });

  }

  gitLinkFormControl = new FormControl('', [
    Validators.pattern('^(https?:\\/\\/)?([\\da-z\\.-]+)\\.([a-z\\.]{2,6})([\\/\\w \\.-]*)*\\/?$')
  ]);
  

  updateProject(data:any){
    // console.log(data);

    let title = data.project_title;
    let version = data.version;
    let git_link = data.git_link;
    let start_date = data.start_date;
    let end_date = data.end_date;
    let technology = data.technology;
    let priority = data.priority;
    let progress_percentage = data.progress_percentage;
    let project_status = data.project_status;
    let summary = data.summary;
    let members = this.project.assign_members;

    if(title == ''){
       title = this.project.title;
    }

    if(version == ''){
      version = this.project.current_version;
    }

    if(git_link == ''){
      git_link = this.project.git_link;
    }

    if(start_date == ''){
      start_date = this.project.start_date;
    }

    if(end_date == ''){
      end_date = this.project.end_date;
    }

    if(technology == ''){
      technology = this.project.technologies;
    }

    if(priority == ''){
      priority = this.project.priority_level;
    }

    if(progress_percentage == ''){
      progress_percentage = this.project.progress_percentage;
    }

    if(project_status == ''){
      project_status = this.project.current_status;
    }

    if(summary == ''){
      summary = this.project.description;
    }


    this.projectService.update_project({
      "id":this.project_id, 
      "title":title, 
      "description":summary, 
      "version_number":version, 
      "states":project_status,
      "git_link":git_link,
      "start_date": start_date,
      "end_date": end_date,
      "progress_percentage": progress_percentage,
      "member": members,
      "priority": priority,
      "technologies": technology
    }).subscribe((result)=>{
      if(result.status == 200){
        let update_project = result.body;
        this.projects[this.index] = update_project;
        window.location.reload();
      }
    })
  }

}
