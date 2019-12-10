import { Routes, RouterModule } from '@angular/router';

/* COMPONENTES */
import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { RegisterComponent } from './login/register.component';
import { PagesComponent } from './pages/pages.component';
import { LoginGuardGuard } from './services/guards/login-guard.guard';

const appRoutes: Routes = [
    // Estas rutas PADRES van a controlarse con el router-outlet de app.component.html
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuardGuard],
        // Lazy load: Hay que poner la ruta del archivo module seguido de #nombreExport
        loadChildren: './pages/pages.modules#PagesModule'
    },
    { path: '**', component: NopagefoundComponent}
];

/* useHash: true -> añade un # a la url, lo que sirve para evitar que el navegador recargue la pagina. */
export const APP_ROUTES = RouterModule.forRoot(appRoutes, { useHash: true});
