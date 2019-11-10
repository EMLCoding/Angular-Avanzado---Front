import { Component } from '@angular/core';
import { SettingsService } from './services/service.index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AdminPro';

  // Todos los servicios que se pongan en este constructor serán cargados automáticamente al abrir la página web
  // Nota: se ejecutan los métodos que tenga el servicio en su constructor
  constructor( public settingsService: SettingsService ) {}
}
