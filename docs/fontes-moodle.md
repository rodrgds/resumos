# Fontes dos Moodles

Referências de 2026/27 renovadas em 8 de outubro de 2026 com o cliente do moodle-dl existente. A API confirmou o ano letivo dos seis cursos. A recolha inicial de 1 de outubro dos três anos mantém-se no [inventário público](fontes-moodle.json). Ficheiros, páginas e inventários completos ficam privados em `/_data/`; tokens permanecem apenas neste computador.

## Renovação de 8 de outubro de 2026

| Curso      | Ligações verificadas | Novos | Alterados | Duplicados | Sem alteração | Indisponíveis |
| ---------- | -------------------: | ----: | --------: | ---------: | ------------: | ------------: |
| FSI        |                    7 |     3 |         0 |          0 |             4 |             0 |
| IPC        |                   11 |     4 |         0 |          1 |             6 |             0 |
| LBAW       |                    5 |     1 |         1 |          0 |             3 |             0 |
| PFL        |                   10 |     0 |         0 |          0 |            10 |             0 |
| RC         |                   21 |     4 |         0 |          1 |            16 |             0 |
| CT, Python |                  115 |     2 |         0 |          0 |           113 |             0 |

Foram feitos 170 pedidos, correspondentes a 169 ligações de ficheiros normalizadas e 155 hashes distintos. Há 14 PDFs novos e um PDF alterado. Duas ligações têm bytes já guardados, incluindo `penguin.gif` no ZIP do laboratório de RC. Os 116 PDFs ligados têm cabeçalho válido; os 47 ZIPs ligados passaram o CRC, com 98 membros lidos e sujeitos a SHA-256. Estes números contam ligações, incluindo cópias entre módulos, não fontes independentes.

Foram também renovadas 23 páginas de ensino, três delas novas. Os tamanhos declarados foram comparados quando disponíveis, e os hashes foram confirmados nos ficheiros locais. A versão anterior da introdução de LBAW foi preservada. O JSON público regista URL sem credenciais, módulo, estado, tamanho, hash e delta por ficheiro.

As 34 lições de Python mantêm os mesmos IDs; as 111 ligações de ficheiros já conhecidas foram revalidadas. A descoberta de novas ligações internas e a renovação das 47 imagens de slides ficaram por concluir, pois o percurso de lições do moodle-dl consulta tentativas e notas. Não foi usado. Ligações externas foram inventariadas, incluindo três modelos Canva novos em IPC, sem nova aquisição nesses serviços. Não foram consultados fóruns, alunos, notas ou entregas nem iniciados questionários.

Inventário da renovação: `/_data/editorial/revisao-2026-10-08/moodle-api/verified-downloads.json`. Relatório e caminhos por curso: `/_data/editorial/revisao-2026-10-08/moodle-refresh.md`. Novos originais e páginas ficam em `/_data/<curso>/moodle-2026-27/refresh-2026-10-08/`.

## Coleção de 2026/27 em 1 de outubro

| Curso                                          | PDFs soltos | ZIPs | Imagens de slides | Páginas de ensino |
| ---------------------------------------------- | ----------: | ---: | ----------------: | ----------------: |
| Introdução à análise de dados em Python        |          68 |   45 |                47 |                 0 |
| Fundamentos de Segurança Informática           |           4 |    0 |                 0 |                 3 |
| Interação Pessoa Computador                    |           7 |    0 |                 0 |                 0 |
| Laboratório de Bases de Dados e Aplicações Web |           4 |    0 |                 0 |                12 |
| Programação Funcional e em Lógica              |          10 |    1 |                 0 |                 0 |
| Redes de Computadores                          |          14 |    1 |                 0 |                 8 |

Os 236 ficheiros guardados contêm 107 PDFs com cabeçalho válido. Os 47 ZIPs têm 112 membros lidos, incluindo 12 PDFs. Há 291 objetos distintos por SHA-256, 57 localizações duplicadas e 3 objetos já presentes no inventário anterior. Os totais incluem cópias e materiais de apoio; não equivalem ao número de aulas ou fontes independentes.

