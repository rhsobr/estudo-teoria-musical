import {
  NOTA_SIMPLES,
  NOTA_INTERVALO,
  MODIFICADOR_NOTA_SIMPLES,
  NOTA,
  PEGA_TODAS_NOTAS,
} from "./notas";

class Escala {
  definicao: Array<NOTA_INTERVALO>;
  private todas_notas: Array<NOTA>;

  constructor(definicao: Array<NOTA_INTERVALO>) {
    if (!definicao.length) {
      throw new Error("Definição precisa ter intervalos");
    }

    this.definicao = definicao;
    this.todas_notas = PEGA_TODAS_NOTAS();
  }

  private pegaNovaPosicao(posicao_atual: any, intervalo: NOTA_INTERVALO) {
    let nova_posicao = posicao_atual;

    for (var i = 0; i < intervalo; i++) {
      nova_posicao++;

      if (this.todas_notas.length == nova_posicao) {
        nova_posicao = 0;
      }
    }

    return nova_posicao;
  }

  private defineEscala = (definicao: Array<NOTA_INTERVALO>) => (
    nota: NOTA_SIMPLES,
    modificador?: MODIFICADOR_NOTA_SIMPLES
  ): NOTA[] => {
    const posicao_tonica = this.todas_notas.findIndex(
      (metadado) =>
        metadado.nota === nota &&
        (!modificador || metadado.modificadores.includes(modificador))
    );

    let posicao = posicao_tonica;

    const tonica = this.todas_notas[posicao_tonica];

    const todas_notas = definicao.reduce(
      (acc, intervalo) => {
        posicao = this.pegaNovaPosicao(posicao, intervalo);
        acc.push(this.todas_notas[posicao]);
        return acc;
      },
      [tonica]
    );

    //remove última nota
    todas_notas.pop();

    return todas_notas;
  };

  com_tonica(tonica: NOTA): NOTA[] {
    return this.defineEscala(this.definicao)(
      tonica.nota,
      tonica.modificadores[0]
    );
  }
}

export default {
  maior: {
    natural: new Escala([
      NOTA_INTERVALO.TOM,
      NOTA_INTERVALO.TOM,
      NOTA_INTERVALO.SEMITOM,
      NOTA_INTERVALO.TOM,
      NOTA_INTERVALO.TOM,
      NOTA_INTERVALO.TOM,
      NOTA_INTERVALO.SEMITOM,
    ]),
  },
  menor: {
    natural: new Escala([
      NOTA_INTERVALO.TOM,
      NOTA_INTERVALO.SEMITOM,
      NOTA_INTERVALO.TOM,
      NOTA_INTERVALO.TOM,
      NOTA_INTERVALO.SEMITOM,
      NOTA_INTERVALO.TOM,
      NOTA_INTERVALO.TOM,
    ]),
    harmonica: new Escala([
      NOTA_INTERVALO.TOM,
      NOTA_INTERVALO.SEMITOM,
      NOTA_INTERVALO.TOM,
      NOTA_INTERVALO.TOM,
      NOTA_INTERVALO.SEMITOM,
      NOTA_INTERVALO.TOM + NOTA_INTERVALO.SEMITOM,
      NOTA_INTERVALO.SEMITOM,
    ]),
    melodica: new Escala([
      NOTA_INTERVALO.TOM,
      NOTA_INTERVALO.SEMITOM,
      NOTA_INTERVALO.TOM,
      NOTA_INTERVALO.TOM,
      NOTA_INTERVALO.TOM,
      NOTA_INTERVALO.TOM,
      NOTA_INTERVALO.SEMITOM,
    ]),
  },
  pentatonica: {
    maior: new Escala([
      NOTA_INTERVALO.TOM,
      NOTA_INTERVALO.TOM,
      NOTA_INTERVALO.TOM + NOTA_INTERVALO.SEMITOM,
      NOTA_INTERVALO.TOM,
      NOTA_INTERVALO.TOM + NOTA_INTERVALO.SEMITOM,
    ]),
    menor: new Escala([
      NOTA_INTERVALO.TOM + NOTA_INTERVALO.SEMITOM,
      NOTA_INTERVALO.TOM,
      NOTA_INTERVALO.TOM,
      NOTA_INTERVALO.TOM + NOTA_INTERVALO.SEMITOM,
      NOTA_INTERVALO.TOM,
    ]),
  },
};
