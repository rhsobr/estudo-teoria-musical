import {
  NOTA_SIMPLES,
  NOTA,
  MODIFICADOR_NOTA_SIMPLES,
  NOTA_INTERVALO,
} from "./notas";

const TODAS_NOTAS = [
  new NOTA(NOTA_SIMPLES.C),
  new NOTA(NOTA_SIMPLES.C, MODIFICADOR_NOTA_SIMPLES["#"]),
  new NOTA(NOTA_SIMPLES.D),
  new NOTA(NOTA_SIMPLES.D, MODIFICADOR_NOTA_SIMPLES["#"]),
  new NOTA(NOTA_SIMPLES.E),
  new NOTA(NOTA_SIMPLES.F),
  new NOTA(NOTA_SIMPLES.F, MODIFICADOR_NOTA_SIMPLES["#"]),
  new NOTA(NOTA_SIMPLES.G),
  new NOTA(NOTA_SIMPLES.G, MODIFICADOR_NOTA_SIMPLES["#"]),
  new NOTA(NOTA_SIMPLES.A),
  new NOTA(NOTA_SIMPLES.A, MODIFICADOR_NOTA_SIMPLES["#"]),
  new NOTA(NOTA_SIMPLES.B),
];

const pegaNovaPosicao = (posicao_atual: any, diferenca: NOTA_INTERVALO) => {
  let nova_posicao = posicao_atual;
  let aumenta = 1;

  if (diferenca === NOTA_INTERVALO.TOM) {
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

const defineEscala = (definicao: Array<NOTA_INTERVALO>) => (
  nota: NOTA_SIMPLES,
  modificador?: MODIFICADOR_NOTA_SIMPLES
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

const escalaMaior = (
  nota: NOTA_SIMPLES,
  modificador?: MODIFICADOR_NOTA_SIMPLES
) => {
  const definicao = [
    NOTA_INTERVALO.TOM,
    NOTA_INTERVALO.TOM,
    NOTA_INTERVALO.SEMITOM,
    NOTA_INTERVALO.TOM,
    NOTA_INTERVALO.TOM,
    NOTA_INTERVALO.TOM,
    NOTA_INTERVALO.SEMITOM,
  ];

  return defineEscala(definicao)(nota, modificador);
};

const escalaMenor = (
  nota: NOTA_SIMPLES,
  modificador?: MODIFICADOR_NOTA_SIMPLES
) => {
  const definicao = [
    NOTA_INTERVALO.TOM,
    NOTA_INTERVALO.SEMITOM,
    NOTA_INTERVALO.TOM,
    NOTA_INTERVALO.TOM,
    NOTA_INTERVALO.SEMITOM,
    NOTA_INTERVALO.TOM,
    NOTA_INTERVALO.TOM,
  ];

  return defineEscala(definicao)(nota, modificador);
};

TODAS_NOTAS.forEach((nota_composta) => {
  console.log(
    `ESCALA MAIOR ${nota_composta.nome}`,
    escalaMaior(nota_composta.nota, nota_composta.modificadores[0]).map(
      (item) => item?.nome
    )
  );
});

TODAS_NOTAS.forEach((nota_composta) => {
  console.log(
    `ESCALA MENOR NATURAL ${nota_composta.nome}`,
    escalaMenor(nota_composta.nota, nota_composta.modificadores[0]).map(
      (item) => item?.nome
    )
  );
});
