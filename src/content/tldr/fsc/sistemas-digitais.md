## Bits e níveis

- Um **bit** vale 0 ou 1. No circuito, cada valor é um **intervalo de tensão**; a zona intermédia não é um terceiro valor.
- Margens entre intervalos toleram ruído pequeno e permitem regenerar o sinal. Atrasos físicos continuam a existir.
- Conversão analógica-digital: amostra e quantifica. Com $n$ bits há $2^n$ códigos; valores próximos podem partilhar o código.

## Transístores e portas

- NMOS conduz com controlo 1; PMOS, com controlo 0. Rede **pull-up** liga à alimentação; **pull-down**, à massa.
- Inversor: um PMOS e um NMOS; saída $\overline A$. NAND: NMOS em série, PMOS em paralelo. NOR: o inverso.
- Na NAND, só $A=B=1$ fecha o caminho à massa. Com $A=1,B=0$, o PMOS de B liga a saída a 1.
- Em CMOS ideal estável, sem caminho direto alimentação-massa. Consumo e atrasos exigem outro modelo.

## Abstração

Transístores → portas → somadores → ALU. A CPU executa instruções guardadas em memória.

- **Combinatório:** a saída depende das entradas atuais, após propagação.
- **Sequencial:** guarda estado e atualiza-o no instante permitido.

[Portas CMOS na lição](/cadeiras/fsc/sistemas-digitais/#construir-nand-e-nor).
