import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AuthInfoService } from "./authInfo.service";
import { Observable } from "rxjs";

@Injectable({providedIn:'root'})

export class AuthGuardDoadorService implements CanActivate{

    constructor(private authService: AuthInfoService, private router: Router){}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean>{

        if((window.localStorage.getItem('key')) && ((window.localStorage.getItem('extension')) != '@inst.com') && ((window.localStorage.getItem('extension')) != '@adm.com')){
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