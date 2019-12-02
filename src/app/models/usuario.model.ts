export class Usuario {
    nombre: string;
    email: string;
    password: string;
    id?: number;
    rol?: string;
    img?: string;
    google?: boolean;

    constructor(fields: Partial<Usuario> = {}) {
        Object.assign(this, fields);
    }

}