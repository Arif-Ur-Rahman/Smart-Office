import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/service/project/project.service';

@Component({
  selector: 'app-schedule-dialog',
  templateUrl: './schedule-dialog.component.html',
  styleUrls: ['./schedule-dialog.component.css']
})
export class ScheduleDialogComponent implements OnInit {
  projects: any[] = [];
  selectedProject: any;
  empty_project:boolean = false;

  constructor(
    private projectService: ProjectService,
    private router: Router,
    public dialogRef: MatDialogRef<ScheduleDialogComponent>
    ) {}

  ngOnInit(): void {
    this.projectService.show_all_project({}).subscribe((result)=>{
      console.log(result.body);
      this.projects = result.body;
      if(this.projects.length == 0){
        this.empty_project = true;
      }
      });
  }

  onProjectChange(event: MatSelectChange) {
    this.selectedProject = event.value;
    console.log("schedule project id", this.selectedProject);
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  viewDetails(project_id: any): void {
        this.router.navigate(['/tools/project/schedule/' + project_id]);
        this.dialogRef.close({ project: project_id });
  }
  // onSubmitClick(): void {
  //   this.dialogRef.close({ project: this.selectedProject });
  //   this.dialogRef.afterClosed().subscribe((result) => {
  //     if (result) {
  //       const projectId = result.project;
  //       this.router.navigate(['/tools/project/schedule/' + this.selectedProject]);
  //     }
  //   });
  // }

}
