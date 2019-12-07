export class Hospital {
    
    nombre: string;
    img?: string;
    _id?: string;

    constructor(fields: Partial<Hospital> = {}) {
        Object.assign(this, fields);
    }
}
