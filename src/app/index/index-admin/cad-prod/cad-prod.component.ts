import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Prod } from '../../../entidades/prod';

@Component({
  selector: 'app-cad-prod',
  templateUrl: './cad-prod.component.html',
  styleUrls: ['./cad-prod.component.css']
})
export class CadProdComponent implements OnInit {
  cadForm: FormGroup;
  prod: Prod;

  dadosEnviados = 0;
  msgErro1 = 0;

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.cadForm = this.formBuilder.group({
      nome: ['', Validators.required],
      categoria: ['', Validators.required]
    });
  }

  registro() {

    if (this.cadForm.valid) {
      this.prod = new Prod()
      this.prod.nome = this.cadForm.controls['nome'].value;
      this.prod.categoria = this.cadForm.controls['categoria'].value;

      firebase.database().ref(`prod_detalhe/${btoa(this.prod.nome)}`).set(this.prod).then(() => {
        this.dadosEnviados = 1;
      }).catch((error: Error) => {
        console.log(error.message);
      })

    }
  }

  onClose() {
    this.dadosEnviados = 0;
  }

}
