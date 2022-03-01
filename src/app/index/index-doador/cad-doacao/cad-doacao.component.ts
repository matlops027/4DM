import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Doador } from '../../../entidades/doador';
import { Prod } from '../../../entidades/prod';
import * as firebase from 'firebase';
import { Doacao } from '../../../entidades/doacao';
import { Instituicao } from '../../../entidades/instituicao';
import { Carrinho } from '../../../entidades/carrinho';
import { Router } from '@angular/router';
import { Prioridade } from '../../../entidades/prioridade';

@Component({
  selector: 'app-cad-doacao',
  templateUrl: './cad-doacao.component.html',
  styleUrls: ['./cad-doacao.component.css']
})
export class CadDoacaoComponent implements OnInit {

  @ViewChild('formulario') public formulario: NgForm

  public insts: Instituicao[] = new Array()
  public instsFiltro: Instituicao[] = new Array()

  //Estado atual do formulário: Válido ou Inválido, para controle de exibição
  public formEstado: string = 'disabled'
  //Verificar se dados foram enviados, ou seja, se o cadastro foi salvo
  public dadosEnviados: number = 0

  public produtos: Prod[] = new Array()
  public produtosFiltro: Prod[] = new Array()

  public produtosCarrinho: Prod[] = new Array()

  public produtosPFiltro: Prod[] = new Array()
  public prodsP: Prioridade[] = new Array()

  public doador: string

  public inst: string;
  public instAux: string;

  public data;
  public dataMoment;

  public num;

  public msgWhats;

  public exibir = 1;
  public msgErro = 0;
  public msgErro2 = 0;

  constructor(private router: Router) { }

  ngOnInit() {
    this.doador = window.localStorage.getItem('email');

    var inst: Instituicao
    //Pegando todos clientes do banco de dados
    firebase.database().ref(`inst_detalhe`).once('value', (snapshot: any) => {
      snapshot.forEach((childSnapshot: any) => {
        inst = childSnapshot.val();
        var length = this.insts.push(inst);
      });
      this.instsFiltro = this.insts
    });

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
    var length = this.produtosCarrinho.push(produto);
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

  public atualizarInst(inst: Event): void {
    if(((<HTMLInputElement>inst.target).value) != ""){
      this.inst = (<HTMLInputElement>inst.target).value
      for(let i=0;i<this.instsFiltro.length;i++){
        if(this.instsFiltro[i].email == this.inst){
          this.num = this.instsFiltro[i].contato;
          this.instAux = this.instsFiltro[i].email;
        }
      }
    }
    console.log(this.inst)
  }

  public finalizarDoacao() {
        var aux: number = 0
        var carrinho: Carrinho[] = new Array()
        if((this.produtosCarrinho.length != 0) && (this.inst != undefined)){
          for (var produtoaux of this.produtosCarrinho) {
            var verifica: number = 0;
            for (var carrinhoaux of carrinho) {
              if (produtoaux.nome == carrinhoaux.nome) {
                carrinhoaux.quantidade = carrinhoaux.quantidade + 1
                verifica = 1
              }
  
            }
            if (verifica == 0) {
              var prodespecial: Carrinho = new Carrinho(produtoaux.nome, 1)
              var length = carrinho.push(prodespecial);
            }
          }
          var carrinhosAux = carrinho
          console.log(carrinho.values)
          this.data = new Date()
          var idDoacao: string = btoa(this.doador.concat(this.inst.concat(this.data)))
          this.dataMoment = new Date().toLocaleDateString();
          
          var doacao: Doacao = new Doacao(this.doador, this.inst, carrinho, idDoacao,this.dataMoment)
          //salvando os dados no banco de dado, passando o cpf como chave primária em base 64
          firebase.database().ref(`doacao_detalhe/${btoa(idDoacao)}`).set(doacao).then(() => {
            this.dadosEnviados = 1;
            var uri = "Olá, você tem doações a serem confirmadas!";
            var res = encodeURI(uri);
            this.msgWhats = "https://api.whatsapp.com/send?phone=55" + this.num + "&text=" + res;
            window.open(this.msgWhats);
          })
        }else if((this.produtosCarrinho.length == 0)){
            this.msgErro2 = 1;
        }else{
            this.msgErro = 1;
        }

  }

  onClose(){
    this.dadosEnviados = 0;
    this.msgErro = 0;
    this.msgErro2 = 0;
  }

  mostra(){
    this.produtosPFiltro = [];
    if(this.instAux != undefined){
      var produtoP: Prioridade
      //Pegando todos produtos do banco de dados
      firebase.database().ref(`prioridade_detalhe`).once('value', (snapshot: any) => {
        snapshot.forEach((childSnapshot: any) => {
          produtoP = childSnapshot.val();
          var length = this.prodsP.push(produtoP);
        });

        for(let i=0;i<this.prodsP.length;i++){
          if(this.instAux == this.prodsP[i].instituicao){
            this.produtosPFiltro = [];    
            for(let j=0;j<this.prodsP[i].produtos.length;j++){
              this.produtosPFiltro.push((this.prodsP[i].produtos[j]));
            }
          }
        }
      });
      this.exibir = 2;
    }else{
      this.msgErro = 1;
    }
  }

  volta(){
    this.exibir = 1;
    this.instAux = undefined;
    this.produtosPFiltro = [];
  }

}