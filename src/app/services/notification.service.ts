import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpOperationService, HttpBaseResponse } from './http-operation.service';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    constructor(
        private _httpOperationService: HttpOperationService,
    ) { }

    getAll(): Observable<any> {
        return this._httpOperationService.getRequest(`${environment.api}/notification`);
    }

    update(id_notification: number): Observable<HttpBaseResponse> {
        return this._httpOperationService.putRequestWithoutLoading(`${environment.api}/notification/update`, { id_notification: id_notification });
    }

    delete(id_notification: number): Observable<HttpBaseResponse> {
        return this._httpOperationService.putRequestWithoutLoading(`${environment.api}/notification/delete/${id_notification}`, null);
    }
}
