import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

/**
 * AuthGuard to allow user to home screen only after successful login
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Retrieves logged in user id from sessionStorage 
    // If present then allow to go to home page else redirect to login
    if (sessionStorage.getItem('userId'))
      return true;
    else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}
