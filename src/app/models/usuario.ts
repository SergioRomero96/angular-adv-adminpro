export class Usuario{

    constructor(init?: Partial<Usuario>){
        Object.assign(this, init);
    }

    nombre:string;
    email:string;
    password?: string;
    img?: string;
    google?: string;
    role?: string;
    uid?: string;
}