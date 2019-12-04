import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

// Se declara la función utilizada en custom.js
declare function init_plugins();

// Declara la librería de Google ya importada
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // ESTE COMPONENTE UTILIZA FORMULARIO POR TEMPLATE

  recuerdame = false;
  email: string;

  // Para generar el token necesario para iniciar sesión con google
  auth2: any;

  constructor( public router: Router, public usuarioService: UsuarioService) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();
    // Si hay un email guardado en localStorage se copia en la variable this.email, sino se copia un vacío. Asi se evitan los Undefined
    this.email = localStorage.getItem('email') || '';

    if (this.email.length > 0) {
      this.recuerdame = true;
    }
  }

  // INICIO SESION CON GOOGLE
  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '441659999765-udg5kb9u60e96lfg06pa4vnknc5ft8hl.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignIn(document.getElementById('btnGoogle'));
    });
  }

  attachSignIn(element) {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      // const profile = googleUser.getBasicProfile();
      const token = googleUser.getAuthResponse().id_token;

      // Esta redirección es distinta a la del login normal porque sino la página no carga bien, no se sabe bien el por qué
      this.usuarioService.loginGoogle(token).subscribe(() => window.location.href = '#/dashboard');
    });
  }
  // **********************************************************************************

  ingresar( forma: NgForm) {
    if (forma.invalid) {
      return;
    }
    const usuario = new Usuario();
    usuario.email = forma.value.email;
    usuario.password = forma.value.password;

    this.usuarioService.login(usuario, forma.value.recuerdame).subscribe(() => this.router.navigate(['/dashboard']));
    // this.router.navigate(['/dashboard'])
  }

}
