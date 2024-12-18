import { Component, OnDestroy, OnInit } from '@angular/core';
import { DashboardLayoutComponent } from "../../../components/dashboard-layout/dashboard-layout.component";
import { CommonModule, formatDate } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Subject, takeUntil } from 'rxjs';
import { LogService } from 'src/app/services/log.service';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-ds-log',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        DashboardLayoutComponent,
        InputTextModule,
        CalendarModule,
        DropdownModule,
        ButtonModule,
        TableModule
    ],
    templateUrl: './ds-log.component.html',
    styleUrl: './ds-log.component.scss'
})
export class DsLogComponent implements OnInit, OnDestroy {

    Destroy$ = new Subject();

    LogDatasource: any[] = [
        {
            id: 1,
            device_name: 'Device Thermos A',
            tanggal: new Date('2024-11-30 07:18'),
            liter: 0.5,
            notes: '-',
        },
        {
            id: 2,
            device_name: 'Device Thermos A',
            tanggal: new Date('2024-11-30 09:15'),
            liter: 0.5,
            notes: '-',
        },
        {
            id: 3,
            device_name: 'Device Thermos A',
            tanggal: new Date('2024-11-30 10:34'),
            liter: 0.44,
            notes: '-',
        },
        {
            id: 4,
            device_name: 'Device Thermos A',
            tanggal: new Date('2024-11-30 15:32'),
            liter: 0.22,
            notes: '-',
        },
    ];

    TanggalFilter: Date = new Date();

    constructor(
        private _logService: LogService,
    ) { }

    ngOnInit(): void {
        this.handleGetAll();
    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }

    handleGetAll() {
        let query: any = {
            date_time: formatDate(this.TanggalFilter, 'yyyy-MM-dd', 'en-US'),
        };

        this._logService
            .getAll(query)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.status) {
                    this.LogDatasource = result.data;
                }
            })
    }
}
