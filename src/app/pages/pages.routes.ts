import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

import { LoginGuardGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';

// Aquí van todas las rutas HIJAS de los componentes de "pages"
const pagesRoutes: Routes = [
    // El 'canActivate' sirve para especificar si las rutas se van a ver afectadas por un Guard
    { path: '', component: PagesComponent, canActivate: [LoginGuardGuard], children: [
        /* Estas rutas HIJAS van a controlarse con el router-outlet de pages.component.html */
        // El "data" permite establecer un objeto para las rutas que puede contener variables de interés que creemos nosotros
        { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard'}},
        { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress'}},
        { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Gráficas'}},
        { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas'}},
        { path: 'observables', component: RxjsComponent, data: { titulo: 'Observables'}},
        { path: 'account-settings', component: AccountSettingComponent, data: { titulo: 'Ajustes de usuario'}},
        { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil de usuario'}},
        { path: 'busqueda/:termino', component: BusquedaComponent, data: { titulo: 'Buscador'}},
        // Mantenimientos
        { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Mantenimiento de usuarios'}},
        { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Mantenimiento de hospitales'}},
        { path: 'medicos', component: MedicosComponent, data: { titulo: 'Mantenimiento de médicos'}},
        { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Actualizar médico'}},
        { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    ]},
];

// Este export debe ir en el pages.module.ts. "forChild" porque son rutas hijas con respecto a las de app.routes.ts
// Luego el pages.module esta importado dentro de app.module, y por ello el app.routes puede coger estas rutas hijas. Así está todo bien conectado
export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
