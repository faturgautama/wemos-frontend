import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ContactService {

    constructor() { }

    onGoToWhatsapp() {
        window.open("https://api.whatsapp.com/send/?phone=6282211777452&text=Halo, saya ingin bertanya soal Segara Tumbler");
    }
}
