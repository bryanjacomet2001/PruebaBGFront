import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ResponseInventoryDetails } from '../interfaces/dashboard/responseInventoryDetails.interface';
import { Observable } from 'rxjs';
import { ProductoServices } from '../../productos/services/producto-services';
import { ResponseProductInfo } from '../../productos/interfaces/responseProductInfo.interface';
import { ResponseProvidersInfo } from '../../proveedores/interfaces/response.providersInfo.interface';
import { ProveedoresServices } from '../../proveedores/services/proveedores.services';
import { RequestCreatebatch } from '../../productos/interfaces/requestCreatebatch.interface';

@Injectable({
  providedIn: 'root',
})
export class DashboardServices {
  private _http = inject(HttpClient);
  url: string = 'https://localhost:7118/';


  constructor(private productoSerices: ProductoServices, private proveedoresService: ProveedoresServices){

  }

  getInventoryDetail(): Observable<ResponseInventoryDetails[]>{
    return this._http.get<ResponseInventoryDetails[]>(this.url + 'inventarioDetalle/listarInventarioDetalle');
  }

  getProductsList(): Observable<ResponseProductInfo[]>{
    return this.productoSerices.getProductsList();
  }

  getProvidersList(): Observable<ResponseProvidersInfo[]>{
    return this.proveedoresService.getProvidersList();
  }

  createNewBatch(request: RequestCreatebatch): Observable<number>{
    return this.productoSerices.createNewBatch(request);
  }


}

