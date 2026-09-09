<p align="center">
  <img src="assets/icon.png" alt="Eris" width="250">
</p>

<h1 align="center">Sistema de Fichas de RPG</h1>

<p align="center">
  Projeto acadêmico de ADS — sistema de gerenciamento de fichas de personagem via linha de comando (CLI).<br>
  <strong>Sem história, campanha ou narrativa embutida</strong> — apenas a funcionalidade de criar, consultar e testar fichas.
</p>

---

## Sobre

Este projeto implementa um sistema de fichas de personagem inspirado em jogos de RPG de mesa, com:

- Criação de personagens com atributos e perícias customizáveis
- Consulta de personagens (resumida e completa)
- Testes de perícia contra uma CD (Classe de Dificuldade)
- Sistema simples de combate (ataque vs. defesa)

Tudo isso rodando direto no terminal, sem interface gráfica.

## Tecnologias utilizadas

- **[TypeScript](https://www.typescriptlang.org/)** — linguagem principal do projeto
- **[Node.js](https://nodejs.org/)** (v22.5+) — runtime, usando o módulo nativo `node:sqlite`
- **[tsx](https://github.com/privatenumber/tsx)** — execução de TypeScript sem etapa de build manual
- **[node:sqlite](https://nodejs.org/api/sqlite.html)** — banco de dados SQLite embutido no Node (experimental)
- **[Chalk](https://github.com/chalk/chalk)** — estilização de output no terminal

## Pré-requisitos

- Node.js **v22.5 ou superior** (o módulo `node:sqlite` é experimental e requer essa versão mínima)
- npm

## Instalação

```bash
git clone <url-do-repositorio>
cd rpg-projeto
npm install
```

## Configuração inicial do banco

O banco de dados é criado automaticamente (`CREATE TABLE IF NOT EXISTS`) na primeira execução. Antes de usar o sistema, é necessário popular as tabelas de referência (atributos e perícias):

```bash
npx tsx src/db/insert.ts
```

> Esse passo só precisa ser executado uma vez — ou sempre que o `banco.db` for apagado/recriado.

## Uso

O ponto de entrada é o `index.ts`, na raiz do projeto:

```bash
npx tsx index.ts <comando> [argumentos]
```

### Comandos disponíveis

#### `criar`
Cria um novo personagem.

```bash
npx tsx index.ts criar <nome> <especie> <classe> <atributos> <pericias>
```

- `<atributos>`: 6 valores separados por vírgula, na ordem **Força, Destreza, Constituição, Inteligência, Sabedoria, Carisma**
- `<pericias>`: 12 valores separados por vírgula, na ordem **Atletismo, Luta, Furtividade, Acrobacia, Resistência, Vigor, Investigação, Conhecimento, Percepção, Intuição, Persuasão, Intimidação**

```bash
npx tsx index.ts criar Aragorn humano guerreiro 15,12,14,8,10,13 4,5,1,2,3,3,0,1,2,2,1,3
```

#### `listar`
Lista todos os personagens cadastrados (visão resumida: id, nome, espécie, classe).

```bash
npx tsx index.ts listar
```

#### `buscar`
Exibe a ficha completa de um personagem, incluindo atributos e perícias.

```bash
npx tsx index.ts buscar <id>
```

#### `testar`
Realiza um teste de perícia contra uma CD (Classe de Dificuldade).

```bash
npx tsx index.ts testar <idPersonagem> <nomeDaPericia> <cd>
```

```bash
npx tsx index.ts testar 1 Atletismo 15
```

#### `atacar`
Realiza um ataque de um personagem contra outro, usando uma perícia como base (padrão: `Luta`).

```bash
npx tsx index.ts atacar <idAtacante> <idAlvo> [nomeDaPericiaDeAtaque]
```

```bash
npx tsx index.ts atacar 1 2 Luta
```

## Estrutura do projeto

```
rpg-projeto/
├── assets/                  # imagens/ícones
├── src/
│   ├── cli/
│   │   └── comandos.ts      # lógica dos comandos da CLI
│   ├── db/
│   │   ├── conexao.ts       # conexão com o SQLite
│   │   ├── tabelas.ts       # criação das tabelas
│   │   └── insert.ts        # seed de atributos e perícias
│   ├── interfaces/
│   │   └── personagens.ts   # tipagem do domínio
│   ├── logica/
│   │   ├── combate.ts       # regras de ataque/defesa
│   │   └── rolar_dados.ts   # rolagem de dados e testes
│   └── repositorio/
│       ├── criar_personagem.ts
│       ├── buscar_personagem.ts
│       └── listar_personagens.ts
├── index.ts                 # ponto de entrada da CLI
├── banco.db                 # banco SQLite (gerado localmente, ignorado no git)
└── package.json
```

## Modelo de dados

O banco é composto por 5 tabelas relacionadas:

- `personagens` — dados básicos (nome, espécie, classe)
- `atributos` — catálogo fixo dos 6 atributos base
- `pericias` — catálogo fixo das 12 perícias, cada uma vinculada a um atributo
- `personagem_atributos` — valores de atributo por personagem
- `personagem_pericias` — valores de perícia por personagem

