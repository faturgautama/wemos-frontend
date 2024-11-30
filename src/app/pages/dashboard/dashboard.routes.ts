import { Routes } from "@angular/router";

export const dashboardRoutes: Routes = [
    {
        path: 'login',
        loadComponent: async () => (await import('./ds-login/ds-login.component')).DsLoginComponent,
        data: {
            title: 'Beranda',
            breadcrumbs: ['Dashboard', 'Login']
        }
    },
    {
        path: 'beranda',
        loadComponent: async () => (await import('./ds-home/ds-home.component')).DsHomeComponent,
        data: {
            title: 'Beranda',
            breadcrumbs: ['Dashboard', 'Beranda']
        }
    }
]