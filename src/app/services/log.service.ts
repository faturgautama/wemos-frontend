import { Injectable } from '@angular/core';
import { HttpOperationService } from './http-operation.service';
import { LogModel } from '../model/pages/log.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LogService {

    constructor(
        private _httpOperationService: HttpOperationService,
    ) { }

    getAll(query: LogModel.ILogQuery): Observable<LogModel.GetAll> {
        return this._httpOperationService.getRequest(`${environment.api}/tumbler-log`, query);
    }

    getById(id_tumbler_log: string): Observable<LogModel.GetById> {
        return this._httpOperationService.getRequest(`${environment.api}/tumbler-log/${id_tumbler_log}`);
    }
}
