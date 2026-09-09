export interface ResultadoTeste {
  dadosRolados: number[];
  dadoEscolhido: number;
  total: number;
  sucesso: boolean;
};

// genérico: rola 1 dado de "faces" lados (d20 por padrão)
export function rolarDado(faces: number = 20): number {
  const valor = Math.floor(Math.random() * faces) + 1;
  return valor;
};

export function rolarD20(): number {
  return rolarDado(20);
};

export function rolarTeste(modificador: number, cd: number, quantidadeDados: number = 2): ResultadoTeste {
    // sortear os dados
    let array: number[] = [];
    for (let i = 0; i < quantidadeDados; i++){
        array.push(rolarD20());
    }
    // maior valor
    const maiorValor = Math.max(...array);
    // somar total
    const total = modificador + maiorValor
    // definir sucesso
    const sucesso = total >= cd

    return {
        dadosRolados: array,
        dadoEscolhido: maiorValor,
        total: total,
        sucesso: sucesso
    };
};
