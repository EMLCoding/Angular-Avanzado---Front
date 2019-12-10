import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {

  constructor(public usuarioService: UsuarioService, public router: Router) {}

  canActivate(): Promise<boolean> | boolean {
    const token = this.usuarioService.token;
    // Contenido del token
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expirado = this.expirado(payload.exp);

    if (expirado) {
      // Si el token está expirado entonces devuelve un false para indicar a las páginas controladas por este Guard que no van a ser accesibles
      this.router.navigate(['/login']);
      return false;
    }
    return this.verificaRenueva(payload.exp);
  }

  verificaRenueva(fechaExpiracion: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const tokenExpiracion = new Date(fechaExpiracion * 1000);
      const ahora = new Date();

      // Incrementa 'ahora' en 4 horas
      ahora.setTime(ahora.getTime() + (4 * 60 * 60 * 1000));

      if (tokenExpiracion.getTime() > ahora.getTime()) {
        resolve(true);
      } else {
        // El token está cerca de caducar..
        // Asi que se llama al metodo de UsuarioSercice para renovar el token
        this.usuarioService.renuevaToken().subscribe(() => {
          resolve(true);
        }, () => {
          this.router.navigate(['/login']);
          reject(false);
        });
      }

      resolve(true);
    });
  }

  expirado(fechaExpiracion: number) {
    // Fecha expiracion viene en segundos y getTime lo da en milisegundos, por eso se divide entre 1000
    const ahora = new Date().getTime() / 1000;

    if (fechaExpiracion < ahora) {
      return true;
    } else {
      return false;
    }
  }
  
}
