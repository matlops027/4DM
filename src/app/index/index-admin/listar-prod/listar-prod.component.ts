import { Component, OnInit } from '@angular/core';
import { Prod } from '../../../entidades/prod';
import * as firebase from 'firebase';

@Component({
  selector: 'app-listar-prod',
  templateUrl: './listar-prod.component.html',
  styleUrls: ['./listar-prod.component.css']
})
export class ListarProdComponent implements OnInit {

  //Array para pegar todos os prod
  public prods: Prod[] = new Array()
  public prodsFiltro: Prod[] = new Array()
  constructor() { }
  n: any

  ngOnInit() {
    var prod: Prod
    //Pegando todos prods do banco de dados
    firebase.database().ref(`prod_detalhe`).once('value', (snapshot: any) => {
      snapshot.forEach((childSnapshot: any) => {
        prod = childSnapshot.val();
        var length = this.prods.push(prod);
      });
      this.prodsFiltro = this.prods
    });
  }

  //realiza a busca atraves do texto digitado
  public buscaNome(stringBusca: Event): void {
    var textoBusca: string = (<HTMLInputElement>stringBusca.target).value
    this.prodsFiltro = new Array()
    for (var i = 0; i < this.prods.length; i++) {
      //ignora case
      if (this.prods[i].nome.toLowerCase().indexOf(textoBusca.toLowerCase()) != -1) var length = this.prodsFiltro.push(this.prods[i]);
    }
  }

  public buscarTodos() {
    var prod: Prod
    this.prods = new Array()
    //Pegando todos prods do banco de dados
    this.prodsFiltro = new Array()
    firebase.database().ref(`prod_detalhe`).once('value', (snapshot: any) => {
      snapshot.forEach((childSnapshot: any) => {
        prod = childSnapshot.val();
        var length = this.prods.push(prod);
      });
      this.prodsFiltro = this.prods
      console.log(this.prods)
    });
  }

  public excluirProd(prod: Prod) {
    firebase.database().ref(`prod_detalhe/${btoa(prod.nome)}/`).remove()
    this.buscarTodos()

  }

}


