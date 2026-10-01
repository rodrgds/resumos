---
title: Paginação por procura
description: Faltas de página, FIFO, OPT, LRU, relógio, working set e thrashing.
section: conteudo
order: 11
practices:
  - so/praticar-paginacao
---

Nem todas as páginas de um processo precisam de estar na RAM ao mesmo tempo. A paginação por procura prepara uma página quando o processo a referencia. A vantagem depende de **localidade**: durante algum tempo, um programa costuma usar um conjunto relativamente pequeno de páginas.

## Tratar uma falta de página

1. A MMU encontra uma página sem presença ou uma condição de proteção e entra no núcleo.
2. O núcleo verifica se o acesso é legal. Um endereço inválido ou uma escrita proibida não se resolve simplesmente lendo do disco.
3. Para uma ausência recuperável, encontra uma moldura livre ou escolhe uma vítima.
4. Prepara os dados, lendo o ficheiro ou swap se necessário, ou criando uma página a zero.
5. Atualiza a tabela e as traduções relevantes, depois permite repetir a instrução.

Se há I/O, o processo pode bloquear e outro usar CPU entretanto. Uma falta por copy-on-write pode copiar uma página já em memória sem ler disco. O custo de falta de página não é uma constante universal.

Uma vítima **suja** foi alterada e pode exigir escrita antes de reutilizar a moldura. Uma página limpa de código pode ser descartada e reconstruída do executável. Não é necessário escrever todas as vítimas para swap.

## Fazer uma tabela de referências

Para resolver um exercício, escreve as páginas residentes após **cada referência**, marca falta ou acerto e mantém o estado da política. Molduras inicialmente vazias também provocam faltas. Um acerto pode atualizar LRU ou o bit de referência, mesmo sem substituir nada.

Vamos usar três molduras e a sequência `1, 2, 3, 1, 4, 2, 1, 3`. Os números são páginas, não endereços completos.

| Referência | FIFO, ordem de entrada | LRU, da menos para a mais recente | OPT, conjunto residente |
| ---------- | ---------------------- | --------------------------------- | ----------------------- |
| 1          | 1, falta               | 1, falta                          | 1, falta                |
| 2          | 1 2, falta             | 1 2, falta                        | 1 2, falta              |
| 3          | 1 2 3, falta           | 1 2 3, falta                      | 1 2 3, falta            |
| 1          | 1 2 3, acerto          | 2 3 1, acerto                     | 1 2 3, acerto           |
| 4          | 2 3 4, falta           | 3 1 4, falta                      | 1 2 4, falta            |
| 2          | 2 3 4, acerto          | 1 4 2, falta                      | 1 2 4, acerto           |
| 1          | 3 4 1, falta           | 4 2 1, acerto                     | 1 2 4, acerto           |
| 3          | 3 4 1, acerto          | 2 1 3, falta                      | 1 2 3, falta            |

Totais: FIFO 5, LRU 6 e OPT 5. No último passo de OPT, qualquer página que já não será usada pode sair; escolhemos 4 por convenção. Políticas diferentes podem dar o mesmo total e estados diferentes.

## FIFO, OPT e LRU

**FIFO** retira a página que entrou há mais tempo. Um acerto não a põe no fim da fila. É simples, mas não considera utilização recente.

**OPT** retira a página cuja próxima utilização está mais longe no futuro, ou que não volta a ser usada. Na referência 4 do exemplo, os próximos usos de 2, 1 e 3 são os passos 6, 7 e 8. Retiramos 3. OPT serve como referência mínima para a sequência conhecida; o sistema não conhece em geral o futuro.

**LRU** retira a página cujo último acesso está mais longe no passado. Na referência 4, 2 foi usada no passo 2, 3 no passo 3 e 1 no passo 4. Retiramos 2. A implementação exata pode usar tempos de último acesso ou uma lista atualizada em cada referência, com custo de manutenção.

Não confundas FIFO com LRU: no primeiro, a idade vem da entrada; no segundo, do último acesso.

## Anomalia de Belady e aproximações

FIFO pode ter mais faltas com mais molduras. Na sequência `1,2,3,4,1,2,5,1,2,3,4,5`, dá 9 faltas com três molduras e 10 com quatro. Esta é a **anomalia de Belady**. LRU e OPT são algoritmos de pilha: os conjuntos residentes com menos molduras estão contidos nos correspondentes conjuntos com mais molduras, por isso não têm essa anomalia no modelo.

