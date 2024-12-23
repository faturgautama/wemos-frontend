import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { BehaviorSubject, map, Subject, takeUntil, tap } from 'rxjs';
import { DashboardModel } from 'src/app/model/components/dashboard.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { UtilityService } from 'src/app/services/utility.service';
import { MessageService } from 'primeng/api';
import { NotificationService } from 'src/app/services/notification.service';
import { Socket } from 'ngx-socket-io';
import { LogService } from 'src/app/services/log.service';

@Component({
    selector: 'app-dashboard-layout',
    standalone: true,
    imports: [
        CommonModule,
        ButtonModule,
        OverlayPanelModule
    ],
    templateUrl: './dashboard-layout.component.html',
    styleUrl: './dashboard-layout.component.scss'
})
export class DashboardLayoutComponent implements OnInit, OnDestroy {

    Destroy$ = new Subject();

    ShowSidebar = false;

    SidebarMenu$ = new BehaviorSubject<any[]>([]);

    UserData$ = this._autheticationService
        .UserData$
        .pipe(
            takeUntil(this.Destroy$),
            tap((result) => {
                if (result.id_customer) {
                    this.SidebarMenu$.next([
                        {
                            id: '1',
                            caption: 'Home',
                            icon: 'pi pi-home',
                            toggle_child: false,
                            url: '/dashboard/beranda'
                        },
                        {
                            id: '2',
                            caption: 'Profile Anda',
                            icon: 'pi pi-user',
                            toggle_child: false,
                            url: '/dashboard/profile'
                        },
                        {
                            id: '4',
                            caption: 'Log Aktifitas',
                            icon: 'pi pi-list',
                            toggle_child: false,
                            url: '/dashboard/log'
                        },
                    ])
                } else {
                    this.SidebarMenu$.next([
                        {
                            id: '1',
                            caption: 'Home',
                            icon: 'pi pi-home',
                            toggle_child: false,
                            url: '/dashboard/beranda'
                        },
                        {
                            id: '3',
                            caption: 'Customer',
                            icon: 'pi pi-user',
                            toggle_child: false,
                            url: '/dashboard/customer'
                        },
                        {
                            id: '4',
                            caption: 'Log Aktifitas',
                            icon: 'pi pi-list',
                            toggle_child: false,
                            url: '/dashboard/log'
                        },
                    ])
                }
            })
        )

    IsBeranda = false;

    Title$ = this._activatedRoute.data
        .pipe(
            takeUntil(this.Destroy$),
            map(result => result['title'])
        );

    Breadcrumbs$ = this._activatedRoute.data
        .pipe(
            takeUntil(this.Destroy$),
            map(result => result['breadcrumbs'])
        );


    Notifikasi: any[] = [];

    @Input('button') button!: DashboardModel.IButton[];

    @Output('onClickButton') onClickButton = new EventEmitter<DashboardModel.IButton>();

    constructor(
        private _router: Router,
        private _socket: Socket,
        private _logService: LogService,
        private _utilityService: UtilityService,
        private _activatedRoute: ActivatedRoute,
        private _messageService: MessageService,
        private _notificationService: NotificationService,
        private _autheticationService: AuthenticationService,
    ) {
        this._activatedRoute.url
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                this.IsBeranda = result[0].path == 'beranda';
            });

        this._socket
            .fromEvent('getNotif')
            .pipe(
                takeUntil(this.Destroy$),
                map((result: any) => {
                    const user = this._autheticationService.getUserData();
                    return result.includes(user.id_customer);
                })
            )
            .subscribe((result: any) => {
                if (result) {
                    this._messageService.add({ severity: 'info', summary: 'Notifikasi Baru', detail: 'Anda Memiliki Notifikasi Baru' })
                    this.getAllNotification();

                    const currentUrl = this._activatedRoute.snapshot.url[0].path;

                    if (currentUrl == 'log') {
                        this._logService.RefreshData$.next(true);
                    };
                }
            })
    }

    ngOnInit(): void {
        this._autheticationService.setUserData();

        const user = this._autheticationService.getUserData();
        if (user.id_customer) {
            this.getAllNotification();
        }
    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }

    private getAllNotification() {
        this._notificationService
            .getAll()
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                this.Notifikasi = result.data;
            })
    }

    handleUpdateNotification(id_notification: number, url: string) {
        this._notificationService
            .update(id_notification)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.status) {
                    this.getAllNotification();

                    const currentUrl = this._activatedRoute.snapshot.url[0].path;

                    if (currentUrl == 'log') {
                        this._logService.RefreshData$.next(true);
                    } else {
                        this._router.navigateByUrl(url);
                    }
                }
            })
    }

    handleDeleteNotification(id_notification: number) {
        this._notificationService
            .delete(id_notification)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.status) {
                    this.getAllNotification();
                }
            })
    }

    handleButtonClick(args: DashboardModel.IButton) {
        this.onClickButton.emit(args);
    }

    handleShowSidebarWhenMouseOver() {
        this.ShowSidebar = true;

        const sidebarEl = document.getElementById('sidebar') as HTMLElement;
        sidebarEl.classList.replace("w-[5rem]", "w-[20rem]");
    }

    handleHideSidebarWhenMouseLeave() {
        this.ShowSidebar = false;

        const sidebarEl = document.getElementById('sidebar') as HTMLElement;
        sidebarEl.classList.replace("w-[20rem]", "w-[5rem]");

        // let sidebarMenu = this._authenticationService.SidebarMenu$.value.map((item) => {
        //     return {
        //         ...item,
        //         toggle_child: false
        //     }
        // });

        // this._authenticationService.SidebarMenu$.next([]);
        // this._authenticationService.SidebarMenu$.next(sidebarMenu);
    }

    handleClickSidebarMenu(item: any) {
        this.handleHideSidebarWhenMouseLeave();
        this._router.navigateByUrl(item.url);
    }

    handleBackToHome() {
        this._router.navigateByUrl('dashboard/beranda');
    }

    handleSignOut() {
        this._utilityService.ShowLoading$.next(true);

        setTimeout(() => {
            this._utilityService.ShowLoading$.next(false);
            this._messageService.clear();
            this._messageService.add({ severity: 'success', summary: 'Berhasil', detail: 'Sign Out Berhasil' });

            this._router.navigateByUrl('dashboard/login')
        }, 2000);
    }
}
