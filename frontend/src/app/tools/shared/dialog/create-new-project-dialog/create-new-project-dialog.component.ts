import { Component, OnInit,ErrorHandler } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from 'src/app/service/project/project.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-new-project-dialog',
  templateUrl: './create-new-project-dialog.component.html',
  styleUrls: ['./create-new-project-dialog.component.css']
})
export class CreateNewProjectDialogComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private ProjectService: ProjectService,
    private snackBar: MatSnackBar,
    private errorHandler: ErrorHandler,
    public dialogRef: MatDialogRef<CreateNewProjectDialogComponent>) {
    }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      version_number: ['', Validators.required],
      git_link: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      progress_percentage: ['', Validators.required],
      technologies: ['', Validators.required],
      status: ['', Validators.required],
      priority: ['', Validators.required]
    });
  }

  createNewProject() {
    console.log("my form value", this.form.value);

    if (this.form.valid) {
      this.ProjectService.create_project(this.form.value).subscribe((response)=>{
        if(response.status == 200){
          this.snackBar.open('Project created successfully', 'Close', {
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
