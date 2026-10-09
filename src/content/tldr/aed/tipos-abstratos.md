## Contrato e representação

Um **TAD** define valores e operações observáveis; a representação determina os custos.

- Consultar `i` exige `0<=i<size`; retirar da frente exige não vazio ou um resultado explícito de ausência.
- O **invariante da representação** liga campos privados ao valor abstrato. Numa lista simples, a cadeia não tem ciclos, termina em nulo e contém exatamente `tamanho` nós; `primeiro` é nulo exatamente no vazio.
- O construtor estabelece o invariante; cada método público preserva-o; o destrutor liberta os recursos possuídos.
- Representações substituíveis respeitam os mesmos resultados e pré-condições.

## Escolha pelos custos

Com `n` elementos:

| Operação                       | Vetor                | Lista simplesmente ligada                  |
| ------------------------------ | -------------------- | ------------------------------------------ |
| Consultar índice `i`           | $O(1)$               | $O(i+1)$                                   |
| Inserir/remover à frente       | $O(n)$               | $O(1)$                                     |
| Acrescentar no fim             | $O(1)$ amortizado    | $O(1)$ com apontador final, $O(n)$ sem ele |
| Remover último                 | $O(1)$               | $O(n)$ para localizar anterior             |
| Inserir depois de nó conhecido | $O(n)$ no caso geral | $O(1)$                                     |

Uma lista dupla remove um nó conhecido em $O(1)$, mas continua sem acesso direto por índice. Inclui sempre o custo de **localizar** a posição.

Muitas consultas por índice e poucas inserções no fim favorecem o vetor.

## Posse e invalidação

- Copiar só o apontador inicial de uma estrutura proprietária duplica a posse dos mesmos nós. Dois destrutores acedem a memória libertada e podem libertá-la novamente: comportamento indefinido.
- Define cópia profunda, transferência de posse ou proibição de cópia. Os containers da biblioteca gerem os seus recursos.
- Realocar um `vector` invalida todos os iteradores, referências e apontadores para elementos. Sem realocação, inserir pode invalidar os da posição de inserção e seguintes.
- Num `list`, inserir preserva iteradores e apagar invalida os do elemento apagado. Confere a garantia da operação concreta.

Com `size()==capacity()`, `push_back` bem-sucedido realoca. Guarda o índice e obtém um iterador novo depois, se a posição lógica se conservar.

## Composição e verificação

- `n` inserções em `set` custam $O(n\log n)$. Consultas hash esperadas constantes dão custo esperado linear sob hipóteses de hashing, sem garantia de pior caso linear.
- Passar uma estrutura por valor pode custar mais que o trabalho interno. Usa referência constante para leitura sem cópia.

Confere invariantes após alterações e casos limite. Compara com referência independente em entradas pequenas; testes finitos não provam correção geral. Verifica overflow, memória e profundidade recursiva.

[Contratos e exemplos completos](/cadeiras/aed/tipos-abstratos/).
