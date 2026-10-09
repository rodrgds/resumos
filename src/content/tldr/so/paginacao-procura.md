## Falta de página

A paginação por procura prepara uma página quando é usada. **Localidade temporal** é reutilização recente; **espacial** é acesso a posições próximas.

1. O núcleo verifica se o acesso é legal. Endereço inválido ou escrita proibida não se resolve carregando dados.
2. Numa ausência recuperável, obtém uma moldura livre ou escolhe uma vítima.
3. Prepara os dados, por leitura, página a zero ou cópia em memória.
4. Atualiza tabelas e traduções e permite repetir a instrução.

Uma vítima **suja** pode precisar de escrita; uma limpa pode ser reconstruída sem a guardar em swap. Nem toda a falta exige disco, como uma cópia por copy-on-write.

## Substituição de páginas

| Política | Vítima e estado a manter                                                             |
| -------- | ------------------------------------------------------------------------------------ |
| FIFO     | Página que entrou há mais tempo; acertos não reordenam                               |
| OPT      | Próximo uso mais distante, ou sem uso futuro; referência mínima com futuro conhecido |
| LRU      | Último acesso mais antigo; **cada acerto** atualiza a recência                       |
| Relógio  | A partir da ponteira, limpar bits 1 e avançar; substituir o primeiro 0 e avançar     |

Para três molduras vazias e `1,2,3,1,4,2,1,3`:

| Política | Falta ou acerto em cada referência | Total de faltas |
| -------- | ---------------------------------- | --------------- |
| FIFO     | F, F, F, A, F, A, F, A             | 5               |
| LRU      | F, F, F, A, F, F, A, F             | 6               |
| OPT      | F, F, F, A, F, A, A, F             | 5               |

As primeiras cargas contam como faltas. Regista o estado após cada referência, mesmo num acerto. No passo que pede 4, FIFO retira 1, LRU retira 2 e OPT retira 3.

- FIFO pode sofrer **anomalia de Belady**, com mais faltas ao aumentar molduras. LRU e OPT são algoritmos de pilha e não têm essa anomalia no modelo.
- No relógio com ponteira em A e bits A=1, B=0, C=1, limpa A e escolhe B; a ponteira fica em C. Um acesso põe o bit a 1.
- A segunda oportunidade melhorada também considera sujidade. LFU e MFU usam frequências, que podem descrever mal a localidade atual.

## Custo e distribuição

Com probabilidade de falta $p$, acesso normal $M$ e serviço completo $F$ **incluindo o acesso repetido**:

$$
EAT=(1-p)M+pF.
$$

Para $M=100$ ns, $F=5$ ms e $p=10^{-4}$, converte $F$ para 5000000 ns: o resultado é **599,99 ns**. Se o serviço excluir a repetição, adapta o custo.

- Alocação igual divide molduras igualmente; proporcional pode usar páginas do processo, com mínimos e arredondamentos definidos.
- Substituição **local** só retira molduras do próprio processo. A **global** pode retirar de outros e espalhar a pressão.

## Working set e thrashing

O working set é o **conjunto de páginas distintas** usadas nas últimas $\Delta$ referências. A janela `2,1,3,2,4` tem tamanho 4; depois de entrar 5, a janela `1,3,2,4,5` tem tamanho 5.

**Thrashing** é paginação repetida que ocupa muito tempo e impede trabalho útil. Working sets conjuntos maiores que a RAM sinalizam pressão, mas não provam, por si, thrashing. Reduzir processos ativos, aumentar molduras ou controlar a frequência de faltas pode recuperar progresso.

- Matrizes C têm linhas contíguas. Contagens de faltas exigem dimensões, percurso, páginas e molduras definidos.
- Prepaging antecipa cargas, com desperdício se a previsão falhar. Páginas em I/O podem precisar de ficar presas em memória.
- Buddy usa blocos de potências de dois e junta pares livres; 21 KiB num bloco de 32 KiB deixam 11 KiB de fragmentação interna. Slab reutiliza objetos do mesmo tipo.

[Tabela completa das referências](/cadeiras/so/paginacao-procura/#fazer-uma-tabela-de-referências).
