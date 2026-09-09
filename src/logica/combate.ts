import type { Personagem } from "../interfaces/personagens.ts";
import { rolarDado } from "./rolar_dados.ts";
import chalk from "chalk";

export interface ResultadoAtaque {
  atacante: string;
  alvo: string;
  periciaUsada: string;
  rolagemAtaque: number;
  modificadorAtaque: number;
  totalAtaque: number;
  defesaAlvo: number;
  acertou: boolean;
  dano: number;
}

// procura o valor de uma pericia pelo nome; se não achar, tenta um atributo com esse nome
function modificadorDe(personagem: Personagem, nome: string): number {
  const pericia = personagem.pericias.find(
    (p) => p.nome.toLowerCase() === nome.toLowerCase(),
  );
  if (pericia) return pericia.valor;

  const atributo = personagem.atributos.find(
    (a) => a.nome.toLowerCase() === nome.toLowerCase(),
  );
  if (atributo) return atributo.valor;

  return 0;
}

// defesa = 10 + modificador de Destreza (regra simples, ajustável)
export function calcularDefesa(personagem: Personagem): number {
  const destreza = modificadorDe(personagem, "Destreza");
  return 10 + destreza;
}

// ataque: rola 1d20 + pericia de ataque (padrão "Luta") contra a defesa do alvo.
// se acertar, dano = 1d6 + modificador de Força.
export function realizarAtaque(
  atacante: Personagem,
  alvo: Personagem,
  periciaAtaque: string = "Luta",
): ResultadoAtaque {
  const modificadorAtaque = modificadorDe(atacante, periciaAtaque);
  const rolagemAtaque = rolarDado(20);
  const totalAtaque = rolagemAtaque + modificadorAtaque;
  const defesaAlvo = calcularDefesa(alvo);
  const acertou = totalAtaque >= defesaAlvo;

  let dano = 0;
  if (acertou) {
    const forca = modificadorDe(atacante, "Força");
    dano = Math.max(1, rolarDado(6) + forca);
  }

  return {
    atacante: atacante.nome,
    alvo: alvo.nome,
    periciaUsada: periciaAtaque,
    rolagemAtaque,
    modificadorAtaque,
    totalAtaque,
    defesaAlvo,
    acertou,
    dano,
  };
}

export function imprimirResultadoAtaque(resultado: ResultadoAtaque): void {
  console.log(`${resultado.atacante} ataca ${resultado.alvo} usando ${resultado.periciaUsada}!`);
  console.log(
    `Rolagem: ${resultado.rolagemAtaque} + ${resultado.modificadorAtaque} = ${resultado.totalAtaque} (Defesa de ${resultado.alvo}: ${resultado.defesaAlvo})`,
  );
  if (resultado.acertou) {
    console.log(chalk.green.bold(`Acertou! Dano causado: ${resultado.dano}`));
  } else {
    console.log(chalk.red("Errou o ataque."));
  }
}
