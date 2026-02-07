import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthServices } from '../../modules/auth/services/AuthServices';
import { SweetAlertService } from '../../shared/services/SweetAlertService';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthServices);
  const router = inject(Router);
  const token = authService.getToken();
  const sweetAlertService = inject(SweetAlertService);

  let authReq = req;
  if (token) {
    authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        sweetAlertService.info('Su sesión ha caducado. Por favor, inicie sesión nuevamente.');
        localStorage.removeItem('token');
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};
