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

| Página                  | Aplicações e treino                                                                                            | Evidência atual e limite                                                                                   |
| ----------------------- | -------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Princípios de segurança | CIA, autenticidade, privacidade, ameaças, risco qualitativo e perda esperada                                   | Conceitos/modelo atuais; valores das contas e matriz numérica são exemplos próprios                        |
| Sistemas seguros        | Princípios, TCB, mediação, representante confuso; memória/kernel, Android, container/VM/seccomp e arranque/TPM | Programa público e fonte MIT; slides posteriores ainda não disponíveis                                     |
| Criptografia            | Primitivas, duas identidades RSA, gestão e contagem de chaves, KDC, cadeia, nome e CRL                         | Programa, RFCs e arquivo anterior; RSA pequeno é aritmética insegura de demonstração                       |
| Modos e protocolos      | ECB/CBC/CTR, XOR reutilizado, AEAD, repetição, DH e sigilo futuro                                              | Aprofundamento com NIST/RFCs e arquivo; profundidade exigida no teste atual por confirmar                  |
| Controlo de acessos     | ACL/capacidades, DAC/MAC/RBAC, Bell-LaPadula/Biba, Unix, diretórios e revogação                                | Programa e documentação Linux; confirmar variantes/notação dos modelos nos slides atuais                   |
| Programação defensiva   | Formato de printf, pilha x86, cópia segura, ROP simbólico, canários, taint estática/dinâmica, TOCTOU           | Software Security 1 atual sustenta pilha e overflows; restantes tópicos também no programa/fontes técnicas |
| Redes                   | Escuta/falsificação, TLS, firewall/IDS, DoS e taxa base; malware, worm/botnet e limites de deteção             | Programa/RFCs e arquivo; exemplos quantitativos originais, não problemas de prova                          |
| Web                     | Origem/site, sessões, autenticação/frescura, biometria, XSS, CSP/SRI, SQL, CSRF e IDOR                         | Programa/OWASP/MDN; slides e tutoriais atuais posteriores não consultados                                  |
| Modelar ameaças         | Política/mecanismo/confiança, CWE/CVE, STRIDE, árvore AND/OR e validação                                       | Modelo de segurança atual e OWASP; árvore e sistema de faturas são originais                               |

Cada página de conteúdo liga um conjunto de exercícios com pistas, soluções e erros frequentes. A cheat sheet conserva regras e condições e aponta para as explicações.

### Programa atual e provas históricas

A captura privada `_data/fsi/moodle-2026-27/pages/sigarra-586999.json` regista a ficha consultada em 1 de outubro de 2026. Os sete tópicos atuais foram relacionados com estas páginas:

| Tópico oficial                                       | Página e aprofundamento                                                                           |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| 1. Princípios da segurança informática               | Princípios de segurança e modelação de ameaças                                                    |
| 2. Construção de sistemas seguros                    | Sistemas seguros: privilégio, isolamento, mediação e fronteiras                                   |
| 3. Criptografia, assinaturas, gestão de chaves e PKI | Criptografia e modos/protocolos; KDC e CRL                                                        |
| 4. Controlo de acessos, fluxos e mecanismos do SO    | Controlo de acessos; ligações às secções de memória/kernel, Android e seccomp em sistemas seguros |
| 5. Programação defensiva                             | Programação defensiva: formatos, memória, ROP, canários, taint e corridas                         |
| 6. Segurança de redes, DoS/DDoS                      | Redes: ataques, canais, filtros/deteção, malware e contas                                         |
| 7. Segurança Web                                     | Web: sessões, autenticação, frescura/biometria, CSP/SRI e vulnerabilidades                        |

A auditoria de provas consultou o arquivo local `_data/github/DanielaTomas--FCUP-FEUP/d8ee42a328e967ba81c4e47ca487812a827f9e51.tar.gz`, snapshot com esse identificador. Dentro da pasta `3ºano/1ºsemestre/Fundamentos de Segurança Informática/`:

- `teste1.pdf`: sete páginas, teste de FSI de **11 de novembro de 2022**. As páginas foram inspecionadas visualmente.
- `teste2.pdf`: seis páginas; foram inspecionadas visualmente as páginas 2 a 6. A data não foi confirmada. A primeira página não foi tratada como revista.

A numeração abaixo é a página física do PDF, a contar de um. Não foram usadas anotações manuscritas como gabarito, nem publicados dados pessoais ou cópias das provas. As soluções do site são próprias e foram verificadas pelas definições e hipóteses dos respetivos exemplos.

