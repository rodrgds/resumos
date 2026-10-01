# Fontes do Moodle 2026/2027

Recolha autenticada de 1 de outubro de 2026 para os seis cursos atuais. O [inventário público](fontes-moodle.json) regista origens, estados, tamanhos e SHA-256 sem nomes de estudantes, respostas, notas ou submissões. O inventário completo fica em `/_data/references/moodle-2026-27.json`, ignorado pelo Git.

## Materiais guardados

| Curso                                          | PDFs soltos | ZIPs | Imagens de slides | Páginas de ensino |
| ---------------------------------------------- | ----------: | ---: | ----------------: | ----------------: |
| Introdução à análise de dados em Python        |          68 |   45 |                47 |                 0 |
| Fundamentos de Segurança Informática           |           4 |    0 |                 0 |                 3 |
| Interação Pessoa Computador                    |           7 |    0 |                 0 |                 0 |
| Laboratório de Bases de Dados e Aplicações Web |           4 |    0 |                 0 |                12 |
| Programação Funcional e em Lógica              |          10 |    1 |                 0 |                 0 |
| Redes de Computadores                          |          14 |    1 |                 0 |                 8 |

Os 236 ficheiros guardados contêm 107 PDFs com cabeçalho válido. Os 47 ZIPs têm 112 membros lidos, incluindo 12 PDFs. Há 291 objetos distintos por SHA-256, 57 localizações duplicadas e 3 objetos já presentes no inventário anterior. Os totais incluem cópias e materiais de apoio; não equivalem ao número de aulas ou fontes independentes.

As páginas locais registam o plano e as ligações visíveis, sem reproduzir fóruns, classificações ou entregas. Os ficheiros foram descarregados, os PDFs verificados pelo cabeçalho e os ZIPs pelo CRC. Esta verificação não significa que todas as páginas, soluções ou notebooks foram revistos.

## Introdução à análise de dados em Python

[Moodle](https://moodle2627.up.pt/course/view.php?id=5341), [SIGARRA 2026/2027](https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=590452). Coleção local privada: `/_data/ct-iadp/moodle-2026-27/`.

Foram observados 34 módulos: Python 00 a 14, Jupyter PD00, seis bibliotecas de PD01 e pandas PD02 a PD13. As 111 ligações únicas para ficheiros foram guardadas. O JSON público identifica o estado por recurso e módulo; o inventário privado conserva o URL exato, nome original, SHA-256 e aliases. FAQ e calendário docente foram exportados e consultados.

- Quiz global, quiz do supermercado e exame final com condições de acesso; nenhuma tentativa iniciada.
- Os vídeos Panopto foram identificados pelas ligações das lições, sem descarregar gravações.
- Parte dos PDFs usa APIs antigas de pandas, como append e mad; os resumos indicam as alternativas atuais.

## Fundamentos de Segurança Informática

[Moodle](https://moodle2627.up.pt/course/view.php?id=4735), [SIGARRA 2026/2027](https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=586999). Coleção local privada: `/_data/fsi/moodle-2026-27/`.

- Apenas quatro PDFs publicados na data da recolha; os planos descrevem matéria posterior ainda sem slides.
- Provas e soluções atuais não publicadas entre os recursos visíveis.

## Interação Pessoa Computador

[Moodle](https://moodle2627.up.pt/course/view.php?id=5159). Coleção local privada: `/_data/ipc/moodle-2026-27/`.

- Apenas as três primeiras aulas teóricas e duas aulas práticas publicadas, além de apresentação e projeto.
- Provas e soluções atuais não publicadas entre os recursos visíveis.

## Laboratório de Bases de Dados e Aplicações Web

[Moodle](https://moodle2627.up.pt/course/view.php?id=4222). Coleção local privada: `/_data/lbaw/moodle-2026-27/`.

- Quatro conjuntos de slides publicados; o plano atual inclui tópicos posteriores ainda sem slides.
- Teste individual e respetivas soluções ainda não publicados.

## Programação Funcional e em Lógica

[Moodle](https://moodle2627.up.pt/course/view.php?id=4363). Coleção local privada: `/_data/pfl/moodle-2026-27/`.

- Os dez PDFs disponíveis cobrem a parte funcional inicial; materiais posteriores e parte lógica ainda não publicados.
- Provas e soluções atuais não publicadas entre os recursos visíveis.

## Redes de Computadores

[Moodle](https://moodle2627.up.pt/course/view.php?id=4941). Coleção local privada: `/_data/rc/moodle-2026-27/`.

- Ficheiro de dados do laboratório, recurso 33734, bloqueado pelo Brave com `ERR_BLOCKED_BY_CLIENT`; proteção conservada.
- Os exemplos de exame são de 2020 e 2022; não são provas da avaliação de 2026/2027.
- Slides posteriores aos três primeiros conjuntos ainda não publicados.
- Questionários não iniciados; formulários de entrega e classificações excluídos.

## Âmbito e limites

Só foram recolhidos materiais visíveis na sessão autorizada. Questionários e exames fechados permanecem fechados, sem tentativas; recursos de semestres posteriores ainda não publicados ficam assinalados. Os vídeos docentes foram identificados, sem descarregar gravações.

A aquisição dos ficheiros é separada da revisão pedagógica. A cobertura de cada resumo deve ser sustentada pelos seus metadados editoriais e exercícios. Nenhuma coleção ou resumo garante uma nota de 20 valores. A revisão completa dos restantes cursos não fez parte desta passagem.

Os originais ficam privados. A deduplicação conserva cada ficheiro e agrupa bytes idênticos por SHA-256; membros de ZIPs são lidos sem executar código. Consultar também [fontes locais](fontes-locais.md), [bibliografia](fontes-bibliografia.md) e [arquivos públicos](fontes-github.md).
