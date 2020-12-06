import { Hospital } from './hospital';
import { Usuario } from './usuario';

export class Medico {
    constructor(init?: Partial<Medico>) {
        Object.assign(this, init);
    }

    _id?: string;
    nombre: string;
    img?: string;
    usuario?: Usuario;
    hospital?: Hospital;
}