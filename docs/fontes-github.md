# Fontes públicas de LEIC/MIEIC no GitHub

> Levantamento de 1 de outubro de 2026. Este ficheiro é um mapa de pesquisa, não uma autorização para copiar material. O inventário estruturado completo está em [`fontes-github.json`](fontes-github.json).

## Resultado

Foram verificados **82 registos de artefactos** e consolidados em **64 pares cadeira–repositório**, de **60 repositórios distintos**. Há ainda **7 arquivos ou índices multi-cadeira**.

O resultado não é uniforme. P, AED, BD, SO, LTW, ME, COMP, CG, IA, RC e FSI têm material forte. FSC ficou sem uma fonte pública específica convincente; ALGA ficou apenas com uma pista de proveniência mista. Em PI e CPD, o material útil é sobretudo documentação de projetos.

## Como foi feito

- Pesquisa pública e limitada por grupos de cerca de cinco cadeiras, incluindo nomes atuais e siglas históricas.
- Verificação pela metadata, README, árvore e caminhos concretos de cada candidato.
- Exclusão de resultados de outras faculdades, projetos sem valor pedagógico claro e candidatos vistos apenas em snippets.
- Sem acesso a repositórios privados, Moodle ou SIGARRA autenticado; sem contacto com autores; sem clonagem em massa.
- Forks, espelhos e índices foram tratados como relações, não como descobertas independentes.

## Antes de reutilizar

- **Sem licença = não copiar.** Pode-se ligar e consultar; a visibilidade pública não concede direitos de adaptação ou republicação.
- A licença do repositório pode não abranger slides de docentes, exames, livros, imagens, datasets ou outros ficheiros de terceiros.
- `CC BY-NC-ND` permite partilha não comercial com atribuição, mas não a publicação de versões adaptadas.
- PDFs de manuais comerciais e relatórios marcados como proprietários não devem entrar no projeto.
- Para os resumos, a via segura é usar estas fontes para descobrir tópicos e confirmar raciocínios, depois escrever de raiz e citar quando necessário.

## Arquivos e índices multi-cadeira

