import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/medico/medico.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico();
  hospital: Hospital;

  constructor(public hospitalService: HospitalService, public medicoService: MedicoService,
              public router: Router, public activatedRoute: ActivatedRoute, public modalUploadService: ModalUploadService) {
                activatedRoute.params.subscribe(params => {
                  const id = params.id;
                  if (id !== 'nuevo') {
                    this.cargarMedico(id);
                  }
                });
              }

  ngOnInit() {
    this.hospitalService.cargarHospitales().subscribe((respuesta: any) => this.hospitales = respuesta.hospitales);
    this.modalUploadService.notificacion.subscribe(respuesta => {
      this.medico.img = respuesta.medico.img;
    });
  }

  guardarMedico(f: NgForm) {
    console.log(f.value);
    if (f.invalid) {
      return;
    }

    this.medicoService.guardarMedico(this.medico).subscribe(medico => {
      this.medico._id = medico._id;
      this.router.navigate(['/medico', medico._id]);
    });
  }

  cambioHospital(id: string) {
    this.hospitalService.obtenerHospital(id).subscribe(hospital => this.hospital = hospital);
  }

  cargarMedico(id: string) {
    this.medicoService.cargarMedico(id).subscribe(medico => {
      this.medico = medico;
      this.medico.hospitalId = medico.hospital._id;
      this.cambioHospital(this.medico.hospitalId);
    } );
  }

  cambiarFoto() {
    this.modalUploadService.mostrarModal('medicos', this.medico._id);
  }

}
