import { buscarPersonagem } from "./src/repositorio/buscar_personagem.ts";
import { criarPersonagem } from "./src/repositorio/criar_personagem.ts";
import { listarPersonagens } from "./src/repositorio/listar_personagens.ts";

const teste = criarPersonagem('Aragorn', 'humano', 'guerreiro',
    [
    { atributoId: 1, valor: 15 },
    { atributoId: 2, valor: 12 },
    { atributoId: 3, valor: 14 },
    { atributoId: 4, valor: 8  },
    { atributoId: 5, valor: 10 },
    { atributoId: 6, valor: 13 },
  ],
  [
    { periciaId: 1, valor: 4},
    { periciaId: 2, valor: 5},
    { periciaId: 3, valor: 1},
    { periciaId: 4, valor: 2},
    { periciaId: 5, valor: 3},
    { periciaId: 6, valor: 3},
    { periciaId: 7, valor: 0},
    { periciaId: 8, valor: 1},
    { periciaId: 9, valor: 2},
    { periciaId: 10, valor: 2},
    { periciaId: 11, valor: 1},
    { periciaId: 12, valor: 3},
  ]
);

console.log(teste);

const personagemBuscado = buscarPersonagem(1);
console.log(personagemBuscado);

const todosPersonagens = listarPersonagens();
console.log(todosPersonagens);