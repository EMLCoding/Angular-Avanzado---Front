import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  // Propiedades que va a recibir del padre
  @Input() leyenda = 'Leyenda'; //'Leyenda' es el nombre por defecto
  @Input() progreso = 50;

  // Evento que va a enviar al padre
  @Output() cambioValor: EventEmitter<number> = new EventEmitter();

  // Referencia en concreto a un componente HTML
  @ViewChild('txtProgress', {static: false}) txtProgress: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  cambiarValor( valor: number ) {

    if (this.progreso >= 100 && valor > 0) {
      this.progreso = 100;
      return;
    }

    if (this.progreso <= 0 && valor < 0) {
      this.progreso = 0;
      return;
    }

    this.progreso = this.progreso + valor;
    // Aqui es donde se indica la variable que va a enviar al padre
    this.cambioValor.emit( this.progreso );
  }

  onChanges( nuevoValor: number ) {
    if (nuevoValor >= 100) {
      this.progreso = 100;
    } else if (nuevoValor <= 0) {
      this.progreso = 0;
    } else {
      this.progreso = nuevoValor;
    }
    // Se iguale el valor del input con el que tiene la variable progreso
    this.txtProgress.nativeElement.value = this.progreso;
    // Enfoca en el componente con el que se está interactuando (porque hay dos inputs en la página que tiran del mismo compoennte)
    this.txtProgress.nativeElement.focus();
    this.cambioValor.emit( this.progreso );
  }

}
