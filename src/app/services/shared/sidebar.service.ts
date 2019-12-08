import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  // El menú viene desde el back en función del usuario que haya iniciado sesión

  menu: any[] = [];
  constructor(public usuarioService: UsuarioService) {}

  cargarMenu() {
   this.menu = this.usuarioService.menu;
  }
}
