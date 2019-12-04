import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import {
  SettingsService,
  SidebarService,
  SharedService,
  UsuarioService,
  LoginGuardGuard
} from './service.index';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    UsuarioService,
    LoginGuardGuard
  ]
})
export class ServiceModule { }
