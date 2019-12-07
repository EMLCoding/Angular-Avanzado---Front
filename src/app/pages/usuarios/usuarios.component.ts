import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';

import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde = 0;
  totalRegistros = 0;

  cargando = true;

  constructor(public usuarioService: UsuarioService, public modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarUsuarios();

    this.modalUploadService.notificacion.subscribe(respuesta => this.cargarUsuarios());
  }

  cargarUsuarios() {
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.desde).subscribe((respuesta: any) => {
      console.log(respuesta);
      this.totalRegistros = respuesta.total;
      this.usuarios = respuesta.usuarios;
      this.cargando = false;
    })
  }

  cambiarDesde(valor: number) {
    const desde = this.desde + valor;

    if (desde >= this.totalRegistros) {
      return;
    }

    if (desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();
  }

  buscarUsuario(valor: string) {
    if (valor.length <= 0) {
      this.cargarUsuarios();
      return;
    }
    this.usuarioService.buscarUsuario(valor).subscribe((usuarios: Usuario[]) => {
      this.usuarios = usuarios;
    });
  }

  guardarUsuario(usuario: Usuario) {
    this.usuarioService.actualizarUsuario(usuario).subscribe();
  }

  borrarUsuario(usuario: Usuario) {
    if (usuario['_id'] === this.usuarioService.usuario['_id']) {
      Swal.fire({
        icon: 'error',
        title: 'Error al borrar usuario',
        text: 'No se puede borrar a si mismo'
      });
      return;
    }
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Está a punto de borrar a ' + usuario.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then(borrar => {
      if (borrar.value) {
        this.usuarioService.borrarUsuario(usuario['_id']).subscribe(respuesta => {
          Swal.fire(
            '!Eliminado!',
            'El usuario ha sido eliminado',
            'success'
          );
          this.cargarUsuarios();
        });
      }
    });
  }

  mostrarModal(id: string) {
    this.modalUploadService.mostrarModal('usuarios', id);
  }

}
