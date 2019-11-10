import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/default.css',
    tema: 'default'
  }

  // Gracias a esta Inyección se puede referenciar/controlar un componente HTML desde aquí
  constructor(@Inject(DOCUMENT) private document, ) {
    // Se añade este método al constructor para que cuando app.component.ts cargue el servicio se cargue automáticamente este método
    this.cargarAjustes();
   }

  guardarAjustes() {
    // Es necesario convertir el objeto a string, sino localStorage no puede guardarlo
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }

  cargarAjustes() {
    if (localStorage.getItem('ajustes')) {
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
      this.aplicarTema(this.ajustes.tema);
    }
  }

  aplicarTema( temaCss: string ) {
    // Es necesario crear esta variable ruta que es donde se almacenan los diferentes temas css disponibles
    const url = `assets/css/colors/${temaCss}.css`;
    // Esta es otra manera de referenciar a un componente HTML. El id 'tema' es el que se encuentra en index.html
    // De esta forma no se puede repetir este id en ningun otro componente html, sino esto no funcionaría.
    this.document.getElementById('tema').setAttribute('href', url);

    this.ajustes.tema = temaCss;
    this.ajustes.temaUrl = url;

    this.guardarAjustes();
  }
}

interface Ajustes {
  temaUrl: string;
  tema: string;
}
