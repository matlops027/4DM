import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { AuthInfoService } from '../../autentication/services/authInfo.service';
import { BehaviorSubject } from 'rxjs';
import { Adm } from '../../entidades/adm';

@Component({
  selector: 'app-index-admin',
  templateUrl: './index-admin.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./index-admin.component.css']
})
export class IndexAdminComponent implements OnInit {
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
      title: 'DOAÇÕES',
      link: '/index-admin/doacoes',
    }, 
    {
      title: 'MOSTRAR DOADORES',
      link: '/index-admin/lista-doadores',
    },
    {
      title: 'REGISTRAR INSTITUIÇÕES',
      link: '/index-admin/registrar-inst',
    },
    {
      title: 'MOSTRAR INSTITUIÇÕES',
      link: '/index-admin/lista-inst',
    },
    {
      title: 'REGISTRAR PRODUTOS',
      link: '/index-admin/registrar-prod',
    },
    {
      title: 'MOSTRAR PRODUTOS',
      link: '/index-admin/lista-prod',
    },
    {
      title: 'REGISTRAR ADMINISTRADORES',
      link: '/index-admin/registrar-adm',
    },
    {
      title: 'MOSTRAR ADMINISTRADORES',
      link: '/index-admin/lista-adm',
    },
  ];
}
