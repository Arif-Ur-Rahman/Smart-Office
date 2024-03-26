import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/service/project/project.service';
import {MatPaginator} from '@angular/material/paginator';
import { LoginService } from 'src/app/service/login/login.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export interface ScheduleData {
  id: string;
  title: string;
  version: string;
  deadline: string;
  priority: string;
  status: string;
}
const ELEMENT_DATA: ScheduleData[] = [];

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  fileName = "samplesheet.xlsx";

  admin: boolean;

  schedules: any;
  empty_schedule: boolean = false;
  project_id: any;

  scheuleDisplayedColumns: string[] = ['serial', 'title', 'status', 'assigned_by', 'assigned_to', 'start_date', 'end_date', 'progress', 'action'];
  scheduleDataSource: any;
  filterValue = '';

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private apiService: ProjectService,
    private loginService: LoginService,
    public dialog: MatDialog
  ) {
    this.loginService.IsLogin({}).subscribe((result) => {
      if(result.status == 200){
        this.admin = result.isAdmin;
      }
    });
  }

  ngOnInit(): void {
    this.project_id = this.route.snapshot.paramMap.get('id');
    console.log(this.project_id);

    this.apiService.show_task_under_project_info({"project_id": this.project_id}).subscribe((response)=>{
      console.log(response.body);
      this.schedules = response?.body;
      this.scheduleDataSource = new MatTableDataSource<ScheduleData>(response.body);
      this.scheduleDataSource.paginator = this.scheduleDataSource;
      // Set the paginator's pageIndex property to the last page index
      const lastPageIndex = Math.ceil(this.scheduleDataSource.length / this.paginator.pageSize) - 1;
      this.paginator.pageIndex = lastPageIndex;
  
      if(this.schedules?.length == 0){
        this.empty_schedule = true;
      }
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.scheduleDataSource.filter = filterValue;
  }

  async downloadXlsx(response: any) {
    const fileName = this.project_id + '.xlsx';
    const data = response.body;
  
    // Convert data to XLSX format using the XLSX library
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  
    // Save the XLSX file using the FileSaver library
    const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([buffer], { type: 'application/octet-stream' });
    saveAs(blob, fileName);
  }

  exportexcel(): void{
    // let element = document.getElementById('excel-table')
    // const ws:XLSX.WorkSheet = XLSX.utils.table_to_sheet(element)
    // const wb:XLSX.WorkBook = XLSX.utils.book_new()
    // XLSX.utils.book_append_sheet(wb,ws,'sheet1')
    // XLSX.writeFile(wb,this.fileName)
    this.apiService.export_xlsx({"project_id": this.project_id}).subscribe((response)=>{
      console.log(response.body);
      this.downloadXlsx(response);
      });

  }

}
