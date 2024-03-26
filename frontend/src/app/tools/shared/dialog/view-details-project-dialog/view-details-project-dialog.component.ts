import { Component, OnInit,Inject  } from '@angular/core';
import {MatDialog,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';
import { LoginService } from 'src/app/service/login/login.service';

@Component({
  selector: 'app-view-details-project-dialog',
  templateUrl: './view-details-project-dialog.component.html',
  styleUrls: ['./view-details-project-dialog.component.css']
})
export class ViewDetailsProjectDialogComponent implements OnInit {

  pipe = new DatePipe('en-US');
  project_id = this.data["id"];
  project = this.data.project;
  projects: any;
  admin: boolean;
  language_selector = false;
  lang: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private loginService: LoginService) {
      loginService.IsLogin({}).subscribe((result) => {
        if(result.status == 200){
          this.admin = result.isAdmin;
        }      
      })
    }

  ngOnInit(): void {
    console.log(this.project)
  }

  deleteProjectMember(id:string, index:number){
    console.log("deleteProjectMember member id", id);
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent,
      {
        width: 'auto',
        height: 'auto',
        data: {
          // status:7, id:id, project: this.project, index:index
          status:7, id:id, project_id: this.project_id, index:index
        }
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result === true) {
          this.project.member.splice(index, 1);
          this.project.next(this.project); // emit updated project data
        }
      });
  }

}
