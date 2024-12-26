import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        loadComponent: async () => (await import('./pages/landing/lp-home/lp-home.component')).LpHomeComponent
    },
    {
        path: 'dashboard',
        loadChildren: async () => (await import('./pages/dashboard/dashboard.routes')).dashboardRoutes
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
