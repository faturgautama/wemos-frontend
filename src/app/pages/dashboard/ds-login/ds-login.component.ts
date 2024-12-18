import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/services/utility.service';
import { MessageService } from 'primeng/api';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Subject, takeUntil } from 'rxjs';

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

    Destroy$ = new Subject();

    Year = new Date().getFullYear();

    IsFormLoginCustomer = true;

    Form: FormGroup;

    constructor(
        private _router: Router,
        private _formBuilder: FormBuilder,
        private _utilityService: UtilityService,
        private _messageService: MessageService,
        private _authenticationService: AuthenticationService,
    ) {
        this.Form = this._formBuilder.group({
            email: ['', [Validators.required]],
            password: ['', [Validators.required]],
            device_id: ['', [Validators.required]],
        })
    }

    ngOnInit(): void {

    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }

    handleLoginCustomer() {
        this._authenticationService
            .loginCustomer(this.Form.value.device_id, this.Form.value.password)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.status) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Berhasil', detail: 'Login berhasil' });
                    this._router.navigateByUrl('/dashboard/beranda');
                } else {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'error', summary: 'Gagal', detail: result.message });
                }
            });
    }

    handleLoginUser() {
        this._authenticationService
            .loginUser(this.Form.value.email, this.Form.value.password)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.status) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Berhasil', detail: 'Login berhasil' });
                    this._router.navigateByUrl('/dashboard/beranda');
                } else {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'error', summary: 'Gagal', detail: result.message });
                }
            });
    }
}
