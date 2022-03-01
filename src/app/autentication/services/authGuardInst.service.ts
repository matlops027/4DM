import { Injectable } from "@angular/core";

import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

import { AuthInfoService } from "./authInfo.service";
import { Observable } from "rxjs";
import * as firebase from "firebase";

@Injectable({providedIn:'root'})

export class AuthGuardInstService implements CanActivate{

    constructor(private authService: AuthInfoService, private router: Router){}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean>{
        if((window.localStorage.getItem('key')) && (window.localStorage.getItem('extension')) == '@inst.com'){
            return true;
        }else{
            window.localStorage.removeItem('key');
            window.localStorage.removeItem('email');
            window.localStorage.removeItem('extension');
            this.router.navigate(['']);
            return false;
        }
    }
    
}