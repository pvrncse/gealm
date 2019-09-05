import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from "@angular/router";

import { UserService } from "../service/user.service";

@Injectable({
	providedIn: 'root'
})

export class AuthGuard implements CanActivate {

	constructor(private userService: UserService, private router: Router) { }

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): boolean {
			if (!this.userService.isLoggedIn()) {
				this.router.navigateByUrl('/login');
				this.userService.deleteAccessToken();
				return false;
			}
		return true;
	}

}
