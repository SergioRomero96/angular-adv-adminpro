import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

export class Usuario {

    constructor(init?: Partial<Usuario>) {
        Object.assign(this, init);
    }

    _id: string;
    nombre: string;
    email: string;
    password?: string;
    img?: string;
    google?: string;
    role?: 'ADMIN_ROLE' | 'USER_ROLE';
    uid?: string;

    get imagenUrl() {
        if (!this.img) {
            return `${base_url}/upload/usuarios/no-img`;
        }

        if (this.img.includes('https')) {
            return this.img;
        }

        if (this.img) {
            return `${base_url}/upload/usuarios/${this.img}`;
        } else {
            return `${base_url}/upload/usuarios/no-img`;
        }


    }
}