import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard/login',
        pathMatch: 'full'
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