| Evidência histórica            | Competência em falta identificada                            | Resposta no conteúdo e prática original                                                          |
| ------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| T1, p. 2, Q2.1                 | Seguir retornos e posição dos argumentos                     | Modelo simbólico x86, diagrama e `retornos-argumento-ultimo`                                     |
| T1, p. 2, Q2.2                 | Distinguir inteiro, ponteiro de string e escrita por formato | Tabela printf, exemplo C válido e `format-contagem-literal`                                      |
| T1, p. 2, Q2.3                 | Comparar canários com hipóteses explícitas                   | Terminador/aleatório/XOR; `canario-copia-binaria` não assume superioridade universal             |
| T1, p. 4, Q2.9                 | Propagação taint e limites estático/dinâmico                 | Caso source/sink e `taint-caminho-nao-testado`                                                   |
| T1, p. 4, Q3.2–3.3; p. 5, Q3.5 | Android, kernel e espaços virtuais                           | UID/SELinux/seccomp, mapeamentos e KPTI; `android-uid-native` e `memoria-endereco-igual`         |
| T1, p. 5, Q3.6                 | Arranque, medições e TPM                                     | Distinção Secure/Measured Boot, atestação e `tpm-medir-e-decidir`                                |
| T1, p. 6, Q3.9–3.10            | Fronteiras de container/VM e filtro seccomp                  | Diagrama e `seccomp-nao-sandbox-completa`; limites de sandbox na deteção                         |
| T1, p. 7, Q4.4                 | Interpretar política CSP e integridade de recursos           | Política com tabela de decisões, hash SRI calculável e `csp-sri-condicoes`                       |
| T2, p. 2, Q1.3                 | Contar chaves por par e com KDC                              | Hipóteses da conta, caso de seis entidades e `kdc-pares-oito`                                    |
| T2, p. 3, Q2.2                 | Interpretar uma CRL                                          | Emissor, assinatura, atualidade e âmbito; `crl-revogacao-outubro`                                |
| T2, p. 4, Q3.1 e Q3.3          | Frescura de entidade e taxas biométricas                     | Desafio/contexto, FAR/FRR com denominadores; `auth-nonce-repetido` e `biometria-far-denominador` |
| T2, p. 5, Q5.1–5.2             | Separar worm/botnet e avaliar evasão de deteção              | Categorias por dimensão; `worm-botnet-dimensoes` e `sandbox-inatividade`                         |

Estas provas confirmam tipos de raciocínio usados numa edição anterior da mesma UC. Não confirmam que cada mecanismo, arquitetura ou formato de pergunta será exigido em 2026/27. As fontes Linux, Android, LLVM, CodeQL, RFCs, NIST, W3C e artigos dos autores verificam as explicações técnicas. Não foi reutilizado o texto das perguntas. O PDF `Exames/2020.pdf` de outro arquivo identifica a antiga UC MIEIC Segurança de Sistemas Informáticos; não foi usado para declarar exigências de FSI atual.

### Avaliação FSI por conciliar

A ficha 2026/27 exige 8/20 em cada teste e atribui 60% à teoria e 40% ao trabalho laboratorial. A apresentação Moodle com capa 2025/26 indica 6/20 por teste e mínimo laboratorial de 10/20. O índice atribui expressamente a regra à ficha atual e assinala a divergência. Não foi inventada uma decisão docente sobre qual indicação prevalece. Falta o aviso atual que a resolva.

Não foram obtidas provas de 2026/27, os seus critérios de correção, a divisão exata da matéria entre T1/T2 ou todos os tutoriais atuais. Uma preparação completa para o formato concreto da prova precisa dessa comparação.

## IPC

| Página                           | Aplicações e treino                                                                                        | Evidência atual e limite                                                                                    |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Fundamentos                      | UI/UX/usabilidade, PACT, modelos mental/conceptual, golfos e erros                                         | Aula 1 atual e bibliografia; ciclo de ação aprofundado com fontes de IHC                                    |
| Perceção e cognição              | Gestalt, atenção, reconhecimento, limites da memória, Fitts/Hick/KLM                                       | Programa e bibliografia; os modelos são aprofundamento, sem confirmação de exigência nos mini-testes atuais |
| Princípios de usabilidade        | Affordance/significante/mapping, heurísticas, padrões e diagnóstico justificado                            | Programa/Nielsen e arquivo; ainda sem slides atuais deste tema                                              |
| Design centrado no utilizador    | Situação atual, PACT, requisitos verificáveis, personas, cenários as-is/to-be, tarefas e modelo conceptual | Aulas 2/3 e TP1/2 atuais; exemplos e critérios numéricos próprios                                           |
| Prototipagem                     | Eixos de fidelidade/cobertura, papel, storyboard, Wizard of Oz e estados executáveis                       | Programa/arquivo/bibliografia; protótipo não usa serviços nem dados reais                                   |
| Avaliação                        | Formativa/sumativa, heurística, quatro perguntas do walkthrough, teste, ajuda e métricas                   | Programa/NNGroup/arquivo; resultados fictícios, não estudos feitos com participantes                        |
| Estudos e análise                | Métodos por eixo, ética, desenho entre/intra, confundimentos, temas, SUS, valor-p, teste emparelhado e IC  | Investigação atual; análise/SUS aprofundados com fontes primárias e arquivo                                 |
| Acessibilidade e multimodalidade | POUR, contraste calculado, semântica/foco/teclado, WCAG 2.2 e combinação/conflito de canais                | Programa/W3C/arquivo; não atribuir conformidade completa a uma verificação automática                       |
| Ajuda e documentação             | Tutorial/referência, navegação/pesquisa, vocabulário e apoio contextual                                    | Arquivo e bibliografia; âmbito preciso no mini-teste atual por confirmar                                    |

