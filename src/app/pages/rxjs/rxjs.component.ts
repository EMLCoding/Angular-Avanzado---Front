import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  // Referencia al observaodr
  subscripcion: Subscription;

  constructor() {

    // Los subscribe tienen tres tipos de llamada:
    this.subscripcion = this.regresaObservable().subscribe(
      // 1: Cuando recibe información, es decir, cuando se llama al "next()"
      numero => console.log(numero),
      // 2: Cuando reciben un error
      error => console.error('Error en el observable',error),
      // 3: Cuando no recibe ningún parámetro y se ha detenido al observador
      () => console.log('Se ha detenido el observador')
      );
   }

  ngOnInit() {
  }

  // Lo que haya aquí dentro se ejecuta cada vez que salgamos de la página de este componente
  ngOnDestroy() {
    console.log('Has cambiado de página');
    // Con unsubscribe() se deja de estar suscrito al observable, es decir, deja de ejecutarse
    this.subscripcion.unsubscribe();
  }

  regresaObservable(): Observable<any> {
    return new Observable( (observer: Subscriber<any>) => {
      // observer tiene todos los metodos de los observables

      let contador = 0;

      const intervalo = setInterval( () => {
        contador++;

        // Objeto que se crea para probar cómo se pueden transformar los datos que recibe el observable con el .pipe(map())
        const salida = {
          valor: contador
        };
        // Notifica al codigo al que se va a subscribir. Notifica que el contador tiene un valor nuevo.
        // Da igual que no estemos viendo la página web en la parte del observable, el observable se ejecuta SIEMPRE
        observer.next(contador);

        /* if (contador === 3 ) {
          // Detiene el intervalo pero no la escucha del observable
          clearInterval(intervalo);
          // Detiene la escucha del observable ya que indica que se ha completado
          observer.complete();
        } */

        /* if (contador === 2) {
          //clearInterval(intervalo);
          observer.error('Auxilio');
        } */
      }, 1000);
    }).pipe(
      map( respuesta => {
        // Con el "map" se consigue convertir el valor que se obtiene del observable para poder modificarlo y mostrarlo de X forma
        return respuesta.valor;
      }),
      filter((resultado, index) => {
        // Se utiliza el "filter" para filtrar los datos que devuelve el observable. En este ejemplo se van a devolver solo los números impares
        // Los "filter" pueden recibir dos parámetros por referencia.
        if ( (resultado % 2) === 1) {
          // es un número impar así que el filtro lo devuelve
          return true;
        } else {
          // es un número par
          return false;
        }
    }));
  }

}
