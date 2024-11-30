import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/services/utility.service';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-ds-login',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        InputTextModule,
        PasswordModule,
        ButtonModule,
    ],
    templateUrl: './ds-login.component.html',
    styleUrl: './ds-login.component.scss'
})
export class DsLoginComponent implements OnInit, OnDestroy {

    Year = new Date().getFullYear();

    IsFormLogin = true;

    Form: FormGroup;

    constructor(
        private _router: Router,
        private _formBuilder: FormBuilder,
        private _utilityService: UtilityService,
        private _messageService: MessageService,
    ) {
        this.Form = this._formBuilder.group({
            email: ['', [Validators.required]],
            password: ['', [Validators.required]],
            full_name: ['', [Validators.required]],
            phone_number: ['', [Validators.required]],
        })
    }

    ngOnInit(): void {

    }

    ngOnDestroy(): void {

    }

    handleLogin() {
        this._utilityService.ShowLoading$.next(true);

        setTimeout(() => {
            this._utilityService.ShowLoading$.next(false);
            this._messageService.clear();
            this._messageService.add({ severity: 'success', summary: 'Berhasil', detail: 'Login berhasil' });

            this._router.navigateByUrl('/dashboard/beranda');
        }, 2500);
    }
}
