import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


import { Router } from '@angular/router';
import { AuthInfoService } from '../services/authInfo.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  msgErro = 0;
  msgErro2 = 0;

  email: string;
  password: string;

  constructor(private formBuilder: FormBuilder, private router: Router, private info: AuthInfoService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['',
        [
          Validators.required, 
          Validators.email
        ]
      ],

      password: ['',Validators.required]
    });
  }

  login(){
    if(this.loginForm.valid){
      this.email = this.loginForm.controls['email'].value;
      this.password = this.loginForm.controls['password'].value;

      this.info.auth(this.email,this.password).catch((error:Error) => {
          if(error.message == "There is no user record corresponding to this identifier. The user may have been deleted."){
            this.msgErro = 1;
          }else{

          }this.msgErro2=1;
      })
    }

  }

  onClose(){
    this.msgErro = 0;
    this.msgErro2 = 0;
  }

  registro(){
    this.router.navigate(['/registrar-doador'])
  }

}