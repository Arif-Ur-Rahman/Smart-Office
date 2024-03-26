import { Component, OnInit} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {EmployeeService} from '../../../service/employee/employee.service';

import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { Router } from '@angular/router';
import { ScheduleDialogComponent } from '../schedule-dialog/schedule-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  profile: any;

  id = sessionStorage.getItem('id');

  constructor(
    private employee: EmployeeService, 
    private dialog: MatDialog, 
    private router: Router) {}

  ngOnInit(): void {
    this.employee.show_emp_profile({"id":this.id}).subscribe((result)=>{
      this.profile = result.body;
    });
  }

  openScheduleDialog() {
    const dialogRef = this.dialog.open(ScheduleDialogComponent, {
      width: 'auto',
      height: 'auto',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.router.navigate(['/schedule/schedule', result.project]);
      }
    });
  }
}
