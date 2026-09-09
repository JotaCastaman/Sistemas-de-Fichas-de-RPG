import { banco } from "../db/conexao.ts";
import type { Personagem } from "../interfaces/personagens.ts";

// pesquisar atributos
const selectBuscarAtributo = banco.prepare(`SELECT pa.valor, a.nome from
    personagem_atributos as pa
    join atributos as a on a.id = pa.atributo_id
    where pa.personagem_id = ?`);

// pesquisar pericias
const selectBuscarPericia = banco.prepare(`SELECT pp.valor, p.nome from
    personagem_pericias as pp
    join pericias as p on p.id = pp.pericia_id
    where pp.personagem_id = ?`);

const selectPersonagem = banco.prepare(`SELECT nome, especie, classe 
    from personagens WHERE id = ?`);

export function buscarPersonagem(idPersonagem: number): Personagem {
  const atributosDoPersonagem = selectBuscarAtributo.all(idPersonagem) as {
    nome: string;
    valor: number;
  }[];

  const periciasDoPersonagem = selectBuscarPericia.all(idPersonagem) as {
    nome: string;
    valor: number;
  }[];

  const dadosDoPersonagem = selectPersonagem.get(idPersonagem) as
    | { nome: string; especie: string; classe: string }
    | undefined;

  if (!dadosDoPersonagem) {
    throw new Error(`Personagem com id ${idPersonagem} não encontrado.`);
  }

  return {
    id: idPersonagem,
    nome: dadosDoPersonagem.nome,
    especie: dadosDoPersonagem.especie,
    classe: dadosDoPersonagem.classe,
    atributos: atributosDoPersonagem,
    pericias: periciasDoPersonagem,
  }
};
