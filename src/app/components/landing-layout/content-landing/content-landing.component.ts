import { Component } from '@angular/core';
import { NavbarLandingComponent } from "../navbar-landing/navbar-landing.component";
import { FooterLandingComponent } from "../footer-landing/footer-landing.component";

@Component({
    selector: 'app-content-landing',
    standalone: true,
    imports: [NavbarLandingComponent, FooterLandingComponent],
    templateUrl: './content-landing.component.html',
    styleUrl: './content-landing.component.scss'
})
export class ContentLandingComponent {

}
