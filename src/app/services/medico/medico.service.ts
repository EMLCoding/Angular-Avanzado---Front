import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import Swal from 'sweetalert2';
import { Medico } from '../../models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  totalMedicos = 0;

  constructor(public http: HttpClient, public usuarioService: UsuarioService) { }

  cargarMedicos() {
    const url = URL_SERVICIOS + '/medico';

    return this.http.get(url).map((respuesta: any) => {
      this.totalMedicos = respuesta.total;
      return respuesta.medicos;
    })
  }

  buscarMedico(valor: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + valor;
    return this.http.get(url).map((respuesta: any) => respuesta.medicos);
  }

  borrarMedico(id: string) {
    let url = URL_SERVICIOS + '/medico/' + id;
    url += '?token=' + this.usuarioService.token;

    return this.http.delete(url).map(respuesta => {
      Swal.fire({
        icon: 'success',
        title: 'Médico borrado',
        text: 'Médico borrado correctamente'
      });
      return respuesta;
    });
  }

  guardarMedico(medico: Medico) {
    let url = URL_SERVICIOS + '/medico';

    if (medico._id) {
      // Actualizando
      url += '/' + medico._id;
      url += '?token=' + this.usuarioService.token;
      return this.http.put(url, medico).map((respuesta: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Médico actualizado',
          text: 'Médico actualizado correctamente'
        });
        return respuesta.medico;
      });
    } else {
      // Creando
      url += '?token=' + this.usuarioService.token;
      return this.http.post(url, medico).map((respuesta: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Médico creado',
          text: 'Médico creado correctamente'
        });
        return respuesta.medico;
      });
    }

    
  }

  cargarMedico(id: string) {
    const url = URL_SERVICIOS + '/medico/' + id;
    return this.http.get(url).map((respuesta: any) => respuesta.medico);
  }
}