### Evidência de análise e ausência de prova IPC

Não foi encontrado um enunciado real de mini-teste IPC no material auditado. `_data/ipc/repos/Y3S1-InterPessoaComputador-main.tar.gz` contém `Notes/Teste.md`, identificado como preparação, não como prova. O arquivo `_data/github/shinir--feup-ipc/555bd74377d6fd83d8c3e7dd264565a5504daa2c.tar.gz` contém `InteraçãoPessoaComputador.pdf`, 21 páginas de apontamentos. Não se lhes atribuiu autoridade de gabarito.

A secção de análise no material de preparação motivou treino original de interpretação já enquadrado pelo programa e teoria: `valor-p-interpretacao`, `ic-diferenca-tempos` e `teste-emparelhado-escolha`. A explicação usa NIST para hipóteses, comparação emparelhada e intervalo da diferença média. O exemplo de quatro pessoas é fictício, com valor crítico fornecido; não é um estudo efetuado, nem uma indicação do teste que os docentes pedirão. Slides atuais deste tema e critérios dos mini-testes continuam em falta.

### Avaliação IPC por conciliar

A ficha 2026/27 define dois mini-testes de 10% cada, projeto de 80%, mínimo de 8/20 em cada mini-teste e 10/20 no projeto. A apresentação atual também descreve microtarefas teóricas de 10% como alternativa ao segundo teste, com uma condição de nota descrita de forma breve, e depois repete a fórmula dos dois testes. O índice menciona a alternativa sem afirmar condições de dispensa não conciliadas.

Não foram obtidos mini-testes anteriores, critérios de correção ou slides atuais posteriores à aula 3. As datas indicadas na apresentação não foram convertidas numa agenda automática, porque a numeração das semanas e alguns intervalos não são consistentes entre si. Projetos e microtarefas exigem trabalho próprio e avisos atuais; não ficam satisfeitos por esta preparação teórica.

## Verificação

As contas de RSA, DH, XOR, amplificação, precisão do IDS, Fitts/Hick, SUS e contraste foram refeitas. Os exemplos Python usam bibliotecas padrão; a cópia C corrigida foi compilada com avisos tratados como erros. Os exercícios numéricos foram conferidos a partir dos dados dos enunciados. O build valida MDX, Typst, DOT, publicação e ligação dos conjuntos de exercícios. A inspeção em Brave, a 1440 e 390 px e nos dois temas, não encontrou transbordo da página. O protótipo HTML foi percorrido por teclado: B102, voltar à escolha, B101 e confirmar. Os estados e o retorno do foco foram verificados no navegador.

Os vídeos são apoios específicos: Computerphile para DH, IxDF para personas, PlaybookUX para investigação contextual e NNGroup para think aloud. O material Moodle aponta para os dois vídeos intermédios; a página primária NNGroup confirma o vídeo de verbalização. Não foram usados vídeos como prova de regras de avaliação.

### Verificação do aprofundamento por provas históricas

Esta passagem acrescenta 15 exercícios originais de FSI, ficando **39 em nove conjuntos**, e três de IPC, ficando **25 em nove conjuntos**. Foram acrescentados dois diagramas DOT e três blocos executáveis; oito blocos nas páginas alteradas foram executados nativamente, dois em C e seis em Python. C foi compilado com `-std=c17 -Wall -Wextra -Werror`. As respostas numéricas novas foram recalculadas a partir dos enunciados, incluindo contagem de printf, pares de chaves e denominadores FAR/FRR. O caso emparelhado dá $t=6{,}97137$ e IC aproximado [2,44603; 6,55397] s.

`devenv shell -- npm run check` terminou com 149 ficheiros e zero erros, avisos ou hints. O build final terminou com 336 páginas. Foram confirmadas 41 ligações distintas para secções de cadeiras nas oito páginas verificadas e ausência de erros KaTeX nesses documentos.

A revisão em Brave usou a largura normal de 1285 px e 390 px. O diagrama de isolamento foi estreitado e as estruturas empilhadas depois de se observar texto demasiado pequeno no móvel. Não houve transbordo da página nos estados de conteúdo inspecionados. O perfil Brave tem Dark Reader ativo: ao alternar Claro/Sistema, a extensão altera cores e pode deixar rótulos SVG escuros sobre fundo escuro. Esta revisão não certifica os temas sem essa interferência; a revisão integrada deve fazê-lo num navegador sem a extensão. A preferência Sistema e as dimensões originais foram repostas, e o separador e preview temporários fechados.

As provas ficam privadas em `_data/references/authoring-exam-fsi-ipc-2026-10-01/`: contas e saídas nativas, contagens, verificação de ligações/matemática, logs e screenshots. Nenhuma prova privada foi incluída no site ou no commit.
