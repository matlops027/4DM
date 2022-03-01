import { Component, OnInit } from '@angular/core';
import { Prioridade } from '../../../entidades/prioridade';
import * as firebase from 'firebase';
import { Prod } from '../../../entidades/prod';

@Component({
  selector: 'app-mostrar-prioridade',
  templateUrl: './mostrar-prioridade.component.html',
  styleUrls: ['./mostrar-prioridade.component.css']
})
export class MostrarPrioridadeComponent implements OnInit {
  prods: Prioridade[] = new Array();
  prodsFiltro: Prod[] = new Array();

  user:string;

  constructor() { }

  ngOnInit() {

    var prod: Prioridade
    //Pegando todos clientes do banco de dados
    firebase.database().ref(`prioridade_detalhe`).once('value', (snapshot: any) => {
      snapshot.forEach((childSnapshot: any) => {
        prod = childSnapshot.val();
        var length = this.prods.push(prod);
      });
      this.user = window.localStorage.getItem('email');

      this.prodsFiltro = new Array()
      for (var i = 0; i < this.prods.length; i++) {
        //ignora case
        if (this.prods[i].instituicao.toLowerCase().indexOf(this.user.toLowerCase()) != -1) {
          for(let j=0;j<this.prods[i].produtos.length;j++){
            this.prodsFiltro.push((this.prods[i].produtos[j]));
          }
        }
      }
    });
  }
}
