import { Usuario } from './usuario';

export class Hospital{

    constructor(init?: Partial<Hospital>){
        Object.assign(this, init);
    }

    _id?: string;
    nombre: string;
    img?: string;

    usuario?: Usuario;
}