- [engenharia-informatica-FEUP/Recursos-L.EIC](https://github.com/engenharia-informatica-FEUP/Recursos-L.EIC): Maior arquivo/índice verificado: 696 entradas na estrutura de LEIC. É útil para descoberta, mas não tem licença detetada.
- [samyuh/knowledge-tree](https://github.com/samyuh/knowledge-tree): Grande arquivo de conhecimento multi-cadeira, com licença MIT no repositório. Os ficheiros de terceiros continuam a exigir verificação.
- [marhcouto/FEUP-L.EIC-M.EIC](https://github.com/marhcouto/FEUP-L.EIC-M.EIC): Índice de repositórios da FEUP organizado por ano e semestre.
- [Jumaruba/FEUP-MIEIC](https://github.com/Jumaruba/FEUP-MIEIC): Arquivo multi-cadeira de MIEIC com exercícios resolvidos e projetos.
- [pedromsfernandes/ResumosMIEIC](https://github.com/pedromsfernandes/ResumosMIEIC): Arquivo histórico dedicado a resumos de MIEIC.
- [Process-ing/leic](https://github.com/Process-ing/leic): Arquivo/índice multi-cadeira de LEIC; é preciso verificar os caminhos filhos antes de reutilizar.
- [SergioEstevao11/FEUP-MIEIC](https://github.com/SergioEstevao11/FEUP-MIEIC): Arquivo histórico de MIEIC organizado por cadeira.

Estes arquivos são bons para descoberta, mas não substituem a verificação de cada ficheiro. O maior, `Recursos-L.EIC`, tem 696 entradas verificadas e não tem licença detetada.

## Mapeamentos históricos

- CMAT é relevante para a atual AM II.
- AOCO é relevante para AC, mas o material de ARMv7 não corresponde diretamente à cadeira atual, orientada para RISC-V.
- TCOM é relevante para a atual TC, embora a posição no plano e a ordem dos conteúdos possam ter mudado.
- PLOG cobre apenas a parte de lógica/Prolog da atual PFL, não a parte funcional/Haskell.
- RCOM corresponde diretamente a RC.
- A pesquisa não estabeleceu IPM como nome histórico separado ou equivalente a IPC na FEUP.

## Inventário por cadeira

### ALGA

Não foi verificado um repositório específico forte de LEIC. A única pista tem proveniência mista FCUP/FEUP e inclui um manual de terceiros.

### AM I

- **[xico2001pt/feup-amat](https://github.com/xico2001pt/feup-amat/tree/main)** — lecture slides, tests, exercise sheet, derivative reference table, antiderivative reference table. **Período:** 2019/2020 **Direitos:** Sem licença detetada; apenas ligar/consultar.

### FP

- **[JoaoCarlosPires/feup-fpro](https://github.com/JoaoCarlosPires/feup-fpro/tree/master)** — solved programming exercises, Python examples. **Período:** 2019/2020 **Direitos:** Sem licença detetada; apenas ligar/consultar.
- **[rodykings/FEUP-FPRO](https://github.com/rodykings/FEUP-FPRO/tree/master)** — practical-class material, tests, programming challenges, take-home assignments, Python solutions. **Período:** 2018/2019 **Direitos:** Sem licença detetada; apenas ligar/consultar.
- **[s0fiateixeira/FEUP_FPRO](https://github.com/s0fiateixeira/FEUP_FPRO/tree/master)** — tests, take-home assignments, additional programming exercises, Python solutions. **Período:** 2018/2019 **Direitos:** Sem licença detetada; apenas ligar/consultar.

### FSC

Não foi verificado um repositório público forte de FSC para LEIC/MIEIC.

### MD

- **[xico2001pt/feup-mdis](https://github.com/xico2001pt/feup-mdis/tree/main)** — lecture slides, practical exercises, bibliography, spreadsheet guide/tool. **Período:** 2020/2021 **Direitos:** Sem licença detetada; apenas ligar/consultar.

### AM II

- **[xico2001pt/feup-cmat](https://github.com/xico2001pt/feup-cmat/tree/main/Provas%20de%20Avalia%C3%A7%C3%A3o)** — past tests, past reassessments, one explicitly named solution, exercise sheets, lecture slides, exercise-support plans. **Período:** Assessments from 2012 through 2018; repository assembled in 2021; Approximately 2019/20 **Direitos:** Sem licença detetada; apenas ligar/consultar.

### AC

- **[dmfrodrigues/feup-aoco-ex](https://github.com/dmfrodrigues/feup-aoco-ex/tree/master/part1-logic-circuits)** — solved exercises, logic-circuit files, tutorial, ARMv7 assembly exercises. **Período:** FEUP/AOCO 2018/19; published 2020 **Direitos:** GPL-3.0 parcial/misto; verificar ficheiro a ficheiro.
- **[xico2001pt/feup-aoco](https://github.com/xico2001pt/feup-aoco/tree/main/Testes%20e%20Exerc%C3%ADcios)** — past tests, solved quizzes, exercise sheets. **Período:** 2019/20 **Direitos:** Sem licença detetada; apenas ligar/consultar.

### F I

- **[dmfrodrigues/feup-fis1-form](https://github.com/dmfrodrigues/feup-fis1-form/blob/master/form.tex)** — exam formula sheet, LaTeX source, compiled release. **Período:** FEUP/FIS1 2018/19; published 2020 **Direitos:** CC BY-NC-ND 4.0; partilha sem adaptações, com atribuição e sem uso comercial.
- **[xico2001pt/feup-fisi1](https://github.com/xico2001pt/feup-fisi1/blob/main/Formul%C3%A1rio%20F%C3%ADsica%201.pdf)** — formula sheet, notes, course summaries. **Período:** 2019/20 **Direitos:** Sem licença detetada; apenas ligar/consultar.

### P

- **[dmfrodrigues/feup-prog-ex](https://github.com/dmfrodrigues/feup-prog-ex/tree/master/exams)** — solved past exams, solved exercise sheets, OOP exercises, C++ source. **Período:** FEUP/PROG 2018/19; exam inputs include 2016–2018 **Direitos:** GPL-3.0 parcial/misto; verificar ficheiro a ficheiro.
- **[FEUP-MIEIC/PROG](https://github.com/FEUP-MIEIC/PROG/tree/master/a01_Ficha1)** — exercise sheet, C and C++ exercise solutions. **Período:** 2016/17 **Direitos:** MIT no repositório; confirmar materiais de terceiros.
- **[xico2001pt/feup-prog](https://github.com/xico2001pt/feup-prog/tree/main/Exames)** — past exams, exam solutions, solved exercises, reference cards, lecture notes. **Período:** Exams from 2013/14 through 2018/19; course files also include 2019/20 **Direitos:** Sem licença detetada; apenas ligar/consultar.

### TC

- **[Ca-moes/TCOM](https://github.com/Ca-moes/TCOM/tree/master/Exames)** — past exams, solved exams, solved exercise sheets, slides, preparation activities, challenge activities, reference sheet. **Período:** Materials span 2009–2020; repository assembled in 2020 **Direitos:** Sem licença detetada; apenas ligar/consultar.
- **[dmfrodrigues/feup-tcom-ex](https://github.com/dmfrodrigues/feup-tcom-ex/tree/master/TP)** — solved exercises, solved tests, solved exams, LaTeX source, compiled study documents. **Período:** FEUP/TCOM 2019/20 **Direitos:** CC BY-NC-ND 4.0; partilha sem adaptações, com atribuição e sem uso comercial.

### AED

- **[ttoino/feup-aed](https://github.com/ttoino/feup-aed/tree/main)** — weekly worksheets, exercise statements, solutions, unit tests, buildable C++ examples. **Período:** 2021/2022 **Direitos:** GPL-3.0 para o material identificado.
- **[ttoino/feup-aed-mooshak](https://github.com/ttoino/feup-aed-mooshak/tree/main)** — extra exercises, Mooshak problem statements, solved programming problems. **Período:** 2021/2022 **Direitos:** GPL-3.0 para o material identificado.
- **[xRuiAlves/FEUP-AEDA-TPs](https://github.com/xRuiAlves/FEUP-AEDA-TPs/tree/master/Solved%20Tests%20and%20Exams)** — solved tests, solved exams, solved practical worksheets, C++ examples. **Período:** 2017/2018 **Direitos:** Sem licença detetada; apenas ligar/consultar.

### BD

- **[ctrlMarcio/feup-bdad](https://github.com/ctrlMarcio/feup-bdad/tree/main)** — solved practice-session exercises, conceptual-modelling notes, relational-model examples. **Período:** 2020/2021 **Direitos:** MIT no repositório; confirmar materiais de terceiros.
- **[DanielaTomas/FCUP-FEUP](https://github.com/DanielaTomas/FCUP-FEUP/tree/main/2%C2%BAano/1%C2%BAsemestre/Bases%20de%20Dados/Resolu%C3%A7%C3%A3o%20Exames)** — exam solutions, SQL datasets, worked database scripts. **Período:** 2021/2022 collection; scripts reference exams from 2013, 2015, 2016 and 2020 **Direitos:** Sem licença detetada; apenas ligar/consultar.
- **[dmfrodrigues/feup-bdad-ex](https://github.com/dmfrodrigues/feup-bdad-ex/tree/master)** — solved practical worksheets, solved tests, solved exams, SQL scripts, curricular-book exercises, compiled LaTeX guides. **Período:** 2019/2020, with exam solutions from 2015, 2016 and 2020 **Direitos:** CC BY-NC-ND 4.0; partilha sem adaptações, com atribuição e sem uso comercial.

### F II

- **[DanielaTomas/FCUP-FEUP](https://github.com/DanielaTomas/FCUP-FEUP/tree/main/2%C2%BAano/1%C2%BAsemestre/F%C3%ADsica%20II)** — solved chapter exercises, solved tests, exam, test. **Período:** 2021/2022 collection, with solved tests from 2015, 2016, 2019 and 2021 **Direitos:** Sem licença detetada; apenas ligar/consultar.
- **[dmfrodrigues/feup-fis2-form](https://github.com/dmfrodrigues/feup-fis2-form/blob/master/form.tex)** — cheat sheet, equations form, LaTeX source, compiled release. **Período:** 2019/2020 **Direitos:** CC BY-NC-ND 4.0; partilha sem adaptações, com atribuição e sem uso comercial.
- **[xico2001pt/feup-fisi2](https://github.com/xico2001pt/feup-fisi2/blob/main/Formul%C3%A1rio-FISI2-Exame-ME.pdf)** — exam formula sheet, lecture summaries, course notes. **Período:** 2020/2021 **Direitos:** Sem licença detetada; apenas ligar/consultar.

### LDTS

- **[Fabio-A-Sa/Y2S1-LabTesteSoftware](https://github.com/Fabio-A-Sa/Y2S1-LabTesteSoftware/tree/main/Notes)** — lecture notes, worked exercises, code examples, unit-testing examples, design-pattern guide, refactoring guide, UML notes, presentation guide. **Período:** 2021/2022 **Direitos:** Sem licença detetada; apenas ligar/consultar.
- **[RitaBaptistaOliveira/feup-ldts-2122](https://github.com/RitaBaptistaOliveira/feup-ldts-2122/tree/main/Solu%C3%A7%C3%B5es)** — solved exercises, reference implementations, unit tests, design-pattern examples. **Período:** 2021/2022 **Direitos:** Sem licença detetada; apenas ligar/consultar.

### SO

- **[andrefreitas/feup-sope-exercises](https://github.com/andrefreitas/feup-sope-exercises/tree/master)** — solved worksheets, C exercises, shell exercises. **Período:** 2015/2016 or earlier **Direitos:** Sem licença detetada; apenas ligar/consultar.
- **[literallysofia/feup-sope-exercises](https://github.com/literallysofia/feup-sope-exercises/tree/master)** — worksheets, solved exercises, C examples, shell examples, lecture slides, API guides. **Período:** 2016/2017, with some 2014 course slides **Direitos:** Sem licença detetada; apenas ligar/consultar.
- **[mariana1412/FEUP-SOPE](https://github.com/mariana1412/FEUP-SOPE/tree/master)** — practical worksheets, solved C exercises, shell and file-processing exercises. **Período:** 2019/2020 **Direitos:** Sem licença detetada; apenas ligar/consultar.
- **[pedrojfs17/FEUP-SOPE](https://github.com/pedrojfs17/FEUP-SOPE/tree/master/TP1)** — solved practical exercises, C programs, shell exercises, project guides, test scripts. **Período:** 2019/2020 **Direitos:** Sem licença detetada; apenas ligar/consultar.

### DA

- **[DanielaTomas/FCUP-FEUP](https://github.com/DanielaTomas/FCUP-FEUP/tree/main/2%C2%BAano/2%C2%BAsemestre/Desenho%20de%20Algoritmos/Exames)** — exams, exam corrections, solved practical exams, solved theoretical exams, solved practical exercises, worksheets, algorithm implementations. **Período:** 2021/2022 **Direitos:** No repository licence detected. Link and study in place; do not redistribute or adapt the PDFs without permission from the relevant rights holders.; No repository licence detected…
- **[gcosta0410/Y2S2-DA-Desenho-de-Algoritmos](https://github.com/gcosta0410/Y2S2-DA-Desenho-de-Algoritmos)** — pedagogical project documentation, documented implementations, optimization case studies, graph algorithm case study. **Período:** 2021/2022 **Direitos:** No repository licence detected. Suitable for reference and linking only unless the authors grant further permission.

### ES

- **[DanielaTomas/FCUP-FEUP](https://github.com/DanielaTomas/FCUP-FEUP/tree/main/2%C2%BAano/2%C2%BAsemestre/Engenharia%20de%20Software)** — review quiz, project pointer, mockup. **Período:** 2021/2022 **Direitos:** No repository licence detected. Do not republish the presentation or document without permission.
- **[FEUP-ESOF-2020-21/open-cx-t7g3-esof-teas](https://github.com/FEUP-ESOF-2020-21/open-cx-t7g3-esof-teas/blob/master/Development-Report.md)** — software development report, product vision, elevator pitch, requirements, use cases, user stories, domain model, logical architecture, physical architecture, prototype documentation, test documentation, change-manageme…. **Período:** 2020/2021 **Direitos:** Sem licença detetada; apenas ligar/consultar.
- **[joaoalvesss/feup-esof](https://github.com/joaoalvesss/feup-esof/blob/main/README.md)** — software development report index, product vision, elevator pitch, requirements documentation, use-case model, user stories, domain model, architecture documentation, project-management documentation. **Período:** 2022/2023 **Direitos:** Sem licença detetada; apenas ligar/consultar.

### LC

- **[Fabio-A-Sa/Y2S2-LabComputadores](https://github.com/Fabio-A-Sa/Y2S2-LabComputadores/tree/main/Labs)** — comprehensive notes, laboratory exercises, worked implementations, programming recommendations, device documentation, final project report, project documentation, documented reference implementation. **Período:** 2021/2022 through 2024/2025; 2021/2022 **Direitos:** Sem licença detetada; apenas ligar/consultar.

### LTW

- **[Fabio-A-Sa/Y2S2-LinguagensTecnologiasWeb](https://github.com/Fabio-A-Sa/Y2S2-LinguagensTecnologiasWeb/tree/main/Notes)** — lecture notes, exam summary, cheat-sheet-like review, worksheets, solved exercises, worked examples. **Período:** 2021/2022 **Direitos:** No repository licence detected. Public viewing and linking are safe; redistribution or adaptation requires permission.; No repository licence detected. Use as a linked reference u…
- **[paulinho-16/MIEIC-LTW](https://github.com/paulinho-16/MIEIC-LTW/tree/master/Exercises)** — solved exercises, worked examples, pedagogical project documentation. **Período:** 2020/2021 **Direitos:** No repository licence detected. Publicly readable but not affirmatively licensed for reuse.
- **[pedrojfs17/FEUP-LTW](https://github.com/pedrojfs17/FEUP-LTW/tree/master/Exams)** — solved exams, exam preparation. **Período:** Exams from 2016–2019; repository/course occurrence around 2020/2021 **Direitos:** No repository licence detected. Link and study; do not redistribute the solutions without permission.

### ME

- **[DanielaTomas/FCUP-FEUP](https://github.com/DanielaTomas/FCUP-FEUP/tree/main/2%C2%BAano/2%C2%BAsemestre/M%C3%A9todos%20Estat%C3%ADsticos)** — formula sheet, lecture slides. **Período:** 2021/2022 **Direitos:** No repository licence detected. Slides may be lecturer-authored; restrict use to linking and personal study.
- **[motapinto/feup-MEST](https://github.com/motapinto/feup-MEST)** — past exams, solved exams, formula sheets, lecture notes. **Período:** Primary collection circa 2017/2018; repository published 2019 **Direitos:** No repository licence detected. Much of the collection appears to be course-provided material; do not redistribute without rights-holder permission.
- **[xico2001pt/feup-mest](https://github.com/xico2001pt/feup-mest/tree/main/Exerc%C3%ADcios)** — worksheets, solved exercises, assessment worksheets, formula sheets, cheat sheets. **Período:** 2019/2020 **Direitos:** No repository licence detected. Many PDFs may be lecturer-authored; use by linking and private study, not republication.; No repository licence detected. Formula sheets and assess…

### FSI

- **[brunabrasil/FEUP-FSI](https://github.com/brunabrasil/FEUP-FSI/blob/main/Extra_CTFs.md)** — lab logbooks, CTF walkthroughs. **Período:** 2022/23 **Direitos:** Sem licença detetada; apenas ligar/consultar.
- **[sarasazevedo/FEUP_FSI](https://github.com/sarasazevedo/FEUP_FSI/tree/main/Exercises)** — solved exercises, SEED-style lab logbooks, CTF walkthroughs. **Período:** 2024/25 **Direitos:** Sem licença detetada; apenas ligar/consultar.

### IPC

- **[brunabrasil/FEUP-IPC](https://github.com/brunabrasil/FEUP-IPC/blob/main/README.md)** — pedagogical project documentation, requirements and user-research reports, prototype evaluation reports, presentations. **Período:** 2022/23 **Direitos:** Sem licença detetada; apenas ligar/consultar.
- **[shinir/feup-ipc](https://github.com/shinir/feup-ipc/blob/main/Intera%C3%A7%C3%A3o%20Pessoa%20Computador.pdf)** — course notes, pedagogical project documentation, heuristic-evaluation report, presentations, forms and supporting artifacts. **Período:** 2022/23 **Direitos:** Sem licença detetada; apenas ligar/consultar.

### LBAW

- **[CoDyPhin/FEUP-LBAW](https://github.com/CoDyPhin/FEUP-LBAW/blob/master/README.md)** — pedagogical project documentation, requirements specification, database specification, architecture specification, prototype documentation, deployment and framework guide. **Período:** 2020/21 **Direitos:** No repository license detected. Link and quote minimally with attribution; do not import or adapt substantial documentation without permission.
- **[dmfrodrigues/feup-lbaw-sessions](https://github.com/dmfrodrigues/feup-lbaw-sessions/blob/master/README.md)** — monitor/tutorial notes, guided practical sessions, worked examples, setup documentation. **Período:** 2021/22 **Direitos:** CC BY-NC-ND 4.0; partilha sem adaptações, com atribuição e sem uso comercial.

### PFL

- **[brunabrasil/FEUP-PFL](https://github.com/brunabrasil/FEUP-PFL/blob/master/README.md)** — solved worksheets, practice exercises, pedagogical project documentation, Haskell examples, Prolog project. **Período:** 2022/23 **Direitos:** Sem licença detetada; apenas ligar/consultar.
- **[ctrlMarcio/feup-plog](https://github.com/ctrlMarcio/feup-plog/blob/master/README.md)** — solved practical-session exercises, Prolog worksheets. **Período:** 2019/20 or 2020/21 **Direitos:** MIT no repositório; confirmar materiais de terceiros.
- **[joaomrcsmartins/MIEIC_PLOG_2019](https://github.com/joaomrcsmartins/MIEIC_PLOG_2019/blob/master/README.md)** — class exercises, Prolog practice material. **Período:** 2019/20 **Direitos:** MIT no repositório; confirmar materiais de terceiros.

### RC

- **[dmfrodrigues/feup-rcom-ex](https://github.com/dmfrodrigues/feup-rcom-ex/blob/master/README.md)** — past exams, solved exams, student solutions, official or reference solutions, formula sheet / cheat sheet source. **Período:** 2020/21, with exams from 2018–2021 **Direitos:** CC BY-NC-ND 4.0; partilha sem adaptações, com atribuição e sem uso comercial.

### COMP

- **[diogoabnunes/COMP](https://github.com/diogoabnunes/COMP/tree/main/Exames%20Anteriores)** — past exams, solved exams, solved exercises, worksheets, homework, answer sheets, project specification. **Período:** Compiled for 2020/2021; individual assessments date from 2014–2020; 2020/2021 **Direitos:** No detected repository license. Several documents appear to be course handouts or assessments rather than original student-authored work; link for reference and verify institution…
- **[Fabio-A-Sa/Y3S2-Compiladores](https://github.com/Fabio-A-Sa/Y3S2-Compiladores/tree/main/Notes)** — student notes, practical exercises, project guide, reference implementation, automated tests. **Período:** 2022/2023 **Direitos:** Sem licença detetada; apenas ligar/consultar.
- **[paulinho-16/MIEIC-COMP](https://github.com/paulinho-16/MIEIC-COMP/tree/master/Exercises)** — solved practical exercises, project documentation, test fixtures. **Período:** 2020/2021 **Direitos:** No detected repository license. Public access does not grant republication rights.

### CG

- **[diogoabnunes/CGRA](https://github.com/diogoabnunes/CGRA/blob/main/Material%20de%20Apoio/Resumos%20CGRA.pdf)** — resumo, cheat sheet, reference material, practical guides, worksheets. **Período:** 2019/2020 **Direitos:** No detected repository license. The quick reference and external-looking support PDFs may have third-party copyright; use as links unless their original licenses are confirmed.; N…
- **[Fabio-A-Sa/Y3S2-ComputacaoGrafica](https://github.com/Fabio-A-Sa/Y3S2-ComputacaoGrafica/tree/main/Notes)** — student notes, solved practical exercises, practical guides, project documentation. **Período:** 2022/2023 **Direitos:** No detected repository license. Link or seek permission before adapting into course notes.; No detected repository license. The bundled CGF framework and other libraries may also…

### CPD

- **[JoaoAMarinho/FEUP-CPD](https://github.com/JoaoAMarinho/FEUP-CPD/blob/master/assign1/doc/report.pdf)** — project reports, project documentation, practical instructions. **Período:** 2021/2022 **Direitos:** No detected repository license. README permits viewing for educational purposes but gives no formal reuse grant and warns against copying.
- **[Naapperas/feup-cpd](https://github.com/Naapperas/feup-cpd/blob/main/assign1/doc/report.pdf)** — project report, performance results, project documentation. **Período:** 2022/2023 **Direitos:** No detected repository license. The bundled FEUP identity asset and assignment statement may have separate institutional copyright.

### IA

- **[diogoabnunes/IART](https://github.com/diogoabnunes/IART/tree/main/Pr%C3%A1ticas)** — worksheets, solution topics, solved notebooks, cheat sheets. **Período:** 2020/2021 **Direitos:** No detected repository license. Many PDFs appear course-issued, so link for reference and verify authorization before republishing.; No repository license and the PDF may be third…
- **[Fabio-A-Sa/Y3S2-InteligenciaArtificial](https://github.com/Fabio-A-Sa/Y3S2-InteligenciaArtificial/tree/main/Notes)** — student notes, solved exercises, notebooks, project documentation, presentation slides. **Período:** 2022/2023 **Direitos:** No detected repository license. Link or seek permission before adapting.; No detected repository license. Dataset rights should be checked independently; student implementation an…

### PI

- **[Fabio-A-Sa/Y3S2-ProjetoIntegrador](https://github.com/Fabio-A-Sa/Y3S2-ProjetoIntegrador/tree/main/docs)** — project report, requirements, meeting notes, poster, deployment guide. **Período:** 2022/2023 **Direitos:** No detected repository license. Link as an exemplar; permission is needed for copying or adapting report/poster content.
- **[luanalima27/PI-FEUP](https://github.com/luanalima27/PI-FEUP/blob/main/Prozis_Newsletters_Otimiza%C3%A7%C3%A3o_e_An%C3%A1lise_de_Intera%C3%A7%C3%B5es.pdf)** — internship project report, work-plan documentation. **Período:** 2024/2025 **Direitos:** Sem licença detetada; apenas ligar/consultar.
- **[racoelhosilva/CapstoneProjectTemplate](https://github.com/racoelhosilva/CapstoneProjectTemplate/blob/main/main.tex)** — report template, writing guide, practical guide. **Período:** Initially developed in summer 2024; repository published 2025 **Direitos:** Sem licença detetada; apenas ligar/consultar.

## Pistas fracas ou apenas índices

- [DanielaTomas/FCUP-FEUP](https://github.com/DanielaTomas/FCUP-FEUP): arquivo grande e misto de FCUP/FEUP. Alguns caminhos do segundo ano têm boa correspondência curricular; no primeiro ano, a proveniência de ALGA/MD não é específica o suficiente.
- [dmfrodrigues/feup](https://github.com/dmfrodrigues/feup): índice forte de repositórios da FEUP. A licença do índice não licencia os repositórios ou ficheiros ligados.
- [bdmendes/feup](https://github.com/bdmendes/feup): índice académico da FEUP; é preciso seguir e verificar cada artefacto.

## Lacunas que ficaram

- FSC: não foi verificado um repositório público forte de FSC para LEIC/MIEIC.
- ALGA: não foi verificado um repositório específico forte; a pista retida tem proveniência mista e um manual de terceiros.
- PUP e CT I/II não foram tratadas como cadeiras convencionais de material de estudo.
- Em PI, o material é necessariamente dominado por relatórios e modelos de projeto.
- CPD tem sobretudo relatórios; IPC tem bons estudos de caso mas pouca teoria isolada; LBAW e PFL têm prática útil mas pouca cobertura de exames.

## Próxima utilização no projeto

1. Começar pelas fontes licenciadas e pelas resoluções com código ou LaTeX editável.
2. Usar exames e fichas sem licença apenas como referências externas; não os importar.
3. Comparar cada cadeira atual com o material histórico antes de o tratar como equivalente.
4. Para cada novo capítulo, registar no próprio conteúdo as fontes realmente usadas, em vez de citar este inventário inteiro.
