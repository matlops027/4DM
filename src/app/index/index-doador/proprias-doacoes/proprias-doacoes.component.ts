import { Component, OnInit } from '@angular/core';
import { Doacao } from '../../../entidades/doacao';
import * as firebase from 'firebase';

@Component({
  selector: 'app-proprias-doacoes',
  templateUrl: './proprias-doacoes.component.html',
  styleUrls: ['./proprias-doacoes.component.css']
})
export class PropriasDoacoesComponent implements OnInit {
  doacoesFiltro: Doacao[] = new Array();
  doacoes: Doacao[] = new Array();

  user: any;

  filtroProd = [];

  cont = 0;

  exibir = 1;

  alerta = 0;

  constructor() { }

  ngOnInit() {

    var doacao: Doacao
    //Pegando todos clientes do banco de dados
    firebase.database().ref(`doacao_confirmada`).once('value', (snapshot: any) => {
      snapshot.forEach((childSnapshot: any) => {
        doacao = childSnapshot.val();
        var length = this.doacoes.push(doacao);
      });
      this.user = window.localStorage.getItem('email');

      this.doacoesFiltro = new Array()
      for (var i = 0; i < this.doacoes.length; i++) {
        //ignora case
        if (this.doacoes[i].email_doador.toLowerCase().indexOf(this.user.toLowerCase()) != -1) {
          var length = this.doacoesFiltro.push(this.doacoes[i]);
        }
      }
      console.log(this.doacoesFiltro);
      if (this.doacoesFiltro.length == 0)
      {
        this.alerta = 1;
      }else{
        this.alerta = 0;
      }
    });

  }

  mostra(doacao: Doacao) {
    if (this.cont == 0) {
      for (let i = 0; i < doacao.produtos.length; i++) {
        this.filtroProd.push(doacao.produtos[i]);
      }
      this.cont = 1;
    } else {
      this.cont = 0;
      this.filtroProd = [];
      this.mostra(doacao);
    }
    this.exibir = 2;
  }

  volta() {
    this.exibir = 1;
  }

}
