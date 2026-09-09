import { criarPersonagem } from "../repositorio/criar_personagem.ts";
import { buscarPersonagem } from "../repositorio/buscar_personagem.ts";
import { listarPersonagens } from "../repositorio/listar_personagens.ts";
import { rolarTeste } from "../logica/rolar_dados.ts";
import { realizarAtaque, imprimirResultadoAtaque } from "../logica/combate.ts";
import chalk from "chalk";

export function imprimirUso(): void {
  console.log(`Uso:
  criar <nome> <especie> <classe> <atributos separados por virgula (6 valores)> <pericias separadas por virgula (12 valores)>
    ex: criar Aragorn humano guerreiro 15,12,14,8,10,13 4,5,1,2,3,3,0,1,2,2,1,3

  listar

  buscar <id>

  testar <idPersonagem> <nomeDaPericia> <cd>
    ex: testar 1 Atletismo 15

  atacar <idAtacante> <idAlvo> [nomeDaPericiaDeAtaque]
    ex: atacar 1 2 Luta`);
}

export function comandoCriar(args: string[]): void {
  const [nome, especie, classe, atributosStr, periciasStr] = args;

  if (!nome || !especie || !classe || !atributosStr || !periciasStr) {
    console.error(chalk.red("Argumentos insuficientes para criar personagem."));
    imprimirUso();
    process.exitCode = 1;
    return;
  }

  const valoresAtributos = atributosStr.split(",").map(Number);
  const valoresPericias = periciasStr.split(",").map(Number);

  if (valoresAtributos.length !== 6 || valoresAtributos.some(Number.isNaN)) {
    console.error(chalk.red("Esperado exatamente 6 valores numéricos de atributo, separados por vírgula."));
    process.exitCode = 1;
    return;
  }

  if (valoresPericias.length !== 12 || valoresPericias.some(Number.isNaN)) {
    console.error(chalk.red("Esperado exatamente 12 valores numéricos de perícia, separados por vírgula."));
    process.exitCode = 1;
    return;
  }

  const atributos = valoresAtributos.map((valor, indice) => ({
    atributoId: indice + 1,
    valor,
  }));

  const pericias = valoresPericias.map((valor, indice) => ({
    periciaId: indice + 1,
    valor,
  }));

  const personagem = criarPersonagem(nome, especie, classe, atributos, pericias);
  console.log(chalk.green("Personagem criado:"));
  console.log(personagem);
}

export function comandoListar(): void {
  const personagens = listarPersonagens();
  console.log(personagens);
}

export function comandoBuscar(args: string[]): void {
  const idTexto = args[0];
  const id = Number(idTexto);

  if (!idTexto || Number.isNaN(id)) {
    console.error(chalk.red("Informe um id numérico válido."));
    process.exitCode = 1;
    return;
  }

  try {
    const personagem = buscarPersonagem(id);
    console.log(personagem);
  } catch (erro) {
    console.error(erro instanceof Error ? erro.message : erro);
    process.exitCode = 1;
  }
}

export function comandoTestar(args: string[]): void {
  const [idTexto, nomePericia, cdTexto] = args;
  const id = Number(idTexto);
  const cd = Number(cdTexto);

  if (!idTexto || Number.isNaN(id) || !nomePericia || !cdTexto || Number.isNaN(cd)) {
    console.error("Uso: testar <idPersonagem> <nomeDaPericia> <cd>");
    process.exitCode = 1;
    return;
  }

  try {
    const personagem = buscarPersonagem(id);

    const pericia = personagem.pericias.find(
      (p) => p.nome.toLowerCase() === nomePericia.toLowerCase(),
    );

    if (!pericia) {
      console.error(`Perícia "${nomePericia}" não encontrada na ficha de ${personagem.nome}.`);
      process.exitCode = 1;
      return;
    }

    const resultado = rolarTeste(pericia.valor, cd);

    console.log(
      `${personagem.nome} testa ${pericia.nome} (mod +${pericia.valor}) contra CD ${cd}`,
    );
    console.log(
      `Dados: [${resultado.dadosRolados.join(", ")}] -> usado ${resultado.dadoEscolhido} + ${pericia.valor} = ${resultado.total}`,
    );
    console.log(resultado.sucesso ? chalk.green.bold("Sucesso!") : chalk.red.bold("Falha."));
  } catch (erro) {
    console.error(erro instanceof Error ? erro.message : erro);
    process.exitCode = 1;
  }
}

export function comandoAtacar(args: string[]): void {
  const [idAtacanteTexto, idAlvoTexto, periciaAtaque] = args;
  const idAtacante = Number(idAtacanteTexto);
  const idAlvo = Number(idAlvoTexto);

  if (!idAtacanteTexto || Number.isNaN(idAtacante) || !idAlvoTexto || Number.isNaN(idAlvo)) {
    console.error("Uso: atacar <idAtacante> <idAlvo> [nomeDaPericiaDeAtaque]");
    process.exitCode = 1;
    return;
  }

  try {
    const atacante = buscarPersonagem(idAtacante);
    const alvo = buscarPersonagem(idAlvo);

    const resultado = realizarAtaque(atacante, alvo, periciaAtaque ?? "Luta");
    imprimirResultadoAtaque(resultado);
  } catch (erro) {
    console.error(erro instanceof Error ? erro.message : erro);
    process.exitCode = 1;
  }
}
