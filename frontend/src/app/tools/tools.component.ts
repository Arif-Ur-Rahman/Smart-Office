import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../service/login/login.service';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./tools.component.css']
})
export class ToolsComponent implements OnInit {

  current_url : any;

  closeResult: string| any;

  isExpanded: boolean = false;

  language_selector = false;

  lang: any;

  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

  public showContainerBox: boolean = false;

  constructor(
    private router: Router, 
    private loginService: LoginService) {

    let url = this.router.url;

    // console.log(url);

    let splitted_url = url.split("/")[1];
    let splitted_url_2 = url.split("/")[2];
    
    this.current_url = splitted_url;

    this.current_url = this.router.url;

    // console.log(splitted_url);
    // console.log(splitted_url_2);

    if(splitted_url == 'tools' && splitted_url_2 =='website-dashboard'){
      // console.log('website Dashboard sidebar');
      this.current_url = "Website Dashboard";
    }

    else if(splitted_url == 'tools' && splitted_url_2 =='ToDo'){
      // console.log('ToDo module sidebar');
      this.current_url = "ToDo";
    }

    else if(splitted_url == 'tools' && splitted_url_2 =='notes'){
      // console.log('Notes module sidebar');
      this.current_url = "Notes";
    }

    else if(splitted_url == 'tools' && splitted_url_2 =='idea'){
      // console.log('idea module sidebar');
      this.current_url = "Idea";
    }

    else if(splitted_url == 'tools' && splitted_url_2 =='asset'){
      // console.log('asset module sidebar');
      this.current_url = "Asset";
    }

    else if(splitted_url == 'tools' && splitted_url_2 =='whiteBoard'){
      // console.log('whiteBoard module sidebar');
      this.current_url = "White Board";
    }

    else if(splitted_url == 'tools' && splitted_url_2 =='leave'){
      // console.log('leave module sidebar');
      this.current_url = "Leave";
    } 

    else if(splitted_url == 'tools' && splitted_url_2 =='health'){
      // console.log('health module sidebar');
      this.current_url = "Health";
    }

    else if(splitted_url == 'tools' && splitted_url_2 =='employee'){
      // console.log('employee module sidebar');
      this.current_url = "Employee";
    }

    else if(splitted_url == 'tools' && splitted_url_2 =='discussion'){
      // console.log('discussion module sidebar');
      this.current_url = "Discussion";
    }

    else if(splitted_url == 'tools' && splitted_url_2 =='project'){
      // console.log('project module sidebar');
      this.current_url = "Project";
    }

    else if(splitted_url == 'tools' && splitted_url_2 =='attendance'){
      // console.log('attendance module sidebar');
      this.current_url = "Attendance";
    }
   
    
    else if(splitted_url == 'tools' && splitted_url_2 =='rules-regulations'){
      // console.log('rules-regulations module sidebar');
      this.current_url = "Rules & Regulations";
    }

    else if(splitted_url == 'tools' && splitted_url_2 =='employyeeEvaluation'){
      // console.log('employyeeEvaluation module sidebar');
      this.current_url = "employyeeEvaluation";
    }


    else{
      // console.log('tools Dashboard sidebar');
      this.current_url = "Smart Office Management System";
    }
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
  }

  handleContainerBox(): void {
    this.showContainerBox = !this.showContainerBox;
  }

  

  // for modal view

  

  logout(): void{
    this.loginService.logOut({}).subscribe((result) => {
      if(result.status == 200){
        sessionStorage.removeItem('access_token');
        sessionStorage.removeItem('id');
        this.router.navigate(['/']);
      }
    },
    (error:any) => {
      sessionStorage.removeItem('access_token');
        sessionStorage.removeItem('id');
        this.router.navigate(['/']);
    })
  }


  changeLang(){

    this.lang = sessionStorage.getItem('lang');

    if(this.lang){
      if(this.lang == "0"){
        sessionStorage.removeItem('lang');
        sessionStorage.setItem('lang', '1');
        this.language_selector = true;
        window.location.reload();
      }
      else if(this.lang == "1"){
        sessionStorage.removeItem('lang');
        sessionStorage.setItem('lang', '0');
        this.language_selector = false;
        window.location.reload();
      }
    }
    else{
      sessionStorage.setItem('lang', '1');
      this.language_selector = true;
      window.location.reload();
    }
  }



}
