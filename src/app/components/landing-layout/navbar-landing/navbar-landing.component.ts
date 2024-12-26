import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-navbar-landing',
    standalone: true,
    imports: [
        ButtonModule
    ],
    templateUrl: './navbar-landing.component.html',
    styleUrl: './navbar-landing.component.scss'
})
export class NavbarLandingComponent {

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
