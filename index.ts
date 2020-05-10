enum NOTA {
  A = "A",
  B = "B",
  C = "C",
  D = "D",
  E = "E",
  F = "F",
  G = "G",
}

type NOTAS = keyof typeof NOTA;

enum MODIFICADOR_NOTA {
  "#" = "#", //sustenido,
  "b" = "b", //bemol",
  "º" = "º", //diminuto,
  ".5" = ".5", //quinta,
  ".7" = ".7", //sétima,
  "M" = "M", //maior
  "m" = "m", //menor
}

enum NOTA_DIFERENCA {
  TOM,
  SEMITOM,
}

class NOTA_METADATA {
  nota: NOTA;
  modificadores: Array<MODIFICADOR_NOTA>;
  proximaNota?: NOTA_METADATA;
  anteriorNota?: NOTA_METADATA;
  constructor(nota: NOTA, modificador?: MODIFICADOR_NOTA) {
    this.nota = nota;
    this.modificadores = [];

    if (modificador) {
      this.modificadores.push(modificador);
    }
  }

  get nome() {
    return this.nota + this.modificadores.join("");
  }

  adicionaModificador(modificador: MODIFICADOR_NOTA) {
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

const TODAS_NOTAS = [
  new NOTA_METADATA(NOTA.C),
  new NOTA_METADATA(NOTA.C, MODIFICADOR_NOTA["#"]),
  new NOTA_METADATA(NOTA.D),
  new NOTA_METADATA(NOTA.D, MODIFICADOR_NOTA["#"]),
  new NOTA_METADATA(NOTA.E),
  new NOTA_METADATA(NOTA.F),
  new NOTA_METADATA(NOTA.F, MODIFICADOR_NOTA["#"]),
  new NOTA_METADATA(NOTA.G),
  new NOTA_METADATA(NOTA.G, MODIFICADOR_NOTA["#"]),
  new NOTA_METADATA(NOTA.A),
  new NOTA_METADATA(NOTA.A, MODIFICADOR_NOTA["#"]),
  new NOTA_METADATA(NOTA.B),
];

const pegaNovaPosicao = (posicao_atual: any, diferenca: NOTA_DIFERENCA) => {
  let nova_posicao = posicao_atual;
  let aumenta = 1;

  if (diferenca === NOTA_DIFERENCA.TOM) {
    aumenta = 2;
  }

  for (var i = 0; i < aumenta; i++) {
    nova_posicao++;

    if (TODAS_NOTAS.length == nova_posicao) {
      nova_posicao = 0;
    }
  }

  return nova_posicao;
};

const defineEscala = (definicao: Array<NOTA_DIFERENCA>) => (
  nota: NOTA,
  modificador?: MODIFICADOR_NOTA
) => {
  const posicao_tonica = TODAS_NOTAS.findIndex(
    (metadado) =>
      metadado.nota === nota &&
      (!modificador || metadado.modificadores.includes(modificador))
  );

  let posicao = posicao_tonica;

  const tonica = TODAS_NOTAS[posicao_tonica];

  const todas_notas = definicao.reduce(
    (acc, item) => {
      posicao = pegaNovaPosicao(posicao, item);
      acc.push(TODAS_NOTAS[posicao]);
      return acc;
    },
    [tonica]
  );

  //remove última nota
  todas_notas.pop();

  return todas_notas;
};

const escalaMaior = (nota: NOTA, modificador?: MODIFICADOR_NOTA) => {
  const definicao = [
    NOTA_DIFERENCA.TOM,
    NOTA_DIFERENCA.TOM,
    NOTA_DIFERENCA.SEMITOM,
    NOTA_DIFERENCA.TOM,
    NOTA_DIFERENCA.TOM,
    NOTA_DIFERENCA.TOM,
    NOTA_DIFERENCA.SEMITOM,
  ];

  return defineEscala(definicao)(nota, modificador);
};

const escalaMenor = (nota: NOTA, modificador?: MODIFICADOR_NOTA) => {
  const definicao = [
    NOTA_DIFERENCA.TOM,
    NOTA_DIFERENCA.SEMITOM,
    NOTA_DIFERENCA.TOM,
    NOTA_DIFERENCA.TOM,
    NOTA_DIFERENCA.SEMITOM,
    NOTA_DIFERENCA.TOM,
    NOTA_DIFERENCA.TOM,
  ];

  return defineEscala(definicao)(nota, modificador);
};

TODAS_NOTAS.forEach((nota) => {
  console.log(
    `ESCALA MAIOR ${nota.nome}`,
    escalaMaior(nota.nota, nota.modificadores[0]).map((item) => item?.nome)
  );
});

TODAS_NOTAS.forEach((nota) => {
  console.log(
    `ESCALA MENOR NATURAL ${nota.nome}`,
    escalaMenor(nota.nota, nota.modificadores[0]).map((item) => item?.nome)
  );
});
