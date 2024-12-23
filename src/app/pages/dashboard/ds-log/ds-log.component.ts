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
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DashboardModel } from 'src/app/model/components/dashboard.model';
import { ActivatedRoute } from '@angular/router';

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
        TableModule,
        OverlayPanelModule,
    ],
    templateUrl: './ds-log.component.html',
    styleUrl: './ds-log.component.scss'
})
export class DsLogComponent implements OnInit, OnDestroy {

    Destroy$ = new Subject();

    IsDetailPage = false;

    ButtonDashboard: DashboardModel.IButton[] = []

    LogDatasource: any[] = [];

    TanggalFilter: Date = new Date();

    DetailLog: any;

    constructor(
        private _logService: LogService,
        private _activatedRoute: ActivatedRoute,
    ) {
        this._logService
            .RefreshData$
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                this.handleGetAll();
            })
    }

    ngOnInit(): void {
        this.handleGetAll();
    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }

    handleClickButtonDashboard(args: any) {
        if (args.id == 'back') {
            this.IsDetailPage = false;
            this.ButtonDashboard = [];
        }
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

    handleGetById(id_tumbler_log: string) {
        this._logService
            .getById(id_tumbler_log)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result: any) => {
                if (result.status) {
                    this.IsDetailPage = true;

                    this.ButtonDashboard = [
                        { id: 'back', caption: 'Kembali', icon: 'pi pi-chevron-left' }
                    ];

                    this.DetailLog = {
                        ...result.data,
                        date_time: formatDate(new Date(result.data.date_time), 'dd-MM-yyyy HH:mm', 'EN'),
                        initial_fill_litre: `${result.data.initial_fill_litre} Liter`,
                        total_consume_litre: `${result.data.total_consume_litre} Liter`,
                        total_fill_litre: `${result.data.total_fill_litre} Liter`,
                    };
                }
            })
    }
}
