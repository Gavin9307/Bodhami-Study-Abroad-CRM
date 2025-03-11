import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private router: Router) {}

  canActivate(): boolean {

    
    //return true; //TO BE REMOVED

    const userId = localStorage.getItem('userId'); // Check if userToken exists
    const userRole = localStorage.getItem('userRole'); // Check if userRoles exists

    if (!userId || !userRole) {
      this.router.navigate(['/auth/login']); // Redirect if either is missing
      return false;
    }
    return true; // Allow access if both exist
  }

}
