import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/service/project/project.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from '../../shared/dialog/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { CreateRolePriorityTechComponent } from '../../shared/dialog/create-role-priority-tech/create-role-priority-tech.component';
import { UpdateRolePriorityTechComponent } from '../../shared/dialog/update-role-priority-tech/update-role-priority-tech.component';
import { LoginService } from 'src/app/service/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  id = '632bce9992f84e13697a2e5b';
  roleColors = ['#FF9D66', '#70B0FF', '#FD8ADC', '#6BDAAE', '#74DDE5', '#F8BBE7', '#52BC93', '#678AF7', '#FFB020', '#B2A4FF', '#FFB4B4', '#FFDEB4'];
  priorityColors = ['#FFB020', '#6BDAAE', '#52BC93', '#678AF7'];
  technologyColors = ['#678AF7', '#74DDE5', '#FD8ADC', '#FF9D66', '#70B0FF', '#FFB020', '#F8BBE7', '#B2A4FF'];
  difficultyColors = ['#FFB020', '#6BDAAE', '#F8BBE7'];
  roles : any = [];
  priorities: any = [];
  technologies: any = [];
  dificulties: any = [];
  language_selector = false;
  lang: any;

  constructor(
    private project: ProjectService, 
    public dialog: MatDialog,
    private loginService: LoginService,
    private router: Router) {
      this.lang = sessionStorage.getItem('lang');

      if(this.lang){
        if(this.lang == "0"){
          this.language_selector = false;
        }
        else if(this.lang == "1"){
          this.language_selector = true;
        }
      }
      else{
        this.language_selector = false;
      }
   }

  ngOnInit(): void {

    this.loginService.IsLogin({}).subscribe((result) =>{
      if(result.isActive == false){
        this.router.navigate(['/']);
      }
    },
    (error) => {
      this.router.navigate(['/']);
    })


    this.project.show_all_role({"id":this.id}).subscribe((result)=>{
      if(result.status == 200){
        this.roles = result.body;
      }
    });

    this.project.show_Priorities({}).subscribe((result) =>{
      this.priorities = result.body;
    });

    this.project.show_all_technology({}).subscribe((result) =>{
      if(result.status == 200){
        this.technologies = result.body;
      }
    });

    this.project.show_deficulties({}).subscribe((result) =>{
      if(result.status == 200){
        this.dificulties = result.body;
      }
    });

   
  }

  openRoleDeleteDialog(role_id:string, index:number): void{
    // console.log(role_id)
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '350px',
      data: {id: role_id, status: 1, roles: this.roles, index: index}
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
    });
  }

  openPriorityDeleteDialog(priority_id, index){
    // console.log(priority_id);
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '350px',
      data: {id: priority_id, status: 2, priorities: this.priorities, index: index}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openTechDeleteDialog(tech_id, index){
    // console.log(tech_id);
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '350px',
      data: {id: tech_id, status: 3, technologies: this.technologies, index: index}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDificultyDeleteDialog(dificult_id: string, index:number){
    // console.log(dificult_id);
    // console.log(index);
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '350px',
      data: {id: dificult_id, status: 6, dificulties: this.dificulties, index: index}
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
    });
  }

 
  openAddROleDialog(){
    const dialogRef = this.dialog.open(CreateRolePriorityTechComponent, {
      width: '350px',
      data: {title:'Role',status: 1, roles: this.roles}
    });
  }

  openAddPriorityDialog(){
    const dialogRef = this.dialog.open(CreateRolePriorityTechComponent, {
      width: '350px',
      data: {title:'Priority' ,status: 2, priorities: this.priorities}
    });
  }

  openAddTechDialog(){
    const dialogRef = this.dialog.open(CreateRolePriorityTechComponent, {
      width: '350px',
      data: {title:'Technology' ,status: 3, technologies: this.technologies}
    });
  }

  openAddDificultyDialog(){
    const dialogRef = this.dialog.open(CreateRolePriorityTechComponent, {
      width: '350px',
      data: {title:'Dificulty Level' ,status: 4, dificulties: this.dificulties}
    });
  }

  openUpdateROleDialog(id:string, index:number){
    const dialogRef = this.dialog.open(UpdateRolePriorityTechComponent, {
      width: '350px',
      data: {title:'Role', status: 1, roles: this.roles, update_id: id, index:index }
    });
  }
  openUpdatePriorityDialog(id:string, index:number){
    const dialogRef = this.dialog.open(UpdateRolePriorityTechComponent, {
      width: '350px',
      data: {title:'Priority', status: 2, roles: this.priorities, update_id: id, index:index }
    });
  }
  openUpdateTechDialog(id:string, index:number){
    const dialogRef = this.dialog.open(UpdateRolePriorityTechComponent, {
      width: '350px',
      data: {title:'Technology', status: 3, roles: this.technologies, update_id: id, index:index}
    });
  }

  openUpdateDificultyDialog(id:string, index:number){
    const dialogRef = this.dialog.open(UpdateRolePriorityTechComponent, {
      width: '350px',
      data: {title:'Dificulty', status: 4, roles: this.dificulties, update_id: id, index:index}
    });
  }

}