import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/service/project/project.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-edit-details-project-dialog',
  templateUrl: './edit-details-project-dialog.component.html',
  styleUrls: ['./edit-details-project-dialog.component.css']
})

export class EditDetailsProjectDialogComponent implements OnInit {
  statuss:any;
  employees: any;
  message: boolean;

  projects = this.data.projects;

  createProjectForm: FormGroup;


  get project_title() {
    return this.createProjectForm.get('project_title');
  }
  get git_link() {
    return this.createProjectForm.get('git_link');
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private Project: ProjectService,
    private readonly fb: FormBuilder,
    public dialog: MatDialog){
  }

  ngOnInit(): void {

    this.createProjectForm = this.fb.group({
      project_title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      version: [null, [Validators.required]],
      git_link: ['',
      [Validators.pattern('^(https?:\\/\\/)?([\\da-z\\.-]+)\\.([a-z\\.]{2,6})([\\/\\w \\.-]*)*\\/?$')],
      [Validators.required]
    ],
      start_date: [null, [Validators.required]],
      end_date: [null, [Validators.required]],
      progress_percentage: [null, [Validators.required]],
      technology: ['', [Validators.required]],
      project_status: ['', [Validators.required]],
      priority: ['', [Validators.required]]
    });

    // this.createProjectForm = new FormGroup(
    //   {
    //     project_title: new FormControl('',[Validators.required]),
    //     version: new FormControl(null,[Validators.required]),
    //     start_date: new FormControl(null,[Validators.required]),
    //     end_date: new FormControl(null,[Validators.required]),
    //     progress_percentage: new FormControl('',[Validators.required]),
    //     technology: new FormControl('',[Validators.required]),
    //     project_status: new FormControl('',[Validators.required]),
    //     priority: new FormControl('',[Validators.required]),
    //     description: new FormControl('',[Validators.required]),
    //     git_link: new FormControl('',[Validators.required])
    //   }
    // )

}

  addProject() {
    const data = this.createProjectForm.value;
    
    const dataToSubmit = {
      "title":data.project_title,
      "description":data.description,
      "version_number":data.version,
      "git_link":data.git_link,
      "start_date": data.start_date,
      "end_date": data.end_date,
      "progress_percentage": data.progress_percentage,
      "technologies": data.technology,
      "states": data.project_status,
      "priority": data.priority
    }

    console.log('Form submitted as:', dataToSubmit);

    this.Project.create_project(dataToSubmit).subscribe((result)=>{
        if(result.status == 200){
          let newProject = result.body;
          this.projects.push(newProject);
          window.location.reload();
        }
      }
    );
  }
  
}
