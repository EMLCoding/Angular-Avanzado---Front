import { Routes, RouterModule } from '@angular/router';

/* COMPONENTES */
import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { RegisterComponent } from './login/register.component';

const appRoutes: Routes = [
    // Estas rutas PADRES van a controlarse con el router-outlet de app.component.html
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: '**', component: NopagefoundComponent}
];

/* useHash: true -> añade un # a la url, lo que sirve para evitar que el navegador recargue la pagina. */
export const APP_ROUTES = RouterModule.forRoot(appRoutes, { useHash: true});
