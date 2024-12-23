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
    },
    {
        path: 'customer',
        loadComponent: async () => (await import('./ds-customer/ds-customer.component')).DsCustomerComponent,
        data: {
            title: 'Customer',
            breadcrumbs: ['Dashboard', 'Customer']
        }
    },
    {
        path: 'profile',
        loadComponent: async () => (await import('./ds-customer/ds-customer.component')).DsCustomerComponent,
        data: {
            title: 'Profile',
            breadcrumbs: ['Dashboard', 'Profile']
        }
    },
    {
        path: 'log',
        loadComponent: async () => (await import('./ds-log/ds-log.component')).DsLogComponent,
        data: {
            title: 'Log Aktifitas',
            breadcrumbs: ['Dashboard', 'Log Aktifitas']
        }
    }
]