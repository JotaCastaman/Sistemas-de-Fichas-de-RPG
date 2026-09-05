import { banco } from "../db/conexao.ts";

const listaDePersonagem = banco.prepare(
  `SELECT * from personagens`,
);

export function listarPersonagens() {
  const resultadoSelect = listaDePersonagem.all() as {
    id: number;
    nome: string;
    especie: string;
    classe: string;
  }[];

  return resultadoSelect;
}
