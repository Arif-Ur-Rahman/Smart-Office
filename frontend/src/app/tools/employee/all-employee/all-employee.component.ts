import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEmployeeComponent } from '../../shared/dialog/add-employee/add-employee.component';
import { UpdateEmployeeDialogComponent } from '../../shared/dialog/update-employee-dialog/update-employee-dialog.component';
import { EmployeeService } from '../../../service/employee/employee.service';

import { Names } from 'src/app/enum/names';
import { LoginService } from 'src/app/service/login/login.service';
import { Router } from '@angular/router';

// import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ShowEmployeeDetailsComponent } from '../../shared/dialog/show-employee-details/show-employee-details.component';
import { DeleteConfirmDialogEmpModuleComponent } from '../../shared/dialog/delete-confirm-dialog-emp-module/delete-confirm-dialog-emp-module.component';

export interface UserData {
  serial: number;
  name: string;
}

@Component({
  selector: 'app-all-employee',
  templateUrl: './all-employee.component.html',
  styleUrls: ['./all-employee.component.css'],
  providers: [],
})

export class AllEmployeeComponent implements AfterViewInit {
  base_url = Names.db_name;
  isClicked: string = '';
  content: any;
  employees: any;
  departments: [];
  showSpinner = false;
  img = '32832.66308470842_1666242098613_nature.jpg';
  displayedColumns: string[] = [
    'serial',
    'name',
    'designation',
    'department',
    'joiningdate',
    'phone',
    'email',
    'action',
  ];
  dataSource: MatTableDataSource<UserData>;
  currentPageIndex = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    private employeeService: EmployeeService,
    private loginService: LoginService,
    private router: Router
  ) {
    this.employeeService.show_all_emp({}).subscribe((result) => {
      console.log(result.body);
      this.dataSource = result.body;
    });

    // const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    // this.dataSource = new MatTableDataSource(users);
  }

  ngAfterViewInit(): void {
    {
     
    }

    // this.loginService.IsLogin({}).subscribe((result) =>{
    //   if(result.isActive == false){
    //     this.router.navigate(['/']);
    //   }
    // },
    // (error) => {
    //   this.router.navigate(['/']);
    // })

    this.employeeService.show_all_emp({}).subscribe((result) => {
      console.log(result.body);
      this.employees = result.body;
      this.dataSource = new MatTableDataSource<UserData>(result.body)
      this.dataSource.paginator = this.paginator;
    });
  }

  createEmployeeDialogOpen(data: any) {
    if (data == 'open_modal') {
      const dialogRef = this.dialog.open(AddEmployeeComponent, {
        data: {
          employees: this.employees,
        },
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  updateEmpInfo(emp_id: string) {
    console.log(emp_id);
    const dialogRef = this.dialog.open(UpdateEmployeeDialogComponent, {
      data: {
        employee_id: emp_id,
      },
    });
  }

  showEmployeeDetails(emp_id: string) {
    console.log(emp_id);
    const dialogRef = this.dialog.open(ShowEmployeeDetailsComponent, {
      // width: '700px',
      data: {
        employee_id: emp_id,
      },
    });
    
  }
  openDeleteDialog(employee_id:any, index:any){
    console.log('This is' ,employee_id);
    this.dialog.open(DeleteConfirmDialogEmpModuleComponent,
      {
        width: 'auto',
        height: 'auto',
        data: {
          emp_id: employee_id
        }
      });
  }
}

/** Builds and returns a new User. */