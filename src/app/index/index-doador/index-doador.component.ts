import { Component, OnInit } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-index-doador',
  templateUrl: './index-doador.component.html',
  styleUrls: ['./index-doador.component.css']
})
export class IndexDoadorComponent implements OnInit {

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
      title: 'DOAR',
      link: '/index-doador/registrar-doacao',
    },
    {
      title: 'DOAÇÕES EM ESPERA',
      link: '/index-doador/doacoes-nao-confirmadas',
    },
    {
      title: 'DOAÇÕES CONFIRMADAS',
      link: '/index-doador/ver-suas-doacoes',
    },
  ];
}
