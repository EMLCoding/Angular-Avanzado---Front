import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { map, filter } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  tituloRuta: string;

  constructor( private router: Router, private title: Title, private meta: Meta ) {

    this.getTituloRoute().subscribe( datos => {
      this.tituloRuta = datos.titulo;
      // Con title.setTitle se puede modificar el título que tiene la pestaña del navegador en función de la página en la que estamos
      this.title.setTitle(this.tituloRuta);

      // Con los meta se crea información oculta que permite mostrar más información acerca de la página en la que estamos.
      const metaTag: MetaDefinition = {
        name: 'description',
        content: this.tituloRuta,
      };
      this.meta.updateTag( metaTag );
    });
   }

  ngOnInit() {
  }

  getTituloRoute() {
    // Con este OBSERVABLE se va a recoger el valor de la variable título que llevan las rutas de la página web (ver pages.routes.ts)
    return this.router.events.pipe(
      filter( evento => evento instanceof ActivationEnd ),
      // Un filtro que actúa con los resultados devueltos del primer filtro
      filter( (evento: ActivationEnd) => evento.snapshot.firstChild === null),
      map((evento: ActivationEnd) => evento.snapshot.data)
    );
  }

}
