import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { DashboardLayoutComponent } from 'src/app/components/dashboard-layout/dashboard-layout.component';
import { DashboardModel } from 'src/app/model/components/dashboard.model';

@Component({
    selector: 'app-ds-home',
    standalone: true,
    imports: [
        CommonModule,
        DashboardLayoutComponent
    ],
    templateUrl: './ds-home.component.html',
    styleUrl: './ds-home.component.scss'
})
export class DsHomeComponent implements OnInit, OnDestroy {

    Destroy$ = new Subject();

    DashboardButton: DashboardModel.IButton[] = [
        { id: 'save', caption: 'Save', icon: 'pi pi-save' }
    ]

    constructor() { }

    ngOnInit(): void {

    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }
}
