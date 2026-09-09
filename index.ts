import {
  imprimirUso,
  comandoCriar,
  comandoListar,
  comandoBuscar,
  comandoTestar,
  comandoAtacar,
} from "./src/cli/comandos.ts";

function main(): void {
  const [comando, ...args] = process.argv.slice(2);

  switch (comando) {
    case "criar":
      comandoCriar(args);
      break;
    case "listar":
      comandoListar();
      break;
    case "buscar":
      comandoBuscar(args);
      break;
    case "testar":
      comandoTestar(args);
      break;
    case "atacar":
      comandoAtacar(args);
      break;
    default:
      imprimirUso();
      process.exitCode = comando ? 1 : 0;
  }
}

main();
