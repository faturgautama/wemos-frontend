import { Component, OnDestroy, OnInit } from '@angular/core';
import { ContentLandingComponent } from "../../../components/landing-layout/content-landing/content-landing.component";
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { AccordionModule } from 'primeng/accordion';
import { BehaviorSubject, Subject } from 'rxjs';
import { ContactService } from 'src/app/services/contact.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-lp-home',
    standalone: true,
    imports: [
        ButtonModule,
        CommonModule,
        CarouselModule,
        AccordionModule,
        ContentLandingComponent,
    ],
    templateUrl: './lp-home.component.html',
    styleUrl: './lp-home.component.scss'
})
export class LpHomeComponent implements OnInit, OnDestroy {

    Destroy$ = new Subject();

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

    CarouselResponsiveOptions = [
        {
            breakpoint: '1199px',
            numVisible: 1,
            numScroll: 1
        },
        {
            breakpoint: '991px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '767px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    Faq$ = new BehaviorSubject<any[]>([
        {
            "id": 1,
            "question": "Bagaimana Berlangganan?",
            "answer": "Silahkan pillih paket yang sesuai kebutuhan anda dan lakukan pembayaran"
        },
        {
            "id": 2,
            "question": "Apakah Ada Pelatihannya?",
            "answer": "pelatihan untuk pengguna baru dalam bentuk Training ONLINE, video tutorial, dan dokumen panduan yang tersedia di situs web kami."
        },
        {
            "id": 3,
            "question": "Bagai Mana Kalau Ada Kendala Aplikasi?",
            "answer": "Anda tenang saja, kalau ada error/kendala aplikasi, Tim CS kami selalu standby untuk membantu dan menyelesaikan kendala anda"
        },
        {
            "id": 1,
            "question": "Apa Itu Segara Tumbler?",
            "answer": " Segara Tumbler merupakan Sistem Aplikasi Kebutuhan Air Minum Berbasis Cloud yang terintegrasi dengan Perangkat Tumbler. Segara Tumbler hadir sebagai solusi manajemen informasi kebutuhan air minum berbasis cloud profesional sehingga platform ini dapat diakses berbagai device yang didesain simple dan mudah digunakan untuk Anda."
        }
    ])

    constructor(
        private _router: Router,
        private _contactService: ContactService,
    ) { }

    ngOnInit(): void {

    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }

    goToClientAuth() {
        this._router.navigate(['/dashboard/login']);
    }

    onOpenWhatsapp() {
        this._contactService.onGoToWhatsapp();
    }
}
