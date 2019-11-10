import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {
    // Esto es como el try/catch de java
    this.contarTres().then(
      // Si se cumple la promesa ....
      // () => console.log('Terminó!')
      mensaje => console.log('Terminó!', mensaje)
    ).catch(error => console.log('Error en la promesa', error)); // Si da un error la promesa...
   }

  ngOnInit() {
  }

  contarTres(): Promise<boolean> {
    // Se crea una promesa que va a ejecutarse cada 1000 ms (1 segundo)
    return new Promise<boolean> ((resolve, reject) => {
      let contador = 0;

      // Creamos una variable que va a contener una función de llave que se ejecute cada 1 segundo (setInterval)
      const intervalo = setInterval( () => {
        contador++;
        console.log(contador);

        // Cuando el contador llegue a 3 entonces se manda un "resolve". Se puede mandar un mensaje dentro de él o no
        if (contador === 3) {
          // resolve();
          resolve(true);
          // Se puede enviar un reject en lugar del resolve
          // reject('Simplemente un error');
          // "Limpiamos" la variable para que no siga ejecutandose una vez ha llegado al resolve o al reject
          clearInterval(intervalo);
        }
      }, 1000);
    });
  }

}
