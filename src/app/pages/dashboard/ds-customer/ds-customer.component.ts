import { CommonModule, formatDate } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TableModule } from 'primeng/table';
import { Subject, takeUntil } from 'rxjs';
import { DashboardLayoutComponent } from 'src/app/components/dashboard-layout/dashboard-layout.component';
import { CustomerService } from 'src/app/services/customer.service';
import { PasswordModule } from 'primeng/password';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-ds-customer',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        DashboardLayoutComponent,
        InputTextModule,
        InputNumberModule,
        CalendarModule,
        DropdownModule,
        ButtonModule,
        TableModule,
        OverlayPanelModule,
        PasswordModule,
        InputTextareaModule
    ],
    templateUrl: './ds-customer.component.html',
    styleUrl: './ds-customer.component.scss'
})
export class DsCustomerComponent implements OnInit, OnDestroy {

    IsList = true;

    Destroy$ = new Subject();

    TableDatasource: any[] = [];

    TanggalFilter: Date = new Date();

    IsFormEdit = false;

    FormCustomer: FormGroup = this._formBuilder.group({
        id_customer: ['', [Validators.required]],
        device_id: ['', [Validators.required]],
        device_name: ['', [Validators.required]],
        device_type: ['', [Validators.required]],
        device_size: ['', [Validators.required]],
        device_notes: ['', [Validators.required]],
        full_name: ['', [Validators.required]],
        email: ['', [Validators.required]],
        password: ['', [Validators.required]],
        date_of_birth: [new Date(), [Validators.required]],
        weight: [0, [Validators.required]],
        height: [0, [Validators.required]],
        is_active: [true, [Validators.required]],
    });

    constructor(
        private _formBuilder: FormBuilder,
        private _messageService: MessageService,
        private _customerService: CustomerService,
    ) { }

    ngOnInit(): void {
        this.handleGetAll();
    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }

    handleGetAll() {
        this._customerService
            .getAll()
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.status) {
                    this.TableDatasource = result.data;
                }
            })
    }

    handleEditCustomer(id_customer: string) {
        console.log("id_customer =>", id_customer);
        this.IsList = false;
        this.IsFormEdit = true;

        this._customerService
            .getById(id_customer)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result: any) => {
                if (result.status) {
                    result.data.date_of_birth = new Date(result.data.date_of_birth)
                    this.FormCustomer.patchValue(result.data)
                }
            })
    }

    handleSaveCustomer() {
        const {
            id_customer,
            is_active,
            ...payload
        } = this.FormCustomer.value;

        this._customerService
            .create(payload)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.status) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Berhasil', detail: 'Data Berhasil Disimpan' });
                    this.handleBackToList();
                }
            })
    }

    handleUpdateCustomer() {
        this._customerService
            .update(this.FormCustomer.value)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.status) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Berhasil', detail: 'Data Berhasil Diperbarui' });
                    this.handleBackToList();
                }
            })
    }

    handleUpdateStatusCustomer(args: any) {
        this.FormCustomer.patchValue(args);

        this._customerService
            .updateStatus(this.FormCustomer.value)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.status) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Berhasil', detail: 'Ubah Status Berhasil' });
                    this.handleGetAll();
                }
            })
    }

    handleBackToList() {
        this.FormCustomer.reset();
        this.FormCustomer = this._formBuilder.group({
            id_customer: ['', [Validators.required]],
            device_id: ['', [Validators.required]],
            device_name: ['', [Validators.required]],
            device_type: ['', [Validators.required]],
            device_size: ['', [Validators.required]],
            device_notes: ['', [Validators.required]],
            full_name: ['', [Validators.required]],
            email: ['', [Validators.required]],
            password: ['', [Validators.required]],
            date_of_birth: [new Date(), [Validators.required]],
            weight: [0, [Validators.required]],
            height: [0, [Validators.required]],
            is_active: [true, [Validators.required]],
        });
        this.IsList = true;
        this.handleGetAll();
    }
}
