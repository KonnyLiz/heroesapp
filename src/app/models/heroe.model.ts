export class HeroeModel {

    // el id es null o string, tambien puede ser undefined por el ?
    id!: string | null;
    nombre: string = '';
    poder: string = '';
    vivo: boolean;

    constructor() {
        this.vivo = true;
    }
}