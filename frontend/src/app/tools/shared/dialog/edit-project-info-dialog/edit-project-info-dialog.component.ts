import { Component, OnInit,ErrorHandler, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from 'src/app/service/project/project.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface DialogData { }

@Component({
  selector: 'app-edit-project-info-dialog',
  templateUrl: './edit-project-info-dialog.component.html',
  styleUrls: ['./edit-project-info-dialog.component.css']
})

export class EditProjectInfoDialogComponent implements OnInit {
  form: FormGroup;
  project_id = this.data["id"];
  project = this.data["project"];

  constructor(
    private formBuilder: FormBuilder,
    private ProjectService: ProjectService,
    private snackBar: MatSnackBar,
    private errorHandler: ErrorHandler,
    public dialogRef: MatDialogRef<EditProjectInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: [''],
      description: [''],
      version_number: [''],
      git_link: [''],
      start_date: [''],
      end_date: [''],
      progress_percentage: [''],
      technologies: [''],
      status: [''],
      priority: ['']
    });
  }

  updateProject(): void {

    console.log("I need value", this.form.value);

    if (this.form.valid) {
      const dataToSubmit = {
        "id": this.project_id, 
        "title": this.form.value.title,
        "description": this.form.value.description,
        "version_number": this.form.value.version_number,
        "git_link":this.form.value.git_link,
        "start_date": this.form.value.start_date,
        "end_date": this.form.value.end_date,
        "progress_percentage": this.form.value.progress_percentage,
        "technologies": this.form.value.technologies,
        "status": this.form.value.status,
        "priority": this.form.value.priority
      }

      console.log("submit this" , dataToSubmit);

      this.ProjectService.update_project(dataToSubmit).subscribe((response)=>{
        if(response.status == 200){
          this.snackBar.open('Project updated successfully', 'Close', {
            duration: 3000,
            horizontalPosition: 'start',
            verticalPosition: 'bottom'
          });

          this.dialogRef.close(); // Close the dialog
        }
      });
    }
  }

  private handleError(error: any): void {
    this.errorHandler.handleError(error);
    console.error('An error occurred:', error);
  }
  
  get title() { return this.form.get('title'); }
  get description() { return this.form.get('description'); }
  get version_number() { return this.form.get('version_number'); }
  get git_link() { return this.form.get('git_link'); }
  get start_date() { return this.form.get('start_date'); }
  get end_date() { return this.form.get('end_date'); }
  get progress_percentage() { return this.form.get('progress_percentage'); }
  get technologies() { return this.form.get('technologies'); }
  get status() { return this.form.get('status'); }
  get priority() { return this.form.get('priority'); }

}
