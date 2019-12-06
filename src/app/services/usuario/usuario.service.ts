import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import 'rxjs/add/operator/map';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subirArchivo/subir-archivo.service';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(public http: HttpClient, public router: Router, public subirArchivoService: SubirArchivoService) {
    this.cargarStorage();
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
    });
  }

  actualizarUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario/' + this.usuario['_id'];
    url += '?token=' + this.token;

    return this.http.put(url, usuario).pipe(map((respuesta: any) => {

      if (usuario['_id'] === this.usuario['_id']) {
        const usuarioDB: Usuario = respuesta.usuario;
        this.guardarStorage(usuarioDB.id, this.token, usuarioDB);
      }

      Swal.fire({
        icon: 'success',
        title: 'Usuario Actualizado',
        text: usuario.nombre
      });
      return true;
    }));
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
    return this.http.get(url).pipe(map((respuesta: any) => respuesta.usuarios));
  }

  cambiarImagen(archivo: File, id: string) {
    this.subirArchivoService.subirArchivo(archivo, 'usuarios', id).then((respuesta: any) => {
      this.usuario.img = respuesta.usuario.img;
      Swal.fire({
        icon: 'success',
        title: 'Imagen Actualizado',
        text: this.usuario.nombre
      });
      this.guardarStorage(id, this.token, this.usuario);
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
      }
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  login(usuario: Usuario, recordar: boolean = false) {

    // Sirve para guardar en el localstorage el email en caso de que se haya marcado el checkbox de "Recuerdame"
    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }
    const url = URL_SERVICIOS + '/login';
    return this.http.post(url, usuario).pipe(map((respuesta: any) => {
      this.guardarStorage(respuesta.id, respuesta.token, respuesta.usuario);
      return true;
    }));
  }

  loginGoogle(token: string) {
    const url = URL_SERVICIOS + '/login/google';

    return this.http.post(url, {token}).pipe(map((respuesta: any) => {
      this.guardarStorage(respuesta.id, respuesta.token, respuesta.usuario);
      return true;
    }));
  }

  logout() {
    this.usuario = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);
  }
}
