export enum NOTA_SIMPLES {
  A = "A",
  B = "B",
  C = "C",
  D = "D",
  E = "E",
  F = "F",
  G = "G",
}

export type NOTAS_SIMPLES = keyof typeof NOTA_SIMPLES;

export enum MODIFICADOR_NOTA_SIMPLES {
  "#" = "#", //sustenido,
  "b" = "b", //bemol",
  "º" = "º", //diminuto,
  ".5" = ".5", //quinta,
  ".7" = ".7", //sétima,
  "M" = "M", //maior
  "m" = "m", //menor
}

export enum NOTA_INTERVALO {
  TOM,
  SEMITOM,
}

export class NOTA {
  nota: NOTA_SIMPLES;
  modificadores: Array<MODIFICADOR_NOTA_SIMPLES>;
  proximaNota?: NOTA;
  anteriorNota?: NOTA;
  constructor(nota: NOTA_SIMPLES, modificador?: MODIFICADOR_NOTA_SIMPLES) {
    this.nota = nota;
    this.modificadores = [];

    if (modificador) {
      this.modificadores.push(modificador);
    }
  }

  get nome() {
    return this.nota + this.modificadores.join("");
  }

  adicionaModificador(modificador: MODIFICADOR_NOTA_SIMPLES) {
    this.modificadores.push(modificador);
  }

  toJSON() {
    return {
      nome: this.nome,
      nota: this.nota,
      modificadores: this.modificadores,
    };
  }
}
