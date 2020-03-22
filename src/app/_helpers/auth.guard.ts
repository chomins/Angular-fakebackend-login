import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../_services';


@Injectable({ providedIn: 'root'})
export class AuthGuard implements CanActivate{
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        if(currentUser) {
            return true;
        }

        //login 안되어 있으면 로그인페이지로 다시이동.
        this.router.navigate(['/login'], { queryParams: {returnUrl: state.url }});
        return false;
    }
}