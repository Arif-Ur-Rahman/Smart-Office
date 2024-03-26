import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/service/employee/employee.service';
import { Inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

export interface DialogData {}

@Component({
  selector: 'app-delete-confirm-dialog-emp-module',
  templateUrl: './delete-confirm-dialog-emp-module.component.html',
  styleUrls: ['./delete-confirm-dialog-emp-module.component.css'],
})
export class DeleteConfirmDialogEmpModuleComponent implements OnInit {
  language_selector = false;
  lang: any; //1

  emp_id = this.data['emp_id'];
  id = this.data['id'];
  status = this.data['status'];
  index = this.data['index'];
  designation = this.data['designation']
  department = this.data['department']
  technologies = this.data['technologies']
  access = this.data['access']

  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmDialogEmpModuleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private employeeService: EmployeeService,
    private router: Router
  ) { console.log(this.status)}

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  delete() {
    this.employeeService.delete_employee({"id":this.emp_id}).subscribe((result) => {
      // console.log(result)
      if(result.status==200){
        // this.router.navigate(['/tools/employee/all-employee']); 
        window.location.reload();
      }
    });

    
  }
}
