export class Usuario {
    nombre: string;
    email: string;
    password: string;
    id?: string;
    role?: string;
    img?: string;
    google?: boolean;

    constructor(fields: Partial<Usuario> = {}) {
        Object.assign(this, fields);
    }

}