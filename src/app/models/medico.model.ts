export class Medico {

    nombre?: string;
    img?: string;
    usuario?: string;
    hospitalId?: string;
    _id?: string;

    constructor(fields: Partial<Medico> = {}) {
        Object.assign(this, fields);
    }
}