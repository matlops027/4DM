import { Component, OnInit } from '@angular/core';
import { Doacao } from '../../../entidades/doacao';
import * as firebase from 'firebase';
import { DoacaoConfirmada } from '../../../entidades/doacaoConfirmada';
import { Doador } from '../../../entidades/doador';

@Component({
  selector: 'app-doacoes-recebidas',
  templateUrl: './doacoes-recebidas.component.html',
  styleUrls: ['./doacoes-recebidas.component.css']
})
export class DoacoesRecebidasComponent implements OnInit {

  doacoesFiltro: Doacao[] = new Array();
  doacoes: Doacao[] = new Array();

  user: any;

  filtroProd = [];

  cont = 0;

  idDoacao;

  doacaoConfirmada: DoacaoConfirmada;

  exibir = 1;
  
  alerta = 0;

  doadores: Doador[] = new Array();
  doadoresFiltro: Doador[] = new Array();

  num;

  msgConf;


  constructor() { }

  ngOnInit() {

    var doacao: Doacao;
    this.doacoes = new Array();
    this.user = window.localStorage.getItem('email');
    //Pegando todos clientes do banco de dados
    firebase.database().ref(`doacao_detalhe`).once('value', (snapshot: any) => {
      snapshot.forEach((childSnapshot: any) => {
        doacao = childSnapshot.val();
        var length = this.doacoes.push(doacao);
      });
      this.doacoesFiltro = new Array()
      for (var i = 0; i < this.doacoes.length; i++) {
        if (this.user == this.doacoes[i].instituicao) {
          this.doacoesFiltro.push(this.doacoes[i]);
        }
      }

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

  confirma(doacao: Doacao) {
    firebase.database().ref(`doacao_detalhe/${btoa(doacao.id)}/`).remove()

    this.doacaoConfirmada = new DoacaoConfirmada(doacao.email_doador, doacao.instituicao, doacao.produtos, doacao.id, doacao.data);

    firebase.database().ref(`doacao_confirmada/${btoa(this.doacaoConfirmada.id)}`).set(this.doacaoConfirmada).then(() => {
      this.msgWhats(doacao);
    })

    this.ngOnInit();
  }

  volta() {
    this.exibir = 1;
  }

  msgWhats(doacao: Doacao) {
    var doador: Doador

    var auxEmail: string;
    //Pegando todos doadores do banco de dados
    firebase.database().ref(`doador_detalhe`).once('value', (snapshot: any) => {
      snapshot.forEach((childSnapshot: any) => {
        doador = childSnapshot.val();
        var length = this.doadores.push(doador);
      });
      this.doadoresFiltro = this.doadores

      for (let i = 0; i < this.doadoresFiltro.length; i++) {
        auxEmail = (this.doadoresFiltro[i].email).toLowerCase();
        if (auxEmail == doacao.email_doador) {
          this.num = this.doadoresFiltro[i].celular;
        }
      }
      var uri = "Olá, sua doação foi confirmada!";
      var res = encodeURI(uri);
      this.msgConf = "https://api.whatsapp.com/send?phone=55" + this.num + "&text=" + res;
      window.open(this.msgConf);
    });
  }

}
