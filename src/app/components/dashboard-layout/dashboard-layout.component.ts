import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { BehaviorSubject, map, Subject, takeUntil } from 'rxjs';
import { DashboardModel } from 'src/app/model/components/dashboard.model';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
    selector: 'app-dashboard-layout',
    standalone: true,
    imports: [
        CommonModule,
        ButtonModule,
    ],
    templateUrl: './dashboard-layout.component.html',
    styleUrl: './dashboard-layout.component.scss'
})
export class DashboardLayoutComponent implements OnInit, OnDestroy {

    Destroy$ = new Subject();

    UserData$ = this._autheticationService.UserData$
        .pipe(takeUntil(this.Destroy$));

    ShowSidebar = false;

    SidebarMenu$ = new BehaviorSubject<any[]>([
        {
            id: '1',
            caption: 'Home',
            icon: 'pi pi-home',
            toggle_child: false,
            url: '/dashboard/home'
        },
        {
            id: '2',
            caption: 'Perangkat Anda',
            icon: 'pi pi-mobile',
            toggle_child: false,
            url: '/dashboard/perangkat'
        },
        {
            id: '3',
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
    ]);

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

    @Input('button') button!: DashboardModel.IButton[];

    @Output('onClickButton') onClickButton = new EventEmitter<DashboardModel.IButton>();

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _autheticationService: AuthenticationService,
    ) {
        this._activatedRoute.url
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                this.IsBeranda = result[0].path == 'beranda';
            })
    }

    ngOnInit(): void {

    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
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
        // this._router.navigateByUrl(item.url);
    }
}
