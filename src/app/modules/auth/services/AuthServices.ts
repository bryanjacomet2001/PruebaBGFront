import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RequestLogin } from '../interfaces/Requestlogin.interface';
import { Observable } from 'rxjs';
import { ResponseLogin } from '../interfaces/ResponseLogin.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthServices {
  private _http = inject(HttpClient);
  private _router = inject(Router);

  serviceLoginUrl: string = 'https://localhost:7118/usuario/iniciarSesion';

  login(requestLogin: RequestLogin): Observable<ResponseLogin>{
      return this._http.post<ResponseLogin>(this.serviceLoginUrl, requestLogin);
  }

  saveToken(token: string) {
    localStorage.setItem('token_inventario', token);
  }

  getToken() {
    return localStorage.getItem('token_inventario');
  }

  logout() {
    localStorage.removeItem('token_inventario');
    this._router.navigate(['/login'])
  }

  isTokenExpired(token: string): boolean {
    if (!token) return true;
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }
}


