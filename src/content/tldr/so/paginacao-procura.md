## Falta de página

Procura adia a carga até ao uso. Passos: MMU deteta ausência, núcleo valida o acesso, arranja moldura, prepara dados, atualiza tabelas e repete a instrução.

- Ilegal não se resolve com disco. COW pode copiar sem disco. Vítima **suja** pode exigir escrita; limpa reconstrói-se.
- Processo em falta de I/O pode bloquear e largar a CPU.

## Políticas

| Política | Vítima                          | Nota                                |
| -------- | ------------------------------- | ----------------------------------- |
| FIFO     | entrada mais antiga             | acerto não reordena                 |
| LRU      | acesso mais antigo              | **cada** acerto atualiza            |
| OPT      | uso futuro mais distante        | referência mínima, futuro conhecido |
| Relógio  | primeiro 0 a partir da ponteira | limpa 1s, acesso põe a 1            |

Para `1,2,3,1,4,2,1,3` com 3 molduras: FIFO `F,F,F,A,F,A,F,A` (5); LRU `F,F,F,A,F,F,A,F` (6); OPT `F,F,F,A,F,A,A,F` (5). Cargas iniciais contam. No pedido de 4: FIFO tira 1, LRU tira 2, OPT tira 3.

- Mais molduras com FIFO pode dar mais faltas (**Belady**). LRU e OPT são de pilha: imunes no modelo.
- NRU escolhe da primeira classe `(R,M)` não vazia: `(0,0)`, `(0,1)`, `(1,0)`, `(1,1)`. Aqui $R$ é o bit de referência desde a última limpeza e $M$ o bit de modificação; $R$ não é idade exata.

## Custo e localidade

$$
EAT=(1-p)M+pF,
$$

com acesso normal $M$, custo completo de falta $F$ incluindo o acesso repetido, e probabilidade de falta $p$. Usa a mesma unidade nos dois termos. Para $M=100$ ns, $F=5$ ms, $p=10^{-4}$: $599{,}99$ ns.

- Local divide molduras por processo; global retira de outros.
- Working set: páginas distintas nas últimas $\Delta$ referências. `2,1,3,2,4` dá 4.
- **Thrashing**: paginação contínua sem trabalho útil. Conjuntos maiores que a RAM sinalizam pressão; baixa CPU não pede mais processos.
- Matriz C: linhas contíguas. Faltas exigem dimensões, percurso, página e molduras.
- Núcleo: buddy (potências de dois, 21 KiB em 32 KiB deixa 11 de fragmento interno), slab (objetos do tipo).

[Tabela passo a passo](/cadeiras/so/paginacao-procura/#fazer-uma-tabela-de-referências).
