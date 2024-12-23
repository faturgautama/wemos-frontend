import { Injectable } from '@angular/core';
import { HttpOperationService } from './http-operation.service';
import { LogModel } from '../model/pages/log.model';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LogService {

    RefreshData$ = new BehaviorSubject<boolean>(false);

    constructor(
        private _httpOperationService: HttpOperationService,
    ) { }

    getAll(query: LogModel.ILogQuery): Observable<LogModel.GetAll> {
        const userData = JSON.parse(localStorage.getItem("_WEMOS_LOGIN_DATA_") as any);

        if (userData.id_customer) {
            query.id_customer = userData.id_customer
        };

        return this._httpOperationService.getRequest(`${environment.api}/tumbler-log/get-all`, query);
    }

    getById(id_tumbler_log: string): Observable<LogModel.GetById> {
        return this._httpOperationService.getRequest(`${environment.api}/tumbler-log/detail/${id_tumbler_log}`);
    }
}
