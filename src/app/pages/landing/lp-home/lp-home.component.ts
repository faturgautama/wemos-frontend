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
            "content": "Tracking aktivitas minum Anda menjadi lebih mudah dengan Segara Tumbler karena akan tercatat secara otomatis. Dengan fitur pencatatan digital melalui website yang terhubung, Anda dapat melihat histori konsumsi air Anda. Anda dapat mengukur kemajuan hidrasi harian, mingguan, hingga bulanan, sehingga membantu Anda membangun kebiasaan minum air yang lebih teratur dan sehat. Fitur ini membantu Anda tetap teratur dalam menjaga hidrasi tubuh, dan memberikan wawasan tentang bagaimana Anda dapat meningkatkan pola hidup sehat."
        },
        {
            "id": 2,
            "icon": "pi pi-microchip",
            "title": "Terintegrasi Dengan IoT",
            "content": "Teknologi IoT yang tertanam dalam tumbler ini membawa pengalaman hidrasi Anda ke tingkat berikutnya. Tumbler ini dapat terhubung langsung dengan aplikasi di ponsel Anda, mencatat data secara otomatis dan memberikan laporan yang terorganisir. Dengan integrasi ini, Anda bisa memantau pola minum air, mengakses data kapan saja, serta menyinkronkannya dengan perangkat kesehatan lain untuk analisis yang lebih mendalam."
        },
        {
            "id": 3,
            "icon": "pi pi-bell",
            "title": "Notifikasi Realtime Aktifitas Anda",
            "content": "Jangan biarkan kesibukan Anda membuat Anda lupa minum air. Segara Tumbler dilengkapi dengan fitur notifikasi real-time yang terintegrasi dengan website. Notifikasi ini memastikan Anda tetap terhidrasi, dan membuat Anda dapat memantau kebutuhan air kapan saja. Tidak hanya canggih, tetapi juga fleksibel untuk disesuaikan dengan gaya hidup dan kebutuhan Anda."
        },
        {
            "id": 4,
            "icon": "pi pi-list-check",
            "title": "Pantau Kebutuhan Air Minum Dimana Saja",
            "content": "Segara Tumblr dirancang sebagai pendamping hidrasi yang andal, memungkinkan Anda untuk memantau kebutuhan air kapan saja dan di mana saja. Dengan desain simpel dan fitur canggih, botol ini melacak asupan cairan harian Anda melalui aplikasi yang terhubung langsung, lengkap dengan pengingat untuk menjaga hidrasi tubuh sepanjang hari, bahkan saat Anda beraktivitas di luar rumah."
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
