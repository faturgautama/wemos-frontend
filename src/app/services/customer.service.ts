import { Injectable } from '@angular/core';
import { CustomerModel } from '../model/pages/customer.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpBaseResponse, HttpOperationService } from './http-operation.service';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {

    constructor(
        private _httpOperationService: HttpOperationService,
    ) { }

    getAll(): Observable<CustomerModel.GetAll> {
        return this._httpOperationService.getRequest(`${environment.api}/customer`);
    }

    getById(id_customer: string): Observable<CustomerModel.GetById> {
        return this._httpOperationService.getRequest(`${environment.api}/customer/${id_customer}`);
    }

    create(payload: CustomerModel.Create): Observable<HttpBaseResponse> {
        return this._httpOperationService.postRequest(`${environment.api}/customer`, payload);
    }

    update(payload: CustomerModel.Update): Observable<HttpBaseResponse> {
        return this._httpOperationService.putRequest(`${environment.api}/customer`, payload);
    }

    updateStatus(payload: CustomerModel.Update): Observable<HttpBaseResponse> {
        return this._httpOperationService.putRequest(`${environment.api}/customer`, { ...payload, is_active: !payload.is_active });
    }
}
