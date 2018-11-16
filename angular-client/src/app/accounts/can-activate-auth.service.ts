import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AccountsClient } from '@accounts/client';

@Injectable()
export class CanActivateAuthService implements CanActivate {

  constructor(private accountsClient: AccountsClient, private router: Router) { }
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    const tokens = await this.accountsClient.refreshSession();
    if (!tokens) {
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }
}
