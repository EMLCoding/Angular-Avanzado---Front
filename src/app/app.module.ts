import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// RUTAS
import { APP_ROUTES } from './app.routes';

// TODO: ELIMINAR
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// COMPONENTES
import { PagesModule } from './pages/pages.modules';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';


// SERVICIOS
import { ServiceModule } from './services/service.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    PagesModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    ServiceModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
