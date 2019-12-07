import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Hospital } from '../../models/hospital.model';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css']
})
export class HospitalesComponent implements OnInit {

  cargando = true;
  totalRegistros = 0;

  hospitales: Hospital[] = [];

  constructor(public hospitalService: HospitalService, public modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarHospitales();
  }

  cargarHospitales() {
    this.hospitalService.cargarHospitales().subscribe((respuesta: any) => {
      this.hospitales = respuesta.hospitales;
      this.cargando = false;
      this.totalRegistros = this.hospitales.length;
    });
  }

  buscarHospital(nombre: string) {
    this.hospitalService.buscarHospital(nombre).subscribe((hospitales: Hospital[]) => {
      this.hospitales = hospitales;
    });
  }

  async crearHospital() {
    const { value: string } = await Swal.fire({
      title: 'Crear Hospital',
      input: 'text',
      inputPlaceholder: 'Introduzca un nombre para el nuevo hospital'
    });

    if (string) {
      this.hospitalService.crearHospital(string).subscribe(() => {
        Swal.fire(`Hospital creado: ${string}`);
        this.cargarHospitales();
      });
    }
  }

  mostrarModal(id: string) {
    this.modalUploadService.mostrarModal('hospitales', id);
  }

  guardarHospital(hospital: Hospital) {
    console.log(hospital);
    this.hospitalService.actualizarHospital(hospital).subscribe();
  }

  borrarHospital(id: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Está a punto de borrar el hospital con ID: ' + id,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then(borrar => {
      if (borrar.value) {
        this.hospitalService.borrarHospital(id).subscribe(() => {
          Swal.fire(
            '!Eliminado!',
            'El hospital ha sido eliminado',
            'success'
          );
          this.cargarHospitales();
        });
      }
    });
  }

}
