import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';

// Aquí van todas las rutas HIJAS de los componentes de "pages"
const pagesRoutes: Routes = [
    { path: '', component: PagesComponent, children: [
        /* Estas rutas HIJAS van a controlarse con el router-outlet de pages.component.html */
        { path: 'dashboard', component: DashboardComponent},
        { path: 'progress', component: ProgressComponent},
        { path: 'graficas1', component: Graficas1Component},
        { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    ]},
];

// Este export debe ir en el pages.module.ts. "forChild" porque son rutas hijas con respecto a las de app.routes.ts
// Luego el pages.module esta importado dentro de app.module, y por ello el app.routes puede coger estas rutas hijas. Así está todo bien conectado
export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
