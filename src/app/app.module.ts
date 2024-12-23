import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { AppComponent } from './app.component';
import { LoadingDialogComponent } from './components/loading-dialog/loading-dialog.component';

import { ConfirmationService, MessageService } from 'primeng/api';

import { environment } from 'src/environments/environment';
import { AuthenticationService } from './services/authentication.service';
import { TitleCasePipe } from '@angular/common';
import { JwtInterceptor } from './middleware/jwt.interceptor';

const config: SocketIoConfig = { url: environment.socket, options: {} };

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        LoadingDialogComponent,
        HttpClientModule,
        ToastModule,
        AppRoutingModule,
        SocketIoModule.forRoot(config)
    ],
    providers: [
        MessageService,
        ConfirmationService,
        TitleCasePipe,
        AuthenticationService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
