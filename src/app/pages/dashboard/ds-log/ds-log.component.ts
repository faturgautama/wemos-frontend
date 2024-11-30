import { Component } from '@angular/core';
import { DashboardLayoutComponent } from "../../../components/dashboard-layout/dashboard-layout.component";
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

@Component({
    selector: 'app-ds-log',
    standalone: true,
    imports: [
        CommonModule,
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
export class DsLogComponent {

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
    ]
}
