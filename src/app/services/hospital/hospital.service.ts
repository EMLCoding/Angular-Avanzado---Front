import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { SubirArchivoService } from '../subirArchivo/subir-archivo.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_SERVICIOS } from '../../config/config';
import { Hospital } from '../../models/hospital.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  token: string;

  constructor(public http: HttpClient, public router: Router, public subirArchivoService: SubirArchivoService) {
    this.cargarStorage();
   }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
    } else {
      this.token = '';
    }
  }

  cargarHospitales() {
    const url = URL_SERVICIOS + '/hospital';
    return this.http.get(url);
  }

  obtenerHospital(id: string) {
    const url = URL_SERVICIOS + '/hospital/' + id;
    return this.http.get(url).map((respuesta: any) => respuesta.hospital);
  }

  buscarHospital(nombre: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + nombre;
    return this.http.get(url).pipe(map((respuesta: any) => respuesta.hospitales));
  }

  crearHospital(nombre: string) {
    let url = URL_SERVICIOS + '/hospital';
    url += '?token=' + this.token;
    return this.http.post(url, {nombre: nombre}).pipe(map((respuesta: any) => {
      Swal.fire({
        icon: 'success',
        title: 'Hospital Creado',
        text: nombre
      });
      return true;
    }));
  }

  actualizarHospital(hospital: Hospital) {
    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token=' + this.token;
    return this.http.put(url, hospital).pipe(map((respuesta: any) => {
      Swal.fire({
        icon: 'success',
        title: 'Hospital Actualizado',
        text: hospital.nombre
      });
      return true;
    }));
  }

  borrarHospital(id: string) {
    let url = URL_SERVICIOS + '/hospital/' + id;
    url += '?token=' + this.token;

    return this.http.delete(url);
  }
}
