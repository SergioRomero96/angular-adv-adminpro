import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CollectionType } from '../models/types/entity-types';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImageService {
  private _hideModal = true;
  tipo: 'usuarios'|'medicos'|'hospitales';
  id: string;
  img: string;

  newImage: EventEmitter<string> = new EventEmitter<string>();

  get hideModal(){
    return this._hideModal;
  }

  openModal(tipo: CollectionType, id: string, img: string = 'no-img'){
    this._hideModal = false;
    this.tipo = tipo;
    this.id = id;
    if(img.includes('https')){
      this.img = img;
    }else{
      this.img = `${base_url}/upload/${tipo}/${img}`
    }
  }

  closeModal(){
    this._hideModal = true;
  }

  constructor() { }
}
