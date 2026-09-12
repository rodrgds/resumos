---
title: Folha de consulta de FSC
description: Testes rápidos para representação de dados, lógica digital, memória, LEGv8 e controlo monociclo.
section: recursos
studyKind: revision
editorial:
  sources:
    - title: Resumos FSC1 SofiaViP
      url: https://drive.google.com/file/d/1VRsdZe76UTF0dHCAMq_A94Pxiy8feV0q/view
    - title: Resumos FSC2 SofiaViP
      url: https://drive.google.com/file/d/1JblCT2rthgQyHKmeIqjm55ul36fjABFr/view
  coverage: As seis páginas de FSC1 cobrem representação numérica, Booleanos, circuitos combinatórios e sequenciais e memórias. As quatro páginas de FSC2 cobrem tradução de programas, registos e instruções LEGv8 e sinais do datapath monociclo.
  gaps:
    - Os PDFs não desenvolvem uma ISA completa, hierarquias de cache ou execução em pipeline.
    - A edição do programa e as regras de avaliação a que estes apontamentos correspondem não foram confirmadas.
---

Esta folha condensa os apontamentos [FSC1](https://drive.google.com/file/d/1VRsdZe76UTF0dHCAMq_A94Pxiy8feV0q/view) e [FSC2](https://drive.google.com/file/d/1JblCT2rthgQyHKmeIqjm55ul36fjABFr/view) de SofiaViP. Distingue sempre **valor, representação e largura em bits** antes de fazer contas.

## Bases, inteiros e vírgula flutuante

Num sistema posicional de base $b$, $(d_k\cdots d_0)_b=\sum_{i=0}^k d_i b^i$. Para converter a parte inteira de decimal para binário, divide sucessivamente por 2 e lê os restos de baixo para cima; para a parte fracionária, multiplica por 2 e lê as partes inteiras por ordem. Uma fração decimal pode não terminar em binário. Agrupa bits da direita para a esquerda em **trios** para octal e em **quartetos** para hexadecimal, preservando a vírgula. Vê [conversões de base](/cadeiras/fsc/representacao-dados/#de-decimal-para-binário) e [binário, octal e hexadecimal](/cadeiras/fsc/representacao-dados/#binário-octal-e-hexadecimal).

Com $n$ bits, o intervalo sem sinal é $[0,2^n-1]$; em complemento para dois é $[-2^{n-1},2^{n-1}-1]$. Para obter $-x$ dentro de $n$ bits, inverte os bits de $x$ e soma 1, desde que $x$ caiba no intervalo com sinal. Ao alargar uma palavra com sinal, **repete o bit mais significativo**; sem sinal, acrescenta zeros. Na soma com sinal, há overflow se dois operandos de mesmo sinal produzirem resultado de sinal oposto. O carry final, por si, não é esse teste. Revê [complemento para dois](/cadeiras/fsc/inteiros-complemento-dois/#inteiros-com-sinal), [extensão](/cadeiras/fsc/inteiros-complemento-dois/#extensão-de-sinal) e [overflow](/cadeiras/fsc/inteiros-complemento-dois/#overflow).

Para um valor **normal** IEEE 754, $(-1)^s(1.f)_2\,2^{E-\mathrm{bias}}$. Em precisão simples, os campos têm $1/8/23$ bits e $\mathrm{bias}=127$; em dupla, $1/11/52$ e $\mathrm{bias}=1023$. O 1 inicial da significanda é implícito só nos valores normais. $E=0$ indica zero ou subnormal; $E$ todo a 1 indica infinito ou NaN. Não arredondes uma conversão binária infinita como se fosse exata. Vê [IEEE 754](/cadeiras/fsc/virgula-flutuante/#o-formato-ieee-754) e [valores especiais](/cadeiras/fsc/virgula-flutuante/#valores-especiais).

## Álgebra de Boole e circuitos

Nesta secção, $+$ é OU, justaposição é E e barra é NÃO. Verifica $x+\bar x=1$, $x\bar x=0$, $x+xy=x$ e as leis de De Morgan $\overline{x+y}=\bar x\bar y$, $\overline{xy}=\bar x+\bar y$. A expansão de Shannon, $F=xF|_{x=1}+\bar xF|_{x=0}$, separa os dois casos de uma variável. **Soma de produtos** liga mintermos das linhas com saída 1; **produto de somas** liga maxtermos das linhas com saída 0. Revê [a álgebra](/cadeiras/fsc/algebra-boole-portas/#a-álgebra) e [as formas canónicas](/cadeiras/fsc/algebra-boole-portas/#formas-canónicas).

Um circuito combinatório depende apenas das entradas atuais. Um multiplexador $2^k:1$ seleciona uma de $2^k$ entradas com $k$ bits de seleção; um desmultiplexador encaminha uma entrada para uma de $2^k$ saídas; um descodificador de $k$ bits ativa uma das $2^k$ saídas. Num somador completo, $S=A\oplus B\oplus C_{in}$ e $C_{out}=AB+C_{in}(A\oplus B)$. Encadear os carries cria o atraso do somador ripple-carry. Vê [multiplexador](/cadeiras/fsc/circuitos-combinatorios/#multiplexador), [descodificador](/cadeiras/fsc/circuitos-combinatorios/#descodificador-binário) e [somador](/cadeiras/fsc/circuitos-combinatorios/#o-somador-ripple-carry).

Num circuito sequencial, a saída pode depender do **estado guardado**. O flip-flop D amostra $D$ no flanco ativo do relógio e guarda-o em $Q$; um registo agrupa flip-flops. Para a próxima amostra ser estável, o período tem de acomodar, no mínimo, atraso relógio-para-$Q$, lógica combinatória e tempo de setup, além das margens do circuito. Numa máquina de estados, escreve transições para **todas** as entradas em cada estado e evita condições sobrepostas. Vê [flip-flops](/cadeiras/fsc/circuitos-sequenciais/#flip-flops) e [máquinas de estados](/cadeiras/fsc/circuitos-sequenciais/#máquinas-de-estados-finitas).

## Memória e endereços

Com $P$ bits de endereço, uma memória tem $2^P$ posições; se cada posição guardar $W$ bits, a capacidade é $2^P W$ bits. Para posições de 8 bits, isso dá $2^P$ bytes; $2^{10}$ bytes são 1 KiB. Na descodificação **total**, cada endereço seleciona uma posição; na **parcial**, bits ignorados criam vários endereços para a mesma posição. Revê [capacidade](/cadeiras/fsc/memorias/#capacidade) e [descodificação](/cadeiras/fsc/memorias/#descodificação).

RAM permite leitura e escrita; ROM é lida em funcionamento normal. SRAM guarda bits sem refrescamento e é rápida; DRAM exige refrescamento e é mais densa. Em memória **endereçada ao byte**, endereços consecutivos designam bytes consecutivos. Para uma palavra com vários bytes, little-endian põe o byte menos significativo no menor endereço; big-endian põe o mais significativo. A ordem dos bits **dentro** de cada byte não muda. Vê [tipos de memória](/cadeiras/fsc/memorias/#tipos-de-memória) e [endianness](/cadeiras/fsc/legv8-registos-memoria/#endianness).

## Tradução, LEGv8 e controlo

O código fonte é traduzido para instruções que a máquina pode executar: o compilador produz código objeto, o linker junta referências e bibliotecas, e o loader coloca o programa em memória. O PDF distingue linguagens interpretadas e compiladas como modelos gerais; uma linguagem concreta pode combinar compilação e interpretação. No LEGv8 desta cadeira, cada instrução ocupa **32 bits, ou 4 bytes**, e a memória é endereçada ao byte. Vê [instruções LEGv8](/cadeiras/fsc/legv8-instrucoes/#instruções-do-tipo-r).

No formato R, lê `Rd` como destino, `Rn` e `Rm` como operandos, e `SHAMT` como deslocamento. `LDUR` e `STUR` usam o formato D: endereço efetivo $=\mathrm{Rn}+\text{offset}$, com offset em complemento para dois; `LDUR` lê e escreve num registo, `STUR` escreve na memória. `CBZ` testa um registo e só salta se ele for zero; `B` salta sempre. No modelo explicado nos apontamentos, o deslocamento de salto em instruções converte-se em bytes multiplicando por 4. `BL` guarda o endereço de regresso em `X30` (LR); um procedimento que chama outro tem de preservar o LR antes da nova chamada. Vê [acessos à memória](/cadeiras/fsc/legv8-instrucoes/#instruções-do-tipo-d), [saltos](/cadeiras/fsc/legv8-instrucoes/#saltos-condicionais-e-incondicionais) e [procedimentos](/cadeiras/fsc/legv8-instrucoes/#procedimentos).

No datapath **monociclo**, escolhe os sinais pelo percurso dos dados:

- Tipo R: operandos de registos, ALU definida pela instrução, resultado escrito em registo; sem acesso à memória de dados.
- `LDUR`: ALU soma base e offset, lê memória, escreve o dado num registo.
- `STUR`: ALU soma base e offset, escreve na memória; não escreve num registo.
- `CBZ`: testa zero e só escolhe o destino do salto se a condição for verdadeira; `B` escolhe-o sempre. Caso contrário, o PC avança 4 bytes.

Os sinais `MemRead` e `MemWrite` nunca devem ativar-se juntos nestes percursos. Um sinal `X` numa tabela de controlo quer dizer **indiferente para essa instrução**, não desconhecido. O CPI do monociclo é 1, mas o período do relógio tem de suportar a instrução mais lenta. Vê [sinais de controlo](/cadeiras/fsc/datapath-controlo/#os-sinais-de-controlo) e [o preço do monociclo](/cadeiras/fsc/datapath-controlo/#o-preço-do-monociclo).

Estes PDFs são uma seleção de tópicos, não uma especificação completa de hardware ou do programa atual.
