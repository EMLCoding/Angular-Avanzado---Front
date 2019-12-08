import { NgModule } from '@angular/core';

// COMPONENTES
import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { PromesasComponent } from './promesas/promesas.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';


// MODULOS
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';

// PIPES MODULOS
import { PipesModule } from '../pipes/pipes.module';

// TODO: ELIMINAR
import { IncrementadorComponent } from '../componentsReutilizables/incrementador/incrementador.component';
import { GraficoDonaComponent } from '../componentsReutilizables/grafico-dona/grafico-dona.component';

// RUTAS 
import { PAGES_ROUTES } from './pages.routes';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { RxjsComponent } from './rxjs/rxjs.component';

@NgModule( {
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        IncrementadorComponent,
        GraficoDonaComponent,
        AccountSettingComponent,
        PromesasComponent,
        RxjsComponent,
        ProfileComponent,
        UsuariosComponent,
        ModalUploadComponent,
        HospitalesComponent,
        MedicosComponent,
        MedicoComponent,
        BusquedaComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule,
        PipesModule
    ],
    exports: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
    ]
})

export class PagesModule {}