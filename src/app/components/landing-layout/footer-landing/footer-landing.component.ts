import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { ContactService } from 'src/app/services/contact.service';

@Component({
    selector: 'app-footer-landing',
    standalone: true,
    imports: [
        CommonModule,
        ButtonModule
    ],
    templateUrl: './footer-landing.component.html',
    styleUrl: './footer-landing.component.scss'
})
export class FooterLandingComponent implements OnDestroy {

    Destroy$ = new Subject();

    Year = new Date().getFullYear();

    Fitur$ = new BehaviorSubject<any[]>([
        {
            "id": 1,
            "icon": "pi pi-file-check",
            "title": "Catat Aktifitas Air Minum Anda",
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        },
        {
            "id": 2,
            "icon": "pi pi-microchip",
            "title": "Terintegrasi Dengan IoT",
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        },
        {
            "id": 3,
            "icon": "pi pi-bell",
            "title": "Notifikasi Realtime Aktifitas Anda",
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        },
        {
            "id": 4,
            "icon": "pi pi-list-check",
            "title": "Pantau Kebutuhan Air Minum Dimana Saja",
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        },
    ]);

    constructor(
        private _contactService: ContactService,
    ) { }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }

    onOpenWhatsapp() {
        this._contactService.onGoToWhatsapp();
    }

    scrollToView(id: string) {
        const el = document.getElementById(id) as HTMLElement;
        const offsetPosition = el.getBoundingClientRect().top + window.scrollY - 50;

        if (el) {
            setTimeout(() => {
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }, 100);
        }
    }

}
