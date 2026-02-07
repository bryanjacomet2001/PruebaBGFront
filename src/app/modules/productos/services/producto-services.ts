import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseProductInfo } from '../interfaces/responseProductInfo.interface';
import { RequestCreatebatch } from '../interfaces/requestCreatebatch.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductoServices {
    private _http = inject(HttpClient);

    url: string = 'https://localhost:7118/';

    getProductsList(): Observable<ResponseProductInfo[]>{
      return this._http.get<ResponseProductInfo[]>(this.url+ "producto/listarProductos");
    }

    createNewBatch(request: RequestCreatebatch): Observable<number>{
      return this._http.post<number>(this.url + "producto/agregarLote",request)
    }

}
