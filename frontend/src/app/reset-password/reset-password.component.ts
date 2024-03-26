import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../service/login/login.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  showPassword = false;
  token : any;
  changePass: boolean = false;

  constructor(private router: Router,
    private loginService : LoginService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.token = params['id'];
      console.log(this.token);
    });
  }


  passwordFormControl = new FormControl('', [
    Validators.required
  ]);

  back(){
    this.router.navigate(['/']);
  }

  resetPassword(){
    let password = this.passwordFormControl.value;

    console.log(password);

    this.loginService.reset_pass({"token": this.token,  "password": password}).subscribe((result) => {
      if(result.status == 200){
        this.changePass = true;
      }
    })
  }

}
