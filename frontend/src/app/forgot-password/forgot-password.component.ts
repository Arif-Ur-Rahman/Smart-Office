import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../service/login/login.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  email_error : boolean = false;
  send_email : boolean = false;

  constructor(private router: Router,
    private loginService : LoginService) { }

  ngOnInit(): void {

  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);


  back(){
    this.router.navigate(['/']);
  }


  forgotPassword(){
    let email = this.emailFormControl.value;
    // console.log(email);

    if(email){
      this.loginService.forgot_pass({"email": email}).subscribe((result) => {
        // console.log(result);
        if(result.status == 200){
          this.email_error = false;
          this.send_email = true;
        }
      }, (error) =>{
        if(error){
          this.email_error = true;
        }
      })
    }
  }

}
