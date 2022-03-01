import { Component, OnInit, ViewChild } from '@angular/core';
import { Prod } from '../../../entidades/prod';
import { NgForm } from '@angular/forms';
import { Instituicao } from '../../../entidades/instituicao';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Carrinho } from '../../../entidades/carrinho';
import { Doacao } from '../../../entidades/doacao';
import { Prioridade } from '../../../entidades/prioridade';

@Component({
  selector: 'app-defini-prioridade',
  templateUrl: './defini-prioridade.component.html',
  styleUrls: ['./defini-prioridade.component.css']
})
export class DefiniPrioridadeComponent implements OnInit {

  @ViewChild('formulario') public formulario: NgForm

  //Estado atual do formulário: Válido ou Inválido, para controle de exibição
  public formEstado: string = 'disabled'
  //Verificar se dados foram enviados, ou seja, se o cadastro foi salvo
  public dadosEnviados: number = 0

  public produtos: Prod[] = new Array()
  public produtosFiltro: Prod[] = new Array()

  public produtosCarrinho: Prod[] = new Array()

  public inst: string;

  public msgErro = 0;

  constructor(private router: Router) { }

  ngOnInit() {
    this.inst = window.localStorage.getItem('email');
    
    var produto: Prod
    //Pegando todos produtos do banco de dados
    firebase.database().ref(`prod_detalhe`).once('value', (snapshot: any) => {
      snapshot.forEach((childSnapshot: any) => {
        produto = childSnapshot.val();
        var length = this.produtos.push(produto);
      });
      this.produtosFiltro = this.produtos
    });
  }

  public buscaNome(stringBusca: Event): void {
    var textoBusca: string = (<HTMLInputElement>stringBusca.target).value
    this.produtosFiltro = new Array()
    for (var i = 0; i < this.produtos.length; i++) {
      //ignora case
      if (this.produtos[i].nome.toLowerCase().indexOf(textoBusca.toLowerCase()) != -1) var length = this.produtosFiltro.push(this.produtos[i]);
    }
  }

  public buscarTodos() {
    var produto: Prod
    this.produtos = new Array()
    //Pegando todos clientes do banco de dados
    this.produtosFiltro = new Array()
    firebase.database().ref(`prod_detalhe`).once('value', (snapshot: any) => {
      snapshot.forEach((childSnapshot: any) => {
        produto = childSnapshot.val();
        var length = this.produtos.push(produto);
      });
      this.produtosFiltro = this.produtos
      console.log(this.produtos)
    });
  }

  public addProduto(produto: Prod) {
    var aux = 0;
    for(let i=0; i<this.produtosCarrinho.length;i++){
      if(produto == this.produtosCarrinho[i]){
        aux = 1;
      }
    }
    if(aux == 0){
      var length = this.produtosCarrinho.push(produto);
    }else{
      this.msgErro = 1;
    }
  }

  public excluirProduto(produto: Prod) {
    var produtos: Prod[] = new Array()
    var aux: number = 0
    for (var produtoaux of this.produtosCarrinho) {
      if (aux == 1 || produtoaux.nome != produto.nome) {
        var length = produtos.push(produtoaux);
      } else {
        aux = 1
      }
    }
    this.produtosCarrinho = produtos

  }

  public finalizar() {
        var prodP: Prod[] = new Array()
        for (var produtoaux of this.produtosCarrinho) {
            var prodespecial: Prod = new Prod()
            prodespecial.nome = produtoaux.nome;
            prodespecial.categoria = produtoaux.categoria;
            var length = prodP.push(prodespecial);
        }
        
        var priori: Prioridade = new Prioridade(this.inst, prodP)
        //salvando os dados no banco de dado, passando o cpf como chave primária em base 64
        firebase.database().ref(`prioridade_detalhe/${btoa(priori.instituicao)}`).set(priori).then(() => {
          this.dadosEnviados = 1;
        })

  }

  onClose(){
    this.dadosEnviados = 0;
    this.msgErro = 0;
  }

}