import { Component, OnInit } from '@angular/core';
import { Adm } from '../../../entidades/adm';
import * as firebase from 'firebase';

@Component({
  selector: 'app-listar-adm',
  templateUrl: './listar-adm.component.html',
  styleUrls: ['./listar-adm.component.css']
})
export class ListarAdmComponent implements OnInit {

  //Array para pegar todos os adm
  public adms: Adm[] = new Array()
  public admsFiltro: Adm[] = new Array()
  constructor() { }
  n: any

  ngOnInit() {
    var adm: Adm
    //Pegando todos adms do banco de dados
    firebase.database().ref(`adm_detalhe`).once('value', (snapshot: any) => {
      snapshot.forEach((childSnapshot: any) => {
        adm = childSnapshot.val();
        var length = this.adms.push(adm);
      });
      this.admsFiltro = this.adms
    });
  }

  //realiza a busca atraves do texto digitado
  public buscaEmail(stringBusca: Event): void {
    var textoBusca: string = (<HTMLInputElement>stringBusca.target).value
    this.admsFiltro = new Array()
    for (var i = 0; i < this.adms.length; i++) {
      //ignora case
      if (this.adms[i].email.toLowerCase().indexOf(textoBusca.toLowerCase()) != -1) var length = this.admsFiltro.push(this.adms[i]);
    }
  }

  public buscarTodos() {
    var adm: Adm
    this.adms = new Array()
    //Pegando todos adms do banco de dados
    this.admsFiltro = new Array()
    firebase.database().ref(`adm_detalhe`).once('value', (snapshot: any) => {
      snapshot.forEach((childSnapshot: any) => {
        adm = childSnapshot.val();
        var length = this.adms.push(adm);
      });
      this.admsFiltro = this.adms
      console.log(this.adms)
    });
  }

  public excluirAdm(adm: Adm) {
    firebase.database().ref(`adm_detalhe/${btoa(adm.email)}/`).remove()
    this.buscarTodos()

  }

}