As páginas locais registam o plano e as ligações visíveis, sem reproduzir fóruns, classificações ou entregas. Os ficheiros foram descarregados, os PDFs verificados pelo cabeçalho e os ZIPs pelo CRC. O inventário distingue a aquisição dos ficheiros da revisão pedagógica.

## Introdução à análise de dados em Python

[Moodle](https://moodle2627.up.pt/course/view.php?id=5341), [SIGARRA 2026/2027](https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=590452). Coleção local privada: `/_data/ct-iadp/moodle-2026-27/`.

Foram observados 34 módulos: Python 00 a 14, Jupyter PD00, seis bibliotecas de PD01 e pandas PD02 a PD13. As 111 ligações únicas para ficheiros foram guardadas e revalidadas em 8 de outubro. Dois novos PDFs, Como utilizar o Jupyter Notebook e All slides, foram também guardados. O JSON público identifica o estado por recurso e módulo; o inventário privado conserva o URL exato, nome original, SHA-256 e aliases. FAQ e calendário docente foram exportados e consultados.

- Quiz global, quiz do supermercado e exame final com condições de acesso; nenhuma tentativa iniciada.
- Os vídeos Panopto foram identificados pelas ligações das lições, sem descarregar gravações.
- Parte dos PDFs usa APIs antigas de pandas, como append e mad; os resumos indicam as alternativas atuais.

## Fundamentos de Segurança Informática

[Moodle](https://moodle2627.up.pt/course/view.php?id=4735), [SIGARRA 2026/2027](https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=586999). Coleção local privada: `/_data/fsi/moodle-2026-27/`.

- Seis PDFs de slides e o novo guião da semana 4 disponíveis em 8 de outubro; os sete PDFs foram guardados e verificados.
- Provas e soluções atuais não publicadas entre os recursos visíveis.

## Interação Pessoa Computador

[Moodle](https://moodle2627.up.pt/course/view.php?id=5159). Coleção local privada: `/_data/ipc/moodle-2026-27/`.

- Quatro aulas teóricas e três práticas disponíveis em 8 de outubro, além de apresentação, projeto, guião de entrevista e modelo de Journey Map. Os onze PDFs foram verificados.
- Provas e soluções atuais não publicadas entre os recursos visíveis.

## Laboratório de Bases de Dados e Aplicações Web

[Moodle](https://moodle2627.up.pt/course/view.php?id=4222). Coleção local privada: `/_data/lbaw/moodle-2026-27/`.

- Cinco PDFs de slides disponíveis em 8 de outubro, incluindo índices. A introdução foi substituída por bytes diferentes; ambas as versões ficam privadas. Lecture #4 e Lab #3 acrescentam duas páginas de ensino.
- Teste individual e respetivas soluções ainda não publicados.

## Programação Funcional e em Lógica

[Moodle](https://moodle2627.up.pt/course/view.php?id=4363). Coleção local privada: `/_data/pfl/moodle-2026-27/`.

- Os dez PDFs da parte funcional foram revalidados em 8 de outubro, sem mudança de hash. Materiais posteriores e parte lógica não aparecem entre os recursos visíveis.
- Provas e soluções atuais não publicadas entre os recursos visíveis.

## Redes de Computadores

[Moodle](https://moodle2627.up.pt/course/view.php?id=4941). Coleção local privada: `/_data/rc/moodle-2026-27/`.

O ficheiro `penguin.gif`, recurso 33734, já está no ZIP oficial do laboratório e foi verificado por tamanho e SHA-256. O download separado foi agora verificado de novo; os bytes continuam iguais aos do membro do ZIP.

- Os exemplos de exame são de 2020 e 2022; não são provas da avaliação de 2026/2027.
- Quatro conjuntos de slides disponíveis em 8 de outubro, incluindo Delay-Models, além de problemas em português e inglês e resolução docente dos problemas 1, 5 e 9.
- Questionários não iniciados; formulários de entrega e classificações excluídos.

## Materiais de 2024/25 guardados

| Cadeira                   | Originais Moodle | Estado                                      |
| ------------------------- | ---------------: | ------------------------------------------- |
| AC                        |               21 | Reutilizados e verificados                  |
| Física I                  |                1 | Guardado; ligações de apoio inventariadas   |
| Programação               |                0 | Página e ligação externa guardadas          |
| TC                        |               22 | Slides, fichas e resoluções guardados       |
| FP                        |                0 | Sem ficheiros de ensino acessíveis          |
| FSC                       |               27 | Slides e material de apoio guardados        |
| MD                        |               66 | Slides, fichas, soluções e provas guardados |
| Projeto FE/UP, meta-curso |               12 | Materiais e recursos de apoio guardados     |

Há 149 originais de ensino do Moodle, dos quais 22 já estavam locais. Incluindo exportações de apoio, a coleção tem 153 PDFs, 2729 páginas, dois XLSX e 137 pré-visualizações Panopto. Os 332 ficheiros adquiridos correspondem a 331 objetos distintos por tamanho e SHA-256. Pré-visualizações não equivalem a gravações completas.

ALGA, AM I, AM II e a ocorrência oficial de PUP estão indisponíveis para estudantes. O meta-curso Projeto FE/UP é uma página diferente e continua acessível. Algumas das suas ligações remetem hoje para outros anos. Os originais de certas gravações, posters e ligações externas não ficaram disponíveis para download; as páginas e alternativas legíveis ficam identificadas no inventário privado.

Inventário: `/_data/references/moodle-2024-25.json`. Materiais: `/_data/<cadeira>/moodle-2024-25/`.

## Materiais de 2025/26 guardados

| Cadeira                 | Ficheiros de ensino | PDFs | Vídeos locais | Material já existente                       |
| ----------------------- | ------------------: | ---: | ------------: | ------------------------------------------- |
| DA                      |                 102 |   46 |            44 | 101 originais reutilizados                  |
| ES                      |                  24 |   23 |             0 | ZIP da cadeira reutilizado                  |
| LC                      |                  49 |   22 |            27 | 13 originais reutilizados                   |
| LTW                     |                   0 |    0 |             0 | 105 ficheiros de André Restivo reutilizados |
| ME                      |                  45 |   43 |             0 | ZIP da cadeira reutilizado                  |
| BD                      |                  49 |   42 |             0 | 21 páginas do livro SQL guardadas à parte   |
| Comunicação e persuasão |                   0 |    0 |             0 | Sem ficheiros de ensino acessíveis          |
| Física II               |                  35 |   33 |             0 | Páginas de apoio guardadas à parte          |
| LDTS                    |                   0 |    0 |             0 | Apenas o artigo JAVA_HOME acessível         |
| SO                      |                  30 |   29 |             0 | ZIP da cadeira reutilizado                  |

Foram guardados 334 ficheiros de ensino, incluindo 238 PDFs e 71 vídeos. Todos os originais Moodle acessíveis foram obtidos e verificados. Exportações Google, páginas externas, índices e textos extraídos são registados à parte. A soma de originais não inclui os 105 ficheiros de André Restivo já existentes, que foram reutilizados sem repetir downloads.

AED não disponibiliza a ocorrência antiga na sessão. Em LDTS, Weeks 1–12, Project, Test e Misc continuam indisponíveis. Algumas soluções de LTW exigem palavra-passe; o guia externo de LC devolve erro; a ligação antiga SQL-99 está indisponível. As ligações e os materiais locais alternativos ficam preservados, sem tratar essas alternativas como cópias do material fechado.

Inventário: `/_data/references/moodle-2025-26-source-ready.json`. Materiais: `/_data/<cadeira>/moodle-2025-26/`.

## Organização

Os PDFs, vídeos, arquivos, código e dados ficam privados em `/_data/`. A deduplicação conserva os originais e associa bytes idênticos por SHA-256 e tamanho. Arquivos são verificados sem executar o seu código. Notas, entregas, fóruns, dados de estudantes e tentativas de avaliação ficam fora da recolha.

Os programas e regras de avaliação devem ser confirmados no ano da cadeira. Provas antigas ajudam a preparar tipos de problemas; não confirmam as regras de um exame futuro. Consultar também [fontes locais](fontes-locais.md), [bibliografia](fontes-bibliografia.md) e [arquivos públicos](fontes-github.md).
