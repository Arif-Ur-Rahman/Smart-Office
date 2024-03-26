import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { LoginService } from 'src/app/service/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;

  loginForm: FormGroup;
  showPassword = false;

  login_error = false;

  error_message: string='';

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required
  ]);

  constructor(
    private loginService:LoginService,
    public dialog: MatDialog,
    private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup(
      {
        email: new FormControl('',[Validators.required, Validators.email]),
        password: new FormControl('',[Validators.required]),
      }
    )
  }


  onLogin()
  {

  }

  login(){
    console.log(this.emailFormControl.value);
    console.log(this.passwordFormControl.value);

    let email = this.emailFormControl.value;
    let password = this.passwordFormControl.value;

    if(email != '' && password != ''){
      this.loginService.loginUser({"email":email, "password":password}).subscribe((result) => {
        if(result.status == 200){
          this.dialog.closeAll();
          sessionStorage.setItem('access_token',result.access_token);
          sessionStorage.setItem('id',result.id);
          this.router.navigate(['/tools']);
        }
      },
      (error) => {
        this.login_error = true;

        if(error.status == 401){
          this.error_message = "Username and Password don't match !"
        }
        else{
          this.error_message = "500 Internal Server Error !"
        }
        
      })

    }

    
  }

}
