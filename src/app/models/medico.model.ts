export class Medico {

    nombre?: string;
    img?: string;
    usuario?: string;
    hospital?: string;
    _id?: string;

    constructor(fields: Partial<Medico> = {}) {
        Object.assign(this, fields);
    }
}