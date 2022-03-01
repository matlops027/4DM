import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Adm } from '../../entidades/adm';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-adm',
  templateUrl: './registro-adm.component.html',
  styleUrls: ['./registro-adm.component.css']
})
export class RegistroAdmComponent implements OnInit {
  admForm: FormGroup;
  adm: Adm;

  dadosEnviados = 0;
  msgErro1 = 0;
  msgErro2 = 0;
  msgErro3 = 0;

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.admForm = this.formBuilder.group({
      email: ['',
        [
          Validators.required, 
          Validators.email
        ]
      ],

      password: ['',Validators.required]
    });
  }

  registro(){
    this.confereEmail(this.admForm.controls['email'].value);

    if(this.admForm.valid && (this.msgErro3 == 0)){
      this.adm = new Adm()
      this.adm.email = this.admForm.controls['email'].value;
      this.adm.password = this.admForm.controls['password'].value;

      firebase.auth().createUserWithEmailAndPassword(this.adm.email,this.adm.password)
      .then(() => {
          //remover o atributo senha do objeto usuario
          delete this.adm.password
          //registrando dados complementares do usuario no path email na base64
          //Para desconverter usar atob()
          firebase.database().ref(`adm_detalhe/${btoa(this.adm.email)}`).set(this.adm)

          this.dadosEnviados = 1;

      }).catch((error:Error) => {
        if(error.message == "The email address is already in use by another account."){
          this.msgErro1 = 1;
        }
        if(error.message == "Password should be at least 6 characters"){
          this.msgErro2 = 1;
        }
      })

    }
  }

  confereEmail(email){
    let auxEmail:string
    let aux;

    for(let i=0; i<email.length;i++){
      if(email[i] == '@'){
        aux = i;
      }
    }
    auxEmail = email.slice(aux);
    
    if(auxEmail == "@adm.com"){
      this.msgErro3 = 0;
    }else{
      this.msgErro3 = 1;   
    }
  }

  onClose(){
    this.dadosEnviados = 0;
    this.msgErro1 = 0;
    this.msgErro2 = 0;
    this.msgErro3 = 0;
  }

}
