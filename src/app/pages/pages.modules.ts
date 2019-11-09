import { NgModule } from '@angular/core';

// COMPONENTES
import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';

// MODULOS
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


// TODO: ELIMINAR
import { IncrementadorComponent } from '../componentsReutilizables/incrementador/incrementador.component';

// RUTAS 
import { PAGES_ROUTES } from './pages.routes';


@NgModule( {
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        IncrementadorComponent
    ],
    imports: [
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
    ],
    exports: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
    ]
})

export class PagesModule {}