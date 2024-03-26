import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from 'src/app/service/login/login.service';
@Component({
  selector: 'app-project-sidebar',
  templateUrl: './project-sidebar.component.html',
  styleUrls: ['./project-sidebar.component.css']
})
export class ProjectSidebarComponent implements OnInit {

  @Input() show_sidebar:boolean |undefined;

  admin = false;
  language_selector = false;
  lang: any;

  constructor(private loginService: LoginService) {
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
      if(result.isAdmin == true){
        this.admin =true;
      }
    },
    (error) => {
      this.admin = false;
    })
  }

}
