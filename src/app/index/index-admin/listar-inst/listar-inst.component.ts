import { Component, OnInit } from '@angular/core';
import { Instituicao } from '../../../entidades/instituicao';
import * as firebase from 'firebase';

@Component({
  selector: 'app-listar-inst',
  templateUrl: './listar-inst.component.html',
  styleUrls: ['./listar-inst.component.css']
})
export class ListarInstComponent implements OnInit {

  //Array para pegar todos os inst
  public insts: Instituicao[] = new Array()
  public instsFiltro: Instituicao[] = new Array()
  constructor() { }
  n: any

  ngOnInit() {
    var inst: Instituicao
    //Pegando todos insts do banco de dados
    firebase.database().ref(`inst_detalhe`).once('value', (snapshot: any) => {
      snapshot.forEach((childSnapshot: any) => {
        inst = childSnapshot.val();
        var length = this.insts.push(inst);
      });
      this.instsFiltro = this.insts
    });
  }

  //realiza a busca atraves do texto digitado
  public buscaNome(stringBusca: Event): void {
    var textoBusca: string = (<HTMLInputElement>stringBusca.target).value
    this.instsFiltro = new Array()
    for (var i = 0; i < this.insts.length; i++) {
      //ignora case
      if (this.insts[i].nome.toLowerCase().indexOf(textoBusca.toLowerCase()) != -1) var length = this.instsFiltro.push(this.insts[i]);
    }
  }

  public buscarTodos() {
    var inst: Instituicao
    this.insts = new Array()
    //Pegando todos insts do banco de dados
    this.instsFiltro = new Array()
    firebase.database().ref(`inst_detalhe`).once('value', (snapshot: any) => {
      snapshot.forEach((childSnapshot: any) => {
        inst = childSnapshot.val();
        var length = this.insts.push(inst);
      });
      this.instsFiltro = this.insts
      console.log(this.insts)
    });
  }

  public excluirInst(inst: Instituicao) {
    firebase.database().ref(`inst_detalhe/${btoa(inst.email)}/`).remove()
    this.buscarTodos()

  }

}
