import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UtilityService {

    ShowLoading$ = new BehaviorSubject<boolean>(false);

    constructor() { }
}
