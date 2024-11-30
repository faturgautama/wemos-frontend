import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { ConfirmationService, MessageService } from 'primeng/api';
import { LoadingDialogComponent } from './components/loading-dialog/loading-dialog.component';

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
        AppRoutingModule
    ],
    providers: [
        MessageService,
        ConfirmationService,
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
