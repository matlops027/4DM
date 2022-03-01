import { Injectable } from "@angular/core";
import * as firebase from "firebase";
import { Router } from "@angular/router";

@Injectable({providedIn:'root'})
export class AuthInfoService{
    
    isLogin = false;
    extension;

    constructor(private router: Router){}

    auth(email,password){

        return firebase.auth().signInWithEmailAndPassword(email, password).then((result) => {
            let auxEmail:string
            let aux;
    
            for(let i=0; i<email.length;i++){
              if(email[i] == '@'){
                aux = i;
              }
            }
            auxEmail = email.slice(aux);
            this.extension = email.slice(aux);
        
            if(auxEmail == "@adm.com"){
              this.router.navigate(['/index-admin/doacoes']);
            }else if(auxEmail == "@inst.com"){
              this.router.navigate(['index-instituicao/doacoes-receb']);
            }else{
              this.router.navigate(['/index-doador/registrar-doacao']);
            }

            this.isLogin = true;
            window.localStorage.setItem('key', firebase.auth().currentUser.uid);
            window.localStorage.setItem('email', firebase.auth().currentUser.email);
            window.localStorage.setItem('extension', this.extension);
          
          })
    }

}