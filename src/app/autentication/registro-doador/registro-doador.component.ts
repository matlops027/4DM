import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Doador } from '../../entidades/doador';
import * as firebase from 'firebase';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registro-doador',
  templateUrl: './registro-doador.component.html',
  styleUrls: ['./registro-doador.component.css']
})
export class RegistroDoadorComponent implements OnInit {

  registroDoador: FormGroup;
  doador: Doador;

  dadosEnviados = 0;
  msgErro1 = 0;
  msgErro2 = 0;
  msgErro3 = 0;
  msgErro4;
  cpfValido;

  constructor(private formBuilder: FormBuilder, private http:HttpClient, private router: Router) { }

  ngOnInit() {
    this.registroDoador = this.formBuilder.group({
      email: ['',
        [
          Validators.required, 
          Validators.email
        ]
      ],

      password: ['',Validators.required],
      nome: ['',Validators.required],
      sobrenome: ['',Validators.required],
      celular: ['',Validators.required],
      telefone: [''],
      data: ['',Validators.required],
      cep: ['',Validators.required],
      num: ['',Validators.required],
      cpf: ['',Validators.required]
    });

  }
  

  register(){
    this.testaCPF(this.registroDoador.controls['cpf'].value);
    if(this.registroDoador.valid && this.cpfValido == 1){
      this.http.get<Object[]>(`https://viacep.com.br/ws/${this.registroDoador.controls['cep'].value}/json/`).subscribe(data =>
      this.salvaDados(data),
        err => this.msgErro4 = 1
      );

    }else if(this.cpfValido == 0){
      this.msgErro3 = 1;
    }
  }


  salvaDados(cepObj){
    this.doador = new Doador();
    this.doador.email           = this.registroDoador.controls['email'].value;
    this.doador.password        = this.registroDoador.controls['password'].value;
    this.doador.nome            = this.registroDoador.controls['nome'].value;
    this.doador.sobrenome       = this.registroDoador.controls['sobrenome'].value;
    this.doador.dataNascimento  = this.registroDoador.controls['data'].value;
    this.doador.telefone        = this.registroDoador.controls['telefone'].value;
    this.doador.celular         = this.registroDoador.controls['celular'].value;
    this.doador.cpf             = this.registroDoador.controls['cpf'].value;
    this.doador.num             = this.registroDoador.controls['num'].value;
    this.doador.cep             = cepObj.cep;
    this.doador.logradouro      = cepObj.logradouro;
    this.doador.complemento     = cepObj.complemento;
    this.doador.bairro          = cepObj.bairro;
    this.doador.cidade          = cepObj.localidade;
    this.doador.estado          = cepObj.uf;

    firebase.auth().createUserWithEmailAndPassword(this.doador.email,this.doador.password)
      .then(() => {
          //remover o atributo senha do objeto usuario
          delete this.doador.password
          //registrando dados complementares do usuario no path email na base64
          //Para desconverter usar atob()
          firebase.database().ref(`doador_detalhe/${btoa(this.doador.email)}`).set(this.doador)

          this.dadosEnviados = 1;
          setTimeout(() => {
            this.router.navigate(['']);
          }, 2000);

      }).catch((error:Error) => {
        if(error.message == "The email address is already in use by another account."){
          this.msgErro1 = 1;
        }
        if(error.message == "Password should be at least 6 characters"){
          this.msgErro2 = 1;
        }
      })
  }

  testaCPF(cpf) {
    
    var strCPF: string = cpf
    var Soma;
    var Resto;
    Soma = 0;
    if (strCPF == "00000000000") this.cpfValido = 0;
    else {
      var i: number;
      for (i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
      Resto = (Soma * 10) % 11;
  
      if ((Resto == 10) || (Resto == 11)) Resto = 0;
      if (Resto != parseInt(strCPF.substring(9, 10))) this.cpfValido = 0;
      else {
  
        Soma = 0;
        for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;
  
        if ((Resto == 10) || (Resto == 11)) Resto = 0;
        if (Resto != parseInt(strCPF.substring(10, 11))) this.cpfValido = 0;
        else this.cpfValido = 1;
      }
    }
  }


  onClose(){
    this.dadosEnviados = 0;
    this.msgErro1 = 0;
    this.msgErro2 = 0;
    this.msgErro3 = 0;
    this.msgErro4 = 0;
  }


}
