import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationModel } from '../model/pages/authentication.model';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    UserData$ = new BehaviorSubject<AuthenticationModel.IUser>({
        id_user: '1',
        full_name: 'Fatur Gautama S',
        phone_number: '+6285156789101',
        email: 'faturgautama.dev@gmail.com',
        device: [
            {
                id_device: '1',
                device_name: 'Device Thermos A',
                device_code: 'TH-A001',
                created_at: new Date(),
                is_connected: true
            },
            {
                id_device: '2',
                device_name: 'Device Thermos B',
                device_code: 'TH-A002',
                created_at: new Date(),
                is_connected: false
            }
        ]
    });

    constructor() { }
}
