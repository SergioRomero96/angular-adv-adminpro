import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CollectionType } from '../../models/types/entity-types';

const base_url = environment.base_url;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  /**
   * @param img is value
   * @param tipo ar args
   */
  transform(img: string, tipo: CollectionType): string {
    if (img) {
      if (img.includes('https')) {
        return img;
      } else {
        return `${base_url}/upload/${tipo}/${img}`;
      }
    }
    return `${base_url}/upload/usuarios/no-image`;
  }

}
