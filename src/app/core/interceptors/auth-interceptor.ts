import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthServices } from '../../modules/auth/services/AuthServices';
import { SweetAlertService } from '../../shared/services/SweetAlertService';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthServices);
  const router = inject(Router);
  const sweetAlertService = inject(SweetAlertService);

  const token = authService.getToken();

  if (req.url.includes('iniciarSesion')) {
    return next(req);
  }

  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          localStorage.removeItem('token_inventario');
          sweetAlertService.info("Su sesión ha caducado por favor vuelva a iniciar sesión");
          router.navigate(['auth/login']);
        }
        return throwError(() => error);
      })
    );
  }


  return next(req);
};
