import { Component, OnInit } from '@angular/core';
import {EmployeeService} from '../../../service/employee/employee.service';
import { ProjectService } from 'src/app/service/project/project.service';
import { LoginService } from 'src/app/service/login/login.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  language_selector = false;
  lang: any; //1
  pipe = new DatePipe('en-US');
  profile: any;
  projects: any;
  showSpinner = false;

  // access_token = this.cookieService.get('access_token');
  // id = this.cookieService.get('id');
  id = sessionStorage.getItem('id');

  
  constructor( 
    private employee: EmployeeService,
    private projectService: ProjectService,
    private loginService: LoginService,
    private router: Router) {

      this.loginService.IsLogin({}).subscribe((result) =>{
        if(result.isActive == false){
          this.router.navigate(['/']);
        }
      },
      // (error) => {
      //   this.router.navigate(['/']);
      // }
      )

   }

  ngOnInit(): void {
    this.lang = sessionStorage.getItem('lang'); //2

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





    this.employee.show_emp_profile({"id":this.id}).subscribe((result)=>{
      this.profile = result.body;
    });

    this.projectService.show_my_project({"employeeId":this.id}).subscribe((result) =>{
      this.projects = result.body;
    })
  }

  updateEmpData(data:any){
    // console.log(data);
  }

  

}

