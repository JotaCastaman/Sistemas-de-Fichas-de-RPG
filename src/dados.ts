interface ResultadoTeste {
  dadosRolados: number[];
  dadoEscolhido: number;
  total: number;
  sucesso: boolean;
};


function rolarD20(): number {
    const valor = (Math.floor(Math.random() * 20)) + 1;
    return valor;
};

function rolarTeste(modificador: number, cd: number, quantidadeDados: number = 2): ResultadoTeste {
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
