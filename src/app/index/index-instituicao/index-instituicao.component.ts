import { Component, OnInit } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-index-instituicao',
  templateUrl: './index-instituicao.component.html',
  styleUrls: ['./index-instituicao.component.css']
})
export class IndexInstituicaoComponent implements OnInit {
  name;

  constructor(private sidebarService: NbSidebarService, private router: Router) { }

  ngOnInit() {
    
    this.name = window.localStorage.getItem('email');

  }
  
  toggle() {
    this.sidebarService.toggle(false);
    return false;
  }

  logOut(){
    firebase.auth().signOut().catch((error:Error)=>{
      console.log(error.message);
    });
    window.localStorage.removeItem('key');
    window.localStorage.removeItem('email');
    window.localStorage.removeItem('extension');
  }
  
  items = [
    {
      title: 'DOAÇÕES EM ESPERA',
      link: '/index-instituicao/doacoes-receb',
    }, {
      title: 'DOAÇÕES CONFIRMADAS',
      link: '/index-instituicao/doacoes-confirm',
    }, {
      title: 'DEFINIR PRIORIDADES',
      link: '/index-instituicao/prod-prioridade',
    }, {
      title: 'PRIORIDADES',
      link: '/index-instituicao/list-prioridade',
    }
  ];
}
