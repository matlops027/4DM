import { Component, OnInit } from '@angular/core';
import { Doacao } from '../../../entidades/doacao';
import * as firebase from 'firebase';

@Component({
  selector: 'app-doacoes',
  templateUrl: './doacoes.component.html',
  styleUrls: ['./doacoes.component.css']
})
export class DoacoesComponent implements OnInit {

  public doacoes: Doacao[] = new Array()
  public doacoesFiltro: Doacao[] = new Array()

  exibir = 1;

  filtroProd = [];

  cont = 0;

  constructor() { }

  ngOnInit() {
    var doacao: Doacao 
     //Pegando todos clientes do banco de dados
     firebase.database().ref(`doacao_confirmada`).once('value', (snapshot: any) => {
       snapshot.forEach((childSnapshot: any) => {
        doacao = childSnapshot.val();
         var length = this.doacoes.push(doacao);
       });
       this.doacoesFiltro = this.doacoes
     });
  }

  mostra(doacao:Doacao){
    if(this.cont == 0){
      for(let i=0;i<doacao.produtos.length;i++){
        this.filtroProd.push(doacao.produtos[i]);
      }
      this.cont = 1;
    }else{
      this.cont = 0;
      this.filtroProd = [];
      this.mostra(doacao);
    }
    this.exibir = 2;
  }

  volta(){
    this.exibir = 1;
  }

}
