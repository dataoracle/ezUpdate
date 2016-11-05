import {Injectable} from '@angular/core';
import {CanActivate,Router, ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import {AuthService} from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(public authService:AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state:RouterStateSnapshot) {

        if (this.authService.isLoggedIn) {
            console.log('auth guard passed');
            return true;
        } else {
            this.authService.redirectUrl = state.url;
            console.log('auth guard NOT passed');
            this.router.navigate(['/login']);
            return false;
        }        
    }
}
