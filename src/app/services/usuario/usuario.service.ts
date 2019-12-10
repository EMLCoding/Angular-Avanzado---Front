import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import 'rxjs/add/operator/map';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subirArchivo/subir-archivo.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any = [];

  constructor(public http: HttpClient, public router: Router, public subirArchivoService: SubirArchivoService) {
    this.cargarStorage();
  }

  renuevaToken() {
    let url = URL_SERVICIOS + '/login/renuevatoken';
    url += '?token=' + this.token;

    return this.http.get(url).map((respuesta: any) => {
      this.token = respuesta.token;
      localStorage.setItem('token', this.token);

      return true;
    }).catch(err => {
      // Si no se pudo renovar el token...
      this.router.navigate(['/login']);
      Swal.fire({
        icon: 'error',
        title: 'No se pudo renovar el token',
        text: ''
      });
      return Observable.throw(err);
    })
  }

  crearUsuario(usuario: Usuario) {
    const url = URL_SERVICIOS + '/usuario';
    return this.http.post(url, usuario).map( (respuesta: any) => {
      Swal.fire({
        icon: 'success',
        title: 'Usuario Creado',
        text: usuario.email
      });
      return respuesta.usuario;
    }).catch(err => {
      Swal.fire({
        icon: 'error',
        title: err.error.mensaje,
        text: err.error.errors.message
      });
      return Observable.throw(err);
    });
  }

  actualizarUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario/' + this.usuario['_id'];
    url += '?token=' + this.token;

    return this.http.put(url, usuario).map((respuesta: any) => {

      if (usuario['_id'] === this.usuario['_id']) {
        const usuarioDB: Usuario = respuesta.usuario;
        this.guardarStorage(usuarioDB.id, this.token, usuarioDB, this.menu);
      }

      Swal.fire({
        icon: 'success',
        title: 'Usuario Actualizado',
        text: usuario.nombre
      });
      return true;
    });
  }

  borrarUsuario(id: string) {
    let url = URL_SERVICIOS + '/usuario/' + id;
    url += '?token=' + this.token;

    return this.http.delete(url);
  }

  cargarUsuarios( desde: number = 0) {
    const url = URL_SERVICIOS + '/usuario?desde=' + desde;

    return this.http.get(url);
  }

  buscarUsuario(valor: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + valor;
    return this.http.get(url).map((respuesta: any) => respuesta.usuarios);
  }

  cambiarImagen(archivo: File, id: string) {
    this.subirArchivoService.subirArchivo(archivo, 'usuarios', id).then((respuesta: any) => {
      this.usuario.img = respuesta.usuario.img;
      Swal.fire({
        icon: 'success',
        title: 'Imagen Actualizado',
        text: this.usuario.nombre
      });
      this.guardarStorage(id, this.token, this.usuario, this.menu);
    }).catch(respuesta => {
      console.log(respuesta);
    })
  }

  estaLogueado() {
    if (this.token === 'undefined') {
      return;
    } else {
      return(this.token.length > 5) ? true : false;
    }
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      if (localStorage.getItem('usuario') !== 'undefined') {
        this.usuario = JSON.parse(localStorage.getItem('usuario'));
        this.menu = JSON.parse(localStorage.getItem('menu'));
      }
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  login(usuario: Usuario, recordar: boolean = false) {

    // Sirve para guardar en el localstorage el email en caso de que se haya marcado el checkbox de "Recuerdame"
    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }
    const url = URL_SERVICIOS + '/login';
    return this.http.post(url, usuario).map((respuesta: any) => {
      this.guardarStorage(respuesta.id, respuesta.token, respuesta.usuario, respuesta.menu);
      return true;
    }).catch(err => {
      Swal.fire({
        icon: 'error',
        title: 'Error en el login',
        text: err.error.mensaje
      });
      return Observable.throw(err);
    });
  }

  loginGoogle(token: string) {
    const url = URL_SERVICIOS + '/login/google';

    return this.http.post(url, {token}).map((respuesta: any) => {
      this.guardarStorage(respuesta.id, respuesta.token, respuesta.usuario, respuesta.menu);
      return true;
    });
  }

  logout() {
    this.usuario = null;
    this.token = '';
    this.menu = [];
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');

    this.router.navigate(['/login']);
  }
}
