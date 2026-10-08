# Fontes e escolhas editoriais

O LEIC tem vários autores e diferentes graus de desenvolvimento. Usa passagens concretas para aprender a conduzir uma explicação. A matéria, a notação e as regras de avaliação continuam a vir das fontes FEUP.

## Corpus e limites

O [código-fonte estudado](https://github.com/leic-pt/resumos-leic/tree/e8955899be9a7b449962aa1d86100bce4a091407/content) contém 317 ficheiros Markdown em 31 pastas de cadeiras e na página inicial. O levantamento de setembro de 2026 examinou títulos, entradas e passagens do corpus e leu os dez guias. A investigação de 8 de outubro leu integralmente 31 lições de 19 cadeiras, comparou 11 páginas FEUP e observou algumas páginas e figuras no navegador.

A leitura integral inclui código e blocos expansíveis no texto-fonte. Não inclui todos os PDFs ligados nem prova a correção de todas as fórmulas, programas ou figuras. A revisão remota consultada em 8 de outubro, `51b18895365fe78205061460ba2590a1b9c9dbd5`, não alterou nenhuma dessas 31 lições em relação ao commit fixado. Isto não identifica a revisão de produção.

Quando disponível, o clone local está em `data/unrelated/resumos-leic-ist/content/`. O estudo privado detalhado está em `_data/editorial/leic-estudo-2026-10-08/estudo.md`; a skill não depende da presença desse arquivo. As ligações abaixo permitem consultar diretamente as passagens.

## Calibrar com o mesmo domínio

Antes de rever uma cadeira, lê um capítulo e um exemplo desenvolvido próximo da matéria. Observa como o exemplo continua depois da abertura, a função dos títulos e a passagem que cada figura torna visível. Não copies a estrutura inteira por ser curta.

| Matéria             | Passagem                                                                                                                                                                 | Mecanismo a adaptar                                                                                                                                                      |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Bases de dados      | [SQL, compras e agregação](https://github.com/leic-pt/resumos-leic/blob/e8955899be9a7b449962aa1d86100bce4a091407/content/bd/0006-advanced-sql.md#L44-L93)                | Os mesmos dados respondem a perguntas sucessivas. A necessidade de filtrar grupos justifica HAVING.                                                                      |
| Modelação           | [Modelo EA, clube](https://github.com/leic-pt/resumos-leic/blob/e8955899be9a7b449962aa1d86100bce4a091407/content/bd/0003-er-model.md#L165-L201)                          | Uma proposta intermédia errada revela a independência das classificações. Adaptar para a notação FEUP.                                                                   |
| Estruturas de dados | [Dispersão, remoção](https://github.com/leic-pt/resumos-leic/blob/e8955899be9a7b449962aa1d86100bce4a091407/content/iaed/0017-hash-tables.md#L82-L109)                    | Seguir a mudança de estado e a procura seguinte torna visível o problema de deixar um buraco.                                                                            |
| Otimização          | [Programação linear, conversões](https://github.com/leic-pt/resumos-leic/blob/e8955899be9a7b449962aa1d86100bce4a091407/content/asa/0008-programacao-linear.md#L103-L230) | Reescrever o mesmo modelo em cada transformação, explicando a equivalência.                                                                                              |
| Álgebra             | [Espaços vetoriais](https://github.com/leic-pt/resumos-leic/blob/e8955899be9a7b449962aa1d86100bce4a091407/content/al/0004-espacos-vetoriais.md#L52-L120)                 | Exemplos positivos e negativos distinguem as condições de subespaço.                                                                                                     |
| Cálculo             | [Equações exatas](https://github.com/leic-pt/resumos-leic/blob/e8955899be9a7b449962aa1d86100bce4a091407/content/cdi-iii/0004-equacoes-exatas.md#L51-L168)                | Testar, transformar e voltar a testar a mesma equação motiva o fator integrante.                                                                                         |
| Matemática discreta | [Funções geradoras](https://github.com/leic-pt/resumos-leic/blob/e8955899be9a7b449962aa1d86100bce4a091407/content/emd/0007-funcoes-geradoras.md)                         | Um problema de moedas abre a lição; as ferramentas desenvolvidas permitem regressar-lhe no fim. Adaptar a progressão, não acrescentar matéria ao currículo por analogia. |
| Física              | [Trabalho e energia](https://github.com/leic-pt/resumos-leic/blob/e8955899be9a7b449962aa1d86100bce4a091407/content/fis-i/0004-work.md#L241-L290)                         | Mudar a escala do lançamento exige reconsiderar a hipótese sobre a gravidade.                                                                                            |
| Redes               | [Fiabilidade](https://github.com/leic-pt/resumos-leic/blob/e8955899be9a7b449962aa1d86100bce4a091407/content/rc/0003-transporte.md#L105-L146)                             | O ACK ambíguo cria a necessidade de distinguir retransmissões. Cada mecanismo responde a uma falha concreta.                                                             |
| Sistemas            | [Custo das tabelas de páginas](https://github.com/leic-pt/resumos-leic/blob/e8955899be9a7b449962aa1d86100bce4a091407/content/so/0010-memory-management.md#L137-L170)     | A conta do espaço gasto precede a organização multinível.                                                                                                                |
| Arquitetura         | [Forwarding](https://github.com/leic-pt/resumos-leic/blob/e8955899be9a7b449962aa1d86100bce4a091407/content/oc/0006-pipelines.md#L83-L114)                                | A figura localiza produção e consumo do resultado no tempo. Manter a ISA e as hipóteses FEUP.                                                                            |
| Testes              | [Cobertura de condições](https://github.com/leic-pt/resumos-leic/blob/e8955899be9a7b449962aa1d86100bce4a091407/content/es/0003-code-coverage.md#L39-L104)                | O mesmo programa permite comparar critérios. A figura marca a condição não avaliada por curto-circuito.                                                                  |
| Prolog              | [Mínimo e corte](https://github.com/leic-pt/resumos-leic/blob/e8955899be9a7b449962aa1d86100bce4a091407/content/lp/0009-prolog-corte-neg.md#L147-L187)                    | Testar a simplificação com a saída já instanciada revela uma condição escondida pela consulta mais habitual.                                                             |

## Escolhas do projeto

A explicação acompanha exemplos e os títulos identificam tópicos. Esta combinação é uma escolha editorial do projeto. Não implica um exemplo obrigatório na primeira frase, secções sempre do mesmo tamanho ou uma quota de figuras.

As páginas longas podem desenvolver tarefas diferentes. As curtas podem omitir o exemplo necessário. Alguns originais escondem a primeira aplicação em expansíveis, dependem de slides externos ou terminam com avisos de incompletude. Mantém a explicação essencial visível e autónoma.

Há erros localizados que exigem refazer os exemplos. Em dispersão, `k % M` pode colidir mesmo com menos de `M` chaves: 1 e 6 dão o mesmo resto por 5. Em normalização, as dependências do exemplo de 2FN tornam `id` uma chave; acrescentar `modelo` não produz uma chave candidata mínima. Inspira-te na progressão e verifica as contas nas fontes FEUP.

As nossas lições também têm elementos a conservar. Programação linear acompanha a oficina até ao dual; estudo de funções desenvolve um exemplo completo; avaliação de usabilidade interpreta dados de uma tarefa. Uma referência de estilo não obriga a substituir uma explicação melhor.

## Guias práticos

Os guias seguintes ajudam a calibrar instruções, sem confirmar que as ferramentas históricas continuam atuais:

- [Básicos de R](https://resumos.leic.pt/pe/guides/r-basics/): código, resultado e alteração dos dados.
- [Correr CGI localmente](https://resumos.leic.pt/bd/guides/running-cgi-files-locally/): pasta, comando, resultado e processo que deve continuar aberto.
- [Aplicação bancária](https://resumos.leic.pt/po/guide/bank/): ordem das dependências e verificações intermédias.
- [FAQ de LP](https://resumos.leic.pt/lp/projeto/faq/): dúvidas concretas de execução de um projeto.

Confirma comandos e APIs atuais na documentação oficial. A sintaxe Gatsby, macros, caminhos e comandos do LEIC não são convenções deste repositório. O CONTRIBUTING local é a fonte dos formatos suportados.