No **relógio**, as molduras formam um anel e uma ponteira procura uma vítima. Se o bit de referência é 1, põe-no a zero e avança. Se é 0, substitui e avança. A utilização põe o bit a 1. Esta segunda oportunidade aproxima recência sem guardar uma ordem completa.

Com ponteira em A e bits A=1, B=0, C=1, a procura limpa A e escolhe B. Não escolhe A só por ser a primeira. É preciso saber onde começa a ponteira e como os bits são atualizados.

A segunda oportunidade melhorada considera referência e sujidade: uma página `(0,0)` não recente e limpa é uma boa vítima; `(0,1)` exige escrita. LFU retira a menos referenciada e MFU a mais referenciada, mas contagens históricas podem representar mal a localidade atual. Pools de molduras livres e escrita antecipada de páginas sujas podem reduzir o trabalho no momento da falta.

## Quanto custa uma pequena taxa de faltas

Suponhamos acesso normal $M=100$ ns e serviço completo de falta $F=5$ ms, incluindo a repetição do acesso. Com probabilidade de falta $p=10^{-4}$:

$$
EAT=(1-p)M+pF
=0,9999\times100+0,0001\times5000000
=599,99\text{ ns}.
$$

Mesmo uma falta em dez mil acessos aumenta o tempo médio para quase seis vezes. Para permitir no máximo 10% de aumento:

$$
(1-p)100+p\,5000000\leq110
\quad\Rightarrow\quad p\leq\frac{10}{4999900}\approx2\times10^{-6}.
$$

Converte milissegundos para nanossegundos antes de somar. Se o custo dado exclui o acesso repetido ou inclui uma probabilidade separada de vítima suja, adapta a fórmula.

## Distribuir molduras

Alocação igual dá o mesmo número a cada processo. Alocação proporcional pode usar o tamanho: com 60 molduras e processos de 10 e 20 páginas, uma divisão proporcional dá 20 e 40, respeitando mínimos e os ajustes de arredondamento definidos.

Na substituição **local**, um processo só escolhe entre as suas molduras. Na **global**, pode retirar molduras que estavam atribuídas a outro. A global pode aproveitar melhor a memória livre de utilização, mas também espalhar pressão entre processos. A local limita interferência, sem garantir que cada processo tenha memória suficiente.

## Working set e thrashing

O **working set** numa janela de $\Delta$ referências é o conjunto de páginas usadas nessa janela. Para as últimas referências `2,1,3,2,4`, o conjunto é `{1,2,3,4}` e o tamanho é 4, não 5.

Se os processos ativos precisam em conjunto de mais molduras do que as disponíveis, podem retirar e voltar a carregar páginas continuamente. Este **thrashing** faz o sistema passar muito tempo em paginação e pouco em trabalho útil. A CPU pode ficar menos utilizada enquanto espera pelo disco. Acrescentar processos por causa dessa baixa utilização pode piorar a pressão.

Reduzir o número de processos ativos, dar mais molduras aos conjuntos de trabalho ou controlar a frequência de faltas pode recuperar progresso. A frequência de faltas mede diretamente quando um processo precisa de mais ou menos molduras. A janela do working set é uma aproximação: curta de mais perde parte da localidade; longa de mais junta localidades antigas.

## Estrutura do programa e outras escolhas

Em C, linhas de uma matriz são contíguas. Percorrer uma linha antes de passar à seguinte tende a aproveitar melhor a localidade do que saltar entre linhas, mas o número exato de faltas depende de página, dimensões e molduras. Não transfiras contagens de um exemplo para outro sem essas hipóteses.

_Prepaging_ traz páginas antes do primeiro uso e pode evitar faltas iniciais, mas desperdiça I/O quando a previsão falha. Páginas em I/O podem precisar de ficar presas em memória para não serem substituídas a meio da transferência. Em NUMA, a memória próxima da CPU pode ser mais rápida, ligando alocação e escalonamento.

Para memória do núcleo, **buddy** divide blocos em potências de dois e junta pares compatíveis quando ambos ficam livres. Um pedido de 21 KiB pode ocupar um bloco de 32 KiB, com 11 KiB de capacidade excedente. **Slab** guarda conjuntos de objetos do mesmo tipo para reutilização rápida, reduzindo trabalho de inicialização e fragmentação entre objetos, mas não eliminando todo o desperdício de páginas e alinhamento.

Compressão pode guardar várias páginas comprimidas numa moldura, evitando parte do I/O com custo de CPU. `mmap` de ficheiros também aproxima I/O da gestão de páginas: aceder ao mapeamento pode provocar uma falta, e alterações partilhadas podem precisar de sincronização com o ficheiro.
