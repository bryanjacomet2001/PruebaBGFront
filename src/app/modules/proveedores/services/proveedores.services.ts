import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseProvidersInfo } from '../interfaces/response.providersInfo.interface';

@Injectable({
  providedIn: 'root',
})
export class ProveedoresServices {
    private _http = inject(HttpClient);

    url: string = 'https://localhost:7118/';

    getProvidersList(): Observable<ResponseProvidersInfo[]>{
      return this._http.get<ResponseProvidersInfo[]>(this.url+ "proveedor/listarProveedores");
    }
}
