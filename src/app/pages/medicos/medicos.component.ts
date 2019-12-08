import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/medico/medico.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];

  constructor(public medicoService: MedicoService) { }

  ngOnInit() {
    this.cargarMedicos();
  }

  cargarMedicos() {
    this.medicoService.cargarMedicos().subscribe(medicos => this.medicos = medicos);
  }

  buscarMedico(valor: string) {
    if (valor.length <= 0) {
      this.cargarMedicos();
      return;
    }
    this.medicoService.buscarMedico(valor).subscribe(medicos => this.medicos = medicos);
  }

  borrarMedico(id: string) {
    this.medicoService.borrarMedico(id).subscribe(() => {
      this.cargarMedicos();
    });
  }

}
