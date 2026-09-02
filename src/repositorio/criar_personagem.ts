import { banco } from "../db/conexao.ts";
//import { Atributo, Pericia, Personagem, AtributoDoPersonagem, PericiaDoPersonagem } from "../interfaces/personagens.ts";

function criarPersonagem(
  nome: string,
  especie: string,
  classe: string,
  atributos: { atributoId: number; valor: number }[],
  pericias: { periciaId: number; valor: number }[],
) {
  // personagem
  const inserirPersonagem = banco.prepare(
    "INSERT INTO personagens (nome, especie, classe) VALUES (?, ?, ?)",
  );

  const resultadoPersonagem = inserirPersonagem.run(nome, especie, classe);
  const idPersonagem = resultadoPersonagem.lastInsertRowid;

  // atributo
  const inserirAtributo = banco.prepare(
    "INSERT INTO personagem_atributos (personagem_id, atributo_id, valor) VALUES (?, ?, ?)",
  );

  const listaAtributo = [];
  for (const atributo of atributos) {
    const resultadoAtributo = inserirAtributo.run(
      idPersonagem,
      atributo.atributoId,
      atributo.valor,
    );
    const selectAtributo = banco.prepare(
      "SELECT nome FROM atributos where id = ?",
    );
    const nomeAtributo = selectAtributo.get(atributo.atributoId) as {
      nome: string;
    };
    listaAtributo.push({ nome: nomeAtributo.nome, valor: atributo.valor });
  }

  // pericia
  const inserirPericia = banco.prepare(
    "INSERT INTO personagem_pericias (personagem_id, pericia_id, valor) VALUES (?, ?, ?)",
  );

  const listaPericia = [];
  for (const pericia of pericias) {
    const resultadoPericia = inserirPericia.run(
      idPersonagem,
      pericia.periciaId,
      pericia.valor,
    );
    const selectPericia = banco.prepare(
      "SELECT nome FROM pericias where id = ?",
    );
    const nomePericia = selectPericia.get(pericia.periciaId) as {
      nome: string;
    };
    listaPericia.push({ nome: nomePericia.nome, valor: pericia.valor });
  }
}
