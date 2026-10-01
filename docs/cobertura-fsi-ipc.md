# Cobertura de FSI e IPC

Revisão de 1 de outubro de 2026. Esta matriz relaciona o conteúdo original do site com as fontes consultadas. Não é uma lista de matéria confirmada para cada teste nem uma garantia de classificação.

## Fontes e limites

- [FSI, ficha SIGARRA 2026/27](https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=586999) e [Moodle atual](https://moodle2627.up.pt/course/view.php?id=4735).
- [IPC, ficha SIGARRA 2026/27](https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=587000) e [Moodle atual](https://moodle2627.up.pt/course/view.php?id=5159).
- Arquivo local anterior em `_data/fsi/sofiavip/`, `_data/fsi/repos/`, `_data/ipc/sofiavip/` e `_data/ipc/repos/`. Apontamentos de estudantes serviram para identificar conceitos e dúvidas, sem lhes atribuir autoridade sobre a edição atual.
- Fontes técnicas primárias ligadas no frontmatter, incluindo MIT/Saltzer e Schroeder, RFCs, NIST, CWE, Linux man-pages, W3C, material dos autores de _Human-Computer Interaction_, Brooke e Nielsen Norman Group.

Os PDFs Moodle e o arquivo ficam locais e ignorados. As páginas contêm explicações e exemplos próprios, não transcrições de slides, provas ou dados de participantes. `editorial.basedOn` identifica a edição do programa; não foi preenchido `editorial.review`, porque falta comparação com todas as aulas e avaliações da edição.

## Materiais atuais efetivamente consultados

FSI, em `_data/fsi/moodle-2026-27/`:

- `fsi-FSI_Aula1_Presentation.pdf`, 17 páginas, capa **2025/26**, atualmente servido no curso 2026/27.
- `FSI_Aula1_BasicConcepts.pdf`, 58 páginas, 2026/27.
- `FSI_Aula2_SecurityModel.pdf`, 45 páginas, 2026/27.
- `FSI_Aula2_SoftwareSecurity1.pdf`, 33 páginas, 2026/27.

IPC, em `_data/ipc/moodle-2026-27/`:

- `HCI - L.EIC-about.pdf`, 20 páginas.
- `ipc-31727-HCI - L.EIC-lesson 1.pdf`, 37 páginas.
- `ipc-31728-HCI - L.EIC-lesson 2 .pdf`, 62 páginas.
- `ipc-91726-HCI - L.EIC-lesson 3.pdf`, 58 páginas.
- `ipc-31739-HCI- L.EIC-TP-lesson 1 (1).pdf`, 27 páginas.
- `ipc-91723-HCI- L.EIC-TP-lesson 2.pdf`, 21 páginas.
- `ipc-31748-Project-2026-2027 (1).pdf`, 8 páginas.

Estes materiais IPC cobrem apresentação, fundamentos, enquadramento do problema, investigação, PACT, personas e cenários. Não sustentam a afirmação de que já foram consultados slides atuais de avaliação, análise de dados ou acessibilidade.

## FSI

| Página                  | Aplicações e treino                                                                              | Evidência atual e limite                                                                                   |
| ----------------------- | ------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------- |
| Princípios de segurança | CIA, autenticidade, privacidade, ameaças, risco qualitativo e perda esperada                     | Conceitos/modelo atuais; valores das contas e matriz numérica são exemplos próprios                        |
| Sistemas seguros        | Princípios, TCB, monitor de referência, representante confuso, falha segura                      | Programa público e fonte MIT; slides posteriores ainda não disponíveis                                     |
| Criptografia            | Propriedades de primitivas, duas identidades RSA, gestão de chaves, cadeia e nome do certificado | Programa, RFCs e arquivo anterior; RSA pequeno é aritmética insegura de demonstração                       |
| Modos e protocolos      | ECB/CBC/CTR, XOR reutilizado, AEAD, repetição, DH e sigilo futuro                                | Aprofundamento com NIST/RFCs e arquivo; profundidade exigida no teste atual por confirmar                  |
| Controlo de acessos     | ACL/capacidades, DAC/MAC/RBAC, Bell-LaPadula/Biba, Unix, diretórios e revogação                  | Programa e documentação Linux; confirmar variantes/notação dos modelos nos slides atuais                   |
| Programação defensiva   | Limites e terminador, memória x86, endianness, cópia segura, TOCTOU, NX/ASLR/canário             | Software Security 1 atual sustenta pilha e overflows; restantes tópicos também no programa/fontes técnicas |
| Redes                   | Escuta/falsificação, TLS, SSH/IPsec, firewall, IDS, SYN flood, amplificação e taxa base          | Programa/RFCs e arquivo; exemplos quantitativos originais, não problemas de prova                          |
| Web                     | Origem/site, sessões, KDF/sal, XSS, SQL parametrizado, CSRF e IDOR                               | Programa/OWASP/MDN; slides e tutoriais atuais posteriores não consultados                                  |
| Modelar ameaças         | Política/mecanismo/confiança, CWE/CVE, STRIDE, árvore AND/OR e validação                         | Modelo de segurança atual e OWASP; árvore e sistema de faturas são originais                               |

Cada página de conteúdo liga um conjunto de exercícios com pistas, soluções e erros frequentes. A cheat sheet conserva regras e condições e aponta para as explicações.

### Avaliação FSI por conciliar

A ficha 2026/27 exige 8/20 em cada teste e atribui 60% à teoria e 40% ao trabalho laboratorial. A apresentação Moodle com capa 2025/26 indica 6/20 por teste e mínimo laboratorial de 10/20. O índice atribui expressamente a regra à ficha atual e assinala a divergência. Não foi inventada uma decisão docente sobre qual indicação prevalece. Falta o aviso atual que a resolva.

Não foram obtidas provas, critérios de correção, divisão exata da matéria entre T1/T2 ou todos os tutoriais atuais. Uma preparação completa para o formato concreto da prova precisa dessa comparação.

## IPC

| Página                           | Aplicações e treino                                                                                         | Evidência atual e limite                                                                                    |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Fundamentos                      | UI/UX/usabilidade, PACT, modelos mental/conceptual, golfos e erros                                          | Aula 1 atual e bibliografia; ciclo de ação aprofundado com fontes de IHC                                    |
| Perceção e cognição              | Gestalt, atenção, reconhecimento, limites da memória, Fitts/Hick/KLM                                        | Programa e bibliografia; os modelos são aprofundamento, sem confirmação de exigência nos mini-testes atuais |
| Princípios de usabilidade        | Affordance/significante/mapping, heurísticas, padrões e diagnóstico justificado                             | Programa/Nielsen e arquivo; ainda sem slides atuais deste tema                                              |
| Design centrado no utilizador    | Situação atual, PACT, requisitos verificáveis, personas, cenários as-is/to-be, tarefas e modelo conceptual  | Aulas 2/3 e TP1/2 atuais; exemplos e critérios numéricos próprios                                           |
| Prototipagem                     | Eixos de fidelidade/cobertura, papel, storyboard, Wizard of Oz e estados executáveis                        | Programa/arquivo/bibliografia; protótipo não usa serviços nem dados reais                                   |
| Avaliação                        | Formativa/sumativa, heurística, quatro perguntas do walkthrough, teste, ajuda e métricas                    | Programa/NNGroup/arquivo; resultados fictícios, não estudos feitos com participantes                        |
| Estudos e análise                | Métodos independentes por eixo, ética, desenho entre/intra, confundimentos, códigos/temas, SUS e inferência | Investigação atual; análise/SUS aprofundados com fontes primárias e arquivo                                 |
| Acessibilidade e multimodalidade | POUR, contraste calculado, semântica/foco/teclado, WCAG 2.2 e combinação/conflito de canais                 | Programa/W3C/arquivo; não atribuir conformidade completa a uma verificação automática                       |
| Ajuda e documentação             | Tutorial/referência, navegação/pesquisa, vocabulário e apoio contextual                                     | Arquivo e bibliografia; âmbito preciso no mini-teste atual por confirmar                                    |

### Avaliação IPC por conciliar

A ficha 2026/27 define dois mini-testes de 10% cada, projeto de 80%, mínimo de 8/20 em cada mini-teste e 10/20 no projeto. A apresentação atual também descreve microtarefas teóricas de 10% como alternativa ao segundo teste, com uma condição de nota descrita de forma breve, e depois repete a fórmula dos dois testes. O índice menciona a alternativa sem afirmar condições de dispensa não conciliadas.

Não foram obtidos mini-testes anteriores, critérios de correção ou slides atuais posteriores à aula 3. As datas indicadas na apresentação não foram convertidas numa agenda automática, porque a numeração das semanas e alguns intervalos não são consistentes entre si. Projetos e microtarefas exigem trabalho próprio e avisos atuais; não ficam satisfeitos por esta preparação teórica.

## Verificação

As contas de RSA, DH, XOR, amplificação, precisão do IDS, Fitts/Hick, SUS e contraste foram refeitas. Os exemplos Python usam bibliotecas padrão; a cópia C corrigida foi compilada com avisos tratados como erros. Os exercícios numéricos foram conferidos a partir dos dados dos enunciados. O build valida MDX, Typst, DOT, publicação e ligação dos conjuntos de exercícios. A inspeção em Brave, a 1440 e 390 px e nos dois temas, não encontrou transbordo da página. O protótipo HTML foi percorrido por teclado: B102, voltar à escolha, B101 e confirmar. Os estados e o retorno do foco foram verificados no navegador.

Os vídeos são apoios específicos: Computerphile para DH, IxDF para personas, PlaybookUX para investigação contextual e NNGroup para think aloud. O material Moodle aponta para os dois vídeos intermédios; a página primária NNGroup confirma o vídeo de verbalização. Não foram usados vídeos como prova de regras de avaliação.
