import { CommonModule, formatDate, formatNumber } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';
import { Subject, takeUntil } from 'rxjs';
import { DashboardLayoutComponent } from 'src/app/components/dashboard-layout/dashboard-layout.component';
import { DashboardModel } from 'src/app/model/components/dashboard.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
    selector: 'app-ds-home',
    standalone: true,
    imports: [
        CommonModule,
        DashboardLayoutComponent,
        NgApexchartsModule
    ],
    templateUrl: './ds-home.component.html',
    styleUrl: './ds-home.component.scss'
})
export class DsHomeComponent implements OnInit, OnDestroy {

    Destroy$ = new Subject();

    UserData$ = this._authentiationService.UserData$
        .pipe(takeUntil(this.Destroy$))

    DashboardButton: DashboardModel.IButton[] = [
        { id: 'save', caption: 'Save', icon: 'pi pi-save' }
    ];

    Chart: any = {};

    ChartKonsumsiHariIni: any = {};

    ReportCustomer: any;

    constructor(
        private _router: Router,
        private _customerService: CustomerService,
        private _authentiationService: AuthenticationService,
    ) { }

    ngOnInit(): void {
        this._prepareChartData();

        // Attach SVG fill fixer to all ApexCharts
        (window as any)['Apex'] = {
            chart: {
                events: {
                    mounted: (chart: any, options?: any): void => {
                        this._fixSvgFill(chart.el);
                    },
                    updated: (chart: any, options?: any): void => {
                        this._fixSvgFill(chart.el);
                    },
                },
            },
        };

        this.Chart.labels = [];

        this.Chart.series = [];
        this.Chart.series = [
            {
                name: 'Konsumsi',
                data: [],
            }
        ];

        this.ChartKonsumsiHariIni.labels = [];

        this.ChartKonsumsiHariIni.series = [];
        this.ChartKonsumsiHariIni.series = [
            {
                name: 'Konsumsi',
                data: [],
            }
        ];
    }

    private _fixSvgFill(element: Element): void {
        // Current URL
        const currentURL = this._router.url;

        // 1. Find all elements with 'fill' attribute within the element
        // 2. Filter out the ones that doesn't have cross reference so we only left with the ones that use the 'url(#id)' syntax
        // 3. Insert the 'currentURL' at the front of the 'fill' attribute value
        Array.from(element.querySelectorAll('*[fill]'))
            .filter((el) => el.getAttribute('fill')!.indexOf('url(') !== -1)
            .forEach((el) => {
                const attrVal = el.getAttribute('fill')!;
                el.setAttribute(
                    'fill',
                    `url(${currentURL}${attrVal.slice(attrVal.indexOf('#'))}`
                );
            });
    }

    private _prepareChartData(): void {
        this.Chart = {
            chart: {
                fontFamily: 'inherit',
                foreColor: 'inherit',
                height: '100%',
                type: 'line',
                toolbar: {
                    show: false,
                },
                zoom: {
                    enabled: false,
                },
            },
            colors: ['#64748B', '#94A3B8'],
            dataLabels: {
                enabled: true,
                enabledOnSeries: [0],
                background: {
                    borderWidth: 0,
                },
                formatter: function (value: number) {
                    return formatNumber(value, 'EN')
                },
                style: {
                    fontSize: '11px'
                }
            },
            grid: {
                borderColor: '#D1D5DB',
            },
            labels: [''],
            legend: {
                show: false,
            },
            plotOptions: {
                bar: {
                    columnWidth: '50%',
                },
            },
            series: [0],
            states: {
                hover: {
                    filter: {
                        type: 'darken',
                        value: 0.75,
                    },
                },
            },
            stroke: {
                curve: 'smooth',
                width: [3, 0],
            },
            tooltip: {
                followCursor: true,
                theme: 'dark',
                y: {
                    formatter: function (value: any) {
                        return formatNumber(value, 'EN',)
                    }
                }
            },
            xaxis: {
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    color: '#D1D5DB',
                },
                labels: {
                    style: {
                        colors: '#1F2937',
                    },
                },
                tooltip: {
                    enabled: false,
                },
            },
            yaxis: {
                labels: {
                    offsetX: -16,
                    style: {
                        colors: '#374151',
                    },
                    formatter: function (value: any) {
                        return formatNumber(value, 'EN')
                    }
                },
            },
        };

        this.ChartKonsumsiHariIni = {
            chart: {
                fontFamily: 'inherit',
                foreColor: 'inherit',
                height: '100%',
                type: 'bar',
                toolbar: {
                    show: false,
                },
                zoom: {
                    enabled: false,
                },
            },
            colors: ['#64748B', '#94A3B8'],
            dataLabels: {
                enabled: false,
            },
            grid: {
                borderColor: '#D1D5DB',
            },
            labels: [''],
            legend: {
                show: false,
            },
            plotOptions: {
                bar: {
                    columnWidth: '10%',
                    horizontal: true,
                    borderRadius: 2,
                    borderRadiusApplication: 'end',
                },
            },
            states: {
                hover: {
                    filter: {
                        type: 'darken',
                        value: 0.75,
                    },
                },
            },
            stroke: {
                curve: 'smooth',
                width: [3, 0],
            },
            tooltip: {
                followCursor: true,
                theme: 'dark',
                y: {
                    formatter: function (value: any) {
                        return formatNumber(value, 'EN',)
                    }
                }
            },
            xaxis: {
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    color: '#D1D5DB',
                },
                labels: {
                    style: {
                        colors: '#1F2937',
                    },
                },
                tooltip: {
                    enabled: false,
                },
                categories: []
            },
            // yaxis: {
            //     labels: {
            //         offsetX: -16,
            //         style: {
            //             colors: '#374151',
            //         },
            //         formatter: function (value: any) {
            //             return formatNumber(value, 'EN')
            //         }
            //     },
            // },
        };

        this.getReportCustomer();
    }

    private getReportCustomer() {
        const id_customer = JSON.parse(localStorage.getItem("_WEMOS_LOGIN_DATA_") as any).id_customer;

        this._customerService
            .getReport(id_customer)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result: any) => {
                if (result.status) {
                    this.ReportCustomer = result.data;

                    this.Chart.labels = [];
                    this.Chart.series = [
                        {
                            name: 'Konsumsi',
                            data: []
                        }
                    ];

                    result.data['weekly_consume'].forEach((item: any) => {
                        this.Chart.labels.push(formatDate(new Date(item.date_time), 'dd MMM yyyy', 'EN'));
                        this.Chart.series[0].data.push(item.litre);
                    });

                    this.ChartKonsumsiHariIni.labels = [];
                    this.ChartKonsumsiHariIni.series = [
                        {
                            name: 'Konsumsi',
                            data: []
                        }
                    ];

                    result.data['today_consume'].forEach((item: any) => {
                        const date_time = formatDate(new Date(item.date_time), 'HH:mm', 'EN');
                        console.log("time consume =>", date_time);

                        this.ChartKonsumsiHariIni.labels.push(date_time);
                        this.ChartKonsumsiHariIni.series[0].data.push(item.litre);
                    });
                }
            })
    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }
}
