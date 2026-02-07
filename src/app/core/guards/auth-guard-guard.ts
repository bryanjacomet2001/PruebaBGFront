import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthServices } from '../../modules/auth/services/AuthServices';


export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthServices);
  const router = inject(Router);
  const token = authService.getToken();

  if (token && !authService.isTokenExpired(token)) {
    return true;
  } else {
    authService.logout();
    router.navigate(['/login']);
    return false;
  }
};
