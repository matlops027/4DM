import { Prod } from "./prod";

export class Prioridade{
    constructor(
        public instituicao:string,
        public produtos:Prod[],
    ){}
}