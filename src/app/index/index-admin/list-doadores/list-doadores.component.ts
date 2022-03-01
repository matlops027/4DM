import { Component, OnInit } from '@angular/core';
import { Doador } from '../../../entidades/doador';
import * as firebase from 'firebase';

@Component({
  selector: 'app-list-doadores',
  templateUrl: './list-doadores.component.html',
  styleUrls: ['./list-doadores.component.css']
})
export class ListDoadoresComponent implements OnInit {

  //Array para pegar todos os doador
  public doadores: Doador[] = new Array()
  public doadoresFiltro: Doador[] = new Array()
  constructor() { }
  n: any

  ngOnInit() {
    var doador: Doador
    //Pegando todos doadores do banco de dados
    firebase.database().ref(`doador_detalhe`).once('value', (snapshot: any) => {
      snapshot.forEach((childSnapshot: any) => {
        doador = childSnapshot.val();
        var length = this.doadores.push(doador);
      });
      this.doadoresFiltro = this.doadores
    });
  }

  //realiza a busca atraves do texto digitado
  public buscaNome(stringBusca: Event): void {
    var textoBusca: string = (<HTMLInputElement>stringBusca.target).value
    this.doadoresFiltro = new Array()
    for (var i = 0; i < this.doadores.length; i++) {
      //ignora case
      if (this.doadores[i].nome.toLowerCase().indexOf(textoBusca.toLowerCase()) != -1) var length = this.doadoresFiltro.push(this.doadores[i]);
    }
  }

  public buscarTodos() {
    var doador: Doador
    this.doadores = new Array()
    //Pegando todos doadores do banco de dados
    this.doadoresFiltro = new Array()
    firebase.database().ref(`doador_detalhe`).once('value', (snapshot: any) => {
      snapshot.forEach((childSnapshot: any) => {
        doador = childSnapshot.val();
        var length = this.doadores.push(doador);
      });
      this.doadoresFiltro = this.doadores
      console.log(this.doadores)
    });
  }
}
