import { Component, OnInit, Inject } from '@angular/core';

import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
  styles: []
})
export class AccountSettingComponent implements OnInit {

  constructor(public settingsService: SettingsService) { }

  ngOnInit() {
    this.colocarCheck();
  }

  // Con este metodo se va a cambiar el tema de colores que utiliza la aplicación
  // "link" es el elemento html que pasa por referencia
  cambiarColor( temaCss: string, link: any ) {

    this.aplicarCheck( link );
    this.settingsService.aplicarTema(temaCss);

  }

  // Con este método se cambia el check en el tema seleccionado
  aplicarCheck( link: any ) {
    // Vincula la variable al elemento html en función del nombre de la clase
    const selectores: any = document.getElementsByClassName('selector');

    // Recorre todos los elementos html con clase "selector" y les quita la clase "working"
    for ( const ref of selectores ) {
      ref.classList.remove('working');
    }

    // Añade al elemento html pasado por referencia la clase "working"
    link.classList.add('working');
  }

  // Con este método se coloca el check en el tema guardado en el localStorage
  colocarCheck() {
    const selectores: any = document.getElementsByClassName('selector');
    const tema = this.settingsService.ajustes.tema;
    for( const ref of selectores ) {
      // Aqui comprueba que el atributo 'data-theme' del elemento html cogido en "selectores" es igual al tema
      if (ref.getAttribute('data-theme') === tema) {
        // Si es así entonces le añade la clase "working"
        ref.classList.add('working');
        // Sale del for para que no ande comparando más de lo necesario
        break;
      }
    }
  }

}
