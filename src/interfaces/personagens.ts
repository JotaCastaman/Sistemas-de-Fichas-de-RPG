export interface Atributo {
    id:number;
    nome:string;
};

export interface Pericia {
    id: number;
    nome: string;
    atributoId: number;
};

export interface AtributoDoPersonagem {
    nome: string;
    valor: number;
};

export interface PericiaDoPersonagem {
    nome: string;
    valor: number;
};

export interface Personagem {
    id: number;
    nome: string;
    especie: string;
    classe: string;
    atributos: AtributoDoPersonagem[];
    pericias: PericiaDoPersonagem[];
};
