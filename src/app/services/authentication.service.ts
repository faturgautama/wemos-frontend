import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { AuthenticationModel } from '../model/pages/authentication.model';
import { HttpOperationService } from './http-operation.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    UserData$ = new BehaviorSubject<AuthenticationModel.ILoginCustomer>(null as any);

    constructor(
        private _httpOperationService: HttpOperationService,
    ) { }

    loginCustomer(device_id: string, password: string) {
        return this._httpOperationService
            .postRequest(`${environment.api}/authentication/signInCustomer`, { device_id, password })
            .pipe(
                tap((result) => {
                    if (result.status) {
                        this.UserData$.next(result.data);
                        this.handleSignIn(result.data);
                    }
                })
            )
    }

    loginUser(email: string, password: string) {
        return this._httpOperationService
            .postRequest(`${environment.api}/authentication/signInUser`, { email, password })
            .pipe(
                tap((result) => {
                    if (result.status) {
                        this.UserData$.next(result.data);
                        this.handleSignIn(result.data);
                    }
                })
            )
    }

    setUserData() {
        const user_data = localStorage.getItem("_WEMOS_LOGIN_DATA_") as any;
        this.UserData$.next(JSON.parse(user_data as any));
    }

    getUserData() {
        const user_data = localStorage.getItem("_WEMOS_LOGIN_DATA_");
        return JSON.parse(user_data as any);
    }

    private handleSignIn(data: any) {
        localStorage.clear();
        localStorage.setItem("_WEMOS_LOGIN_DATA_", JSON.stringify(data));
    }
}
