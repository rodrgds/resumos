# Fontes e escolhas editoriais

Consulta este ficheiro para comparar o tom com uma cadeira ou um guia de origem. O site tem vários autores e diferentes graus de detalhe. A skill seleciona os hábitos que ajudam a ensinar e adapta-os ao pedido de escrita simples e explícita.

## Âmbito do levantamento

Consulta feita em 9 de setembro de 2026:

- [Resumos LEIC, código-fonte](https://github.com/leic-pt/resumos-leic/tree/e8955899be9a7b449962aa1d86100bce4a091407/content): 316 páginas Markdown em 31 cadeiras e a página inicial, num total de 317. Foram revistos títulos, entradas e passagens explicativas de todas as páginas, incluindo arquivos, formulários, exercícios e páginas sem resumos. Aprofundaram-se exemplos representativos de definições, código, demonstrações e instruções. Este levantamento de estilo não é uma revisão integral da correção de todas as matérias.
- Foram lidos integralmente os dez documentos classificados como guias, incluindo o FAQ do projeto de LP, que não está numa pasta `guides`.
- [Documentação de contribuição](https://github.com/leic-pt/docs/tree/2771b2b1444bf4593a43e5e96955c76dd0099ca5/docs): leitura dos 15 documentos, incluindo configuração, Git, edição, submissão e as nove referências de Markdown.

A recolha direta por HTTP foi bloqueada. A cobertura completa usa os repositórios públicos ligados pelos sites. Foram comparadas páginas publicadas de [Normalização](https://resumos.leic.pt/bd/normalization/), [Princípio do Pombal](https://resumos.leic.pt/emd/principio-pombal/), [Básicos de R](https://resumos.leic.pt/pe/guides/r-basics/) e [Aplicação Bancária](https://resumos.leic.pt/po/guide/bank/), além das páginas iniciais e de documentação acessíveis pela pesquisa. Os commits acima identificam o corpus, não uma versão de produção confirmada.

Os PDFs, livros, slides e outros destinos externos ligados pelas páginas não fazem parte desta leitura. Páginas que apenas ligam a anexos contam no levantamento, mas não fornecem evidência sobre a escrita desses anexos.

## Cobertura por cadeira

Os números incluem a página de entrada de cada cadeira. As observações descrevem o material disponível, não uma regra obrigatória para cada disciplina.

| Cadeira                                      | Páginas | Material observado                                                                         |
| -------------------------------------------- | ------: | ------------------------------------------------------------------------------------------ |
| [AL](https://resumos.leic.pt/al/)            |      10 | Definições formais acompanhadas de tradução para linguagem corrente e exemplos matriciais. |
| [AMS](https://resumos.leic.pt/ams/)          |       2 | Conceitos de sistemas e modelos explicados com objetos e situações concretas.              |
| [Apre](https://resumos.leic.pt/apre/)        |      15 | Necessidade de cada método, interpretação de métricas e limites dos modelos.               |
| [ASA](https://resumos.leic.pt/asa/)          |      13 | Problemas que motivam algoritmos, passos, justificação e análise de custos.                |
| [BD](https://resumos.leic.pt/bd/)            |       9 | Cenários reutilizados entre SQL e álgebra, tabelas que tornam as anomalias visíveis.       |
| [CDI-I](https://resumos.leic.pt/cdi-i/)      |      18 | Definições, hipóteses, teoremas e aplicações, com graus variáveis de desenvolvimento.      |
| [CDI-II](https://resumos.leic.pt/cdi-ii/)    |      21 | Pontes com uma dimensão, interpretação geométrica e significado da notação.                |
| [CDI-III](https://resumos.leic.pt/cdi-iii/)  |      15 | Métodos de resolução, condições iniciais e ligações a pré-requisitos de outras cadeiras.   |
| [CG](https://resumos.leic.pt/cg/)            |       1 | Página de entrada, sem capítulos de resumos neste corpus.                                  |
| [Comp](https://resumos.leic.pt/comp/)        |       1 | Página de entrada, sem capítulos de resumos neste corpus.                                  |
| [DER](https://resumos.leic.pt/der/)          |       1 | Aviso de ausência de resumos.                                                              |
| [EMD](https://resumos.leic.pt/emd/)          |      40 | Demonstrações com passos explicados, exemplos combinatórios, arquivo e folhas de consulta. |
| [ES](https://resumos.leic.pt/es/)            |       8 | Definições operacionais, comparações e casos concretos de testes.                          |
| [Física I](https://resumos.leic.pt/fis-i/)   |       9 | Situação física, figura, equações, sinais, unidades e interpretação do resultado.          |
| [Física II](https://resumos.leic.pt/fis-ii/) |      12 | Campos e equações em resumos compactos, formulários e ligações a Cálculo.                  |
| [FP](https://resumos.leic.pt/fp/)            |       2 | Entrada e exercícios resolvidos, com justificação das respostas e código.                  |
| [Gestão](https://resumos.leic.pt/ges/)       |       8 | Definições curtas, classificações e exemplos financeiros e organizacionais.                |
| [IA](https://resumos.leic.pt/ia/)            |       7 | Progressão entre estratégias, problemas concretos e explicação das limitações.             |
| [IAC](https://resumos.leic.pt/iac/)          |       7 | Diagramas de componentes, representações e execução de instruções.                         |
| [IAED](https://resumos.leic.pt/iaed/)        |      23 | Necessidade das estruturas, exemplos em C, estado da memória e diferenças entre operações. |
| [IEco](https://resumos.leic.pt/ieco/)        |       8 | Conceitos ligados ao quotidiano e cadeias de causa e efeito.                               |
| [IEI](https://resumos.leic.pt/iei/)          |       1 | Página de entrada, sem capítulos de resumos neste corpus.                                  |
| [IPM](https://resumos.leic.pt/ipm/)          |       9 | Situações de utilização, exemplos de interfaces e métodos de avaliação.                    |
| [LP](https://resumos.leic.pt/lp/)            |      17 | Notação traduzida em palavras, provas, execução de Prolog e FAQ prático.                   |
| [OC](https://resumos.leic.pt/oc/)            |       8 | Analogias, diagramas e cálculos para explicar memória e desempenho.                        |
| [PE](https://resumos.leic.pt/pe/)            |      13 | Experiências concretas, significado dos parâmetros, distribuições e guias de R.            |
| [PO](https://resumos.leic.pt/po/)            |       4 | Entrada e três guias de ferramentas, sem capítulos teóricos neste corpus.                  |
| [RC](https://resumos.leic.pt/rc/)            |       8 | Função de cada camada, protocolos, terminologia ilustrada e código de laboratório.         |
| [SD](https://resumos.leic.pt/sd/)            |       8 | Modelos de comunicação, sequências de eventos, condições e cenários de falha.              |
| [SO](https://resumos.leic.pt/so/)            |      12 | Recursos do sistema, comportamento concorrente e cálculos de memória.                      |
| [TC](https://resumos.leic.pt/tc/)            |       6 | Definições rigorosas seguidas de interpretação, exemplos e contraexemplos.                 |

## Guias como referência de explicitação

| Guia                                                                                   | Aspeto útil para escrever                                                                      |
| -------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| [Correr .cgi localmente](https://resumos.leic.pt/bd/guides/running-cgi-files-locally/) | Mostra a pasta, o comando, o resultado e a necessidade de manter o processo aberto.            |
| [Recordar do secundário](https://resumos.leic.pt/fis-i/guides/recap-highschool/)       | Parte de pré-requisitos em falta e termina os cálculos com uma resposta física.                |
| [Instalação de Linux](https://resumos.leic.pt/iaed/meta/linux-setup/)                  | Separa opções de ambiente e explica como reconhecer problemas de configuração.                 |
| [FAQ de LP](https://resumos.leic.pt/lp/projeto/faq/)                                   | Liga operações concretas às dúvidas que surgem durante um projeto.                             |
| [Instalação de R](https://resumos.leic.pt/pe/guides/r-setup/)                          | Inclui uma verificação da instalação e distingue ambientes de execução.                        |
| [Básicos de R](https://resumos.leic.pt/pe/guides/r-basics/)                            | Intercala código e resultados, e esclarece quando os dados originais foram alterados.          |
| [CVS](https://resumos.leic.pt/po/guide/cvs/)                                           | Explica substituições de valores e efeitos da diretoria onde se executa o comando.             |
| [Aplicação bancária](https://resumos.leic.pt/po/guide/bank/)                           | Explica a ordem das dependências e dá verificações intermédias concretas.                      |
| [Kerberos](https://resumos.leic.pt/po/guide/kerberos/)                                 | Conduz até ao teste de acesso e assinala a necessidade de renovar a autenticação.              |
| [Terminologia de redes](https://resumos.leic.pt/rc/guides/terminology/)                | Liga nomes técnicos a objetos reconhecíveis e distingue dispositivos confundidos no dia a dia. |

As instruções e recomendações de ferramentas destes guias são históricas. Para novos guias, confirma os comandos e requisitos atuais na documentação oficial.

## O que adaptar

As páginas de entrada incluem frequentemente objetivos curriculares formais. O tom procurado vem sobretudo dos capítulos e guias que desenvolvem uma explicação. As páginas sem conteúdo não permitem inferir uma voz própria da cadeira.

A recorrência de definições, exemplos trabalhados, reformulações e ligações a pré-requisitos fundamenta a skill. O uso consistente de "tu", a redução de apartes e a escolha de frases mais curtas são decisões editoriais para este projeto, não características uniformes do original.

O site também contém frases longas, traduções irregulares, simplificações técnicas e afirmações dependentes do ano ou do docente. Aproveita a forma de conduzir o raciocínio, verificando cada afirmação no material da cadeira. A fluidez de uma explicação não prova que esteja correta.

As [referências de containers](https://docs.leic.pt/markdown-reference/containers/) e [cores](https://docs.leic.pt/markdown-reference/text-color/) explicam como o original distingue definições, exemplos, avisos e aprofundamentos. Conserva essa função editorial usando os formatos suportados aqui. A sintaxe Gatsby, os caminhos, os comandos de build e as macros matemáticas do site de origem não são convenções deste repositório.
