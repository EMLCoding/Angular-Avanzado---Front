import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {

    let url = URL_SERVICIOS + '/img';

    // Si no llega ninguna imagen hay que mostrar la imagen por defecto
    if (!img) {
      return url + '/usuarios/xxx';
    }

    // Si la imagen que tenemos es la de la cuenta de google..
    if (img.indexOf('https') >= 0) {
      return img;
    }

    // Si la imagen no es la de google....
    switch (tipo) {
      case 'usuario':
        url += '/usuarios/' + img;
        break;

      case 'medico':
        url += '/medicos/' + img;
        break;

      case 'hospital':
        url += '/hospitales/' + img;
        break;

      default:
        console.log('Tipo de imagen no existente');
        url += '/usuarios/xxx';
    }

    return 'FUNCIONA';
  }

}
