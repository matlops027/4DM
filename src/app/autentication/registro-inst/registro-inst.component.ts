import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Instituicao } from '../../entidades/instituicao';

import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as firebase from 'firebase';

@Component({
  selector: 'app-registro-inst',
  templateUrl: './registro-inst.component.html',
  styleUrls: ['./registro-inst.component.css']
})
export class RegistroInstComponent implements OnInit {

  instForm: FormGroup;
  inst: Instituicao;

  dadosEnviados = 0;
  msgErro1 = 0;
  msgErro2 = 0;
  msgErro3 = 0;
  msgErro4;
  cnpjValido;

  constructor(private formBuilder: FormBuilder, private http : HttpClient, private router: Router) { }

  ngOnInit() {
    this.instForm = this.formBuilder.group({
      email: ['',
        [
          Validators.required, 
          Validators.email
        ]
      ],

      password: ['',Validators.required],
      nome: ['',Validators.required],
      razaoS: ['',Validators.required],
      proprietario: ['',Validators.required],
      contato: ['',Validators.required],
      cep: ['',Validators.required],
      num: ['',Validators.required],
      cnpj: ['',Validators.required]
    });

  }
  

  register(){
    this.cnpjValido = this.validarCNPJ(this.instForm.controls['cnpj'].value);
    if(this.instForm.valid && this.cnpjValido){
      this.http.get(`https://viacep.com.br/ws/${this.instForm.controls['cep'].value}/json/`).subscribe(data =>
      this.salvaDados(data),
        err => this.msgErro4 = 1
      );

    }else if(!this.cnpjValido){
      this.msgErro3 = 1;
    }
  }


  salvaDados(cepObj){
    this.inst = new Instituicao();
    this.inst.email           = this.instForm.controls['email'].value;
    this.inst.password        = this.instForm.controls['password'].value;
    this.inst.nome            = this.instForm.controls['nome'].value;
    this.inst.razaoS          = this.instForm.controls['razaoS'].value;
    this.inst.dono            = this.instForm.controls['proprietario'].value,
    this.inst.contato         = this.instForm.controls['contato'].value;
    this.inst.cnpj            = this.instForm.controls['cnpj'].value;
    this.inst.num             = this.instForm.controls['num'].value;
    this.inst.cep             = cepObj.cep;
    this.inst.logradouro      = cepObj.logradouro;
    this.inst.complemento     = cepObj.complemento;
    this.inst.bairro          = cepObj.bairro;
    this.inst.cidade          = cepObj.localidade;
    this.inst.estado          = cepObj.uf;

    firebase.auth().createUserWithEmailAndPassword(this.inst.email,this.inst.password)
      .then(() => {
          //remover o atributo senha do objeto usuario
          delete this.inst.password
          //registrando dados complementares do usuario no path email na base64
          //Para desconverter usar atob()
          firebase.database().ref(`inst_detalhe/${btoa(this.inst.email)}`).set(this.inst)

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

  validarCNPJ(cnpj) {
    
    var tamanho, numeros, digitos, soma, pos, i, resultado;


    cnpj = cnpj.replace(/[^\d]+/g,'');
 
    if(cnpj == '') return false;
     
    if (cnpj.length != 14)
        return false;
 
    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" || 
        cnpj == "11111111111111" || 
        cnpj == "22222222222222" || 
        cnpj == "33333333333333" || 
        cnpj == "44444444444444" || 
        cnpj == "55555555555555" || 
        cnpj == "66666666666666" || 
        cnpj == "77777777777777" || 
        cnpj == "88888888888888" || 
        cnpj == "99999999999999")
        return false;
         
    // Valida DVs
    tamanho = cnpj.length - 2
    numeros = cnpj.substring(0,tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false;
         
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0,tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
          return false;
           
    return true;
    
}

  onClose(){
    this.dadosEnviados = 0;
    this.msgErro1 = 0;
    this.msgErro2 = 0;
    this.msgErro3 = 0;
    this.msgErro4 = 0;
  }


}

