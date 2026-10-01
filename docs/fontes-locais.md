# Fontes locais de estudo

Inventário de 1 de outubro de 2026. A versão pública contém apenas totais e referências de origem: [`fontes-locais.json`](fontes-locais.json). O inventário com caminhos individuais e aliases fica em `/_data/references/inventory.json`, ignorado pelo Git.

## Conteúdo

| Coleção                                          | Quantidade |
| ------------------------------------------------ | ---------: |
| Ficheiros locais                                 |      4 325 |
| PDFs locais com cabeçalho válido                 |        689 |
| Contentores ZIP/tar, incluindo Office, ODF e JAR |        128 |
| Membros de contentores com SHA-256               |     26 494 |
| PDFs dentro de contentores                       |      1 910 |
| Objetos distintos por SHA-256                    |     22 659 |
| Localizações de conteúdo repetido                |      8 160 |

Os totais incluem os materiais FEUP já existentes em `/data/leic-archive-records/` e `/_data/<cadeira>/`, 93 ficheiros de livros e suplementos e 74 arquivos do GitHub. Os PDFs dentro de arquivos são membros adicionais, não PDFs soltos. O cabeçalho válido não prova que todas as páginas ou soluções foram revistas.

## Organização e deduplicação

- `/_data/<cadeira>/`: materiais que já existiam, nos caminhos atuais.
- `/_data/books/`: livros, capítulos e suplementos dos autores.
- `/_data/github/`: arquivos fixados ao commit completo.
- `/_data/references/inventory.json`: tamanhos, SHA-256, membros e objetos canónicos com aliases.
- `/_data/references/downloads-books.json` e `downloads-github.json`: resultados de cada aquisição.

Um alias associa locais com os mesmos bytes e SHA-256. A deduplicação é lógica: conserva todos os originais, escolhe um local canónico e evita tratar cópias como fontes independentes. Os arquivos foram lidos sem extrair nem executar código; arquivos dentro de arquivos ficam intactos.

Os antigos manifests de `leic-archive-records` usam caminhos como `leic-year1/` que já não correspondem à organização atual. São evidência histórica; o inventário atual usa `/_data/<cadeira>/`.

## Materiais já existentes por cadeira

| Cadeira | Ficheiros | PDFs soltos | Contentores | PDFs nos contentores |
| ------- | --------: | ----------: | ----------: | -------------------: |
| ALGA    |        53 |          52 |           0 |                    0 |
| AM I    |        76 |          75 |           0 |                    0 |
| FP      |       165 |          12 |           2 |                    0 |
| FSC     |         3 |           3 |           0 |                    0 |
| MD      |        44 |          39 |           1 |                    0 |
| AM II   |       102 |         100 |           0 |                    0 |
| AC      |        15 |          12 |           0 |                    0 |
| F I     |        19 |          18 |           0 |                    0 |
| P       |       478 |           1 |           0 |                    0 |
| TC      |        90 |          88 |           0 |                    0 |
| AED     |        86 |           1 |           0 |                    0 |
| BD      |       256 |           8 |           2 |                    0 |
| F II    |        25 |          23 |           0 |                    0 |
| LDTS    |       833 |           1 |           2 |                    0 |
| SO      |       227 |           6 |           0 |                    0 |
| DA      |       286 |           4 |           0 |                    0 |
| ES      |        75 |           1 |           0 |                    0 |
| LC      |       138 |           1 |           1 |                    0 |
| LTW     |       806 |           3 |          27 |                    0 |
| ME      |       146 |          96 |           2 |                    0 |
| FSI     |         3 |           1 |           1 |                    0 |
| IPC     |         3 |           1 |           1 |                    6 |
| LBAW    |        51 |           1 |           1 |                    6 |
| PFL     |        52 |          33 |           2 |                    4 |
| RC      |         3 |           0 |           2 |                    3 |
| COMP    |         2 |           0 |           1 |                    0 |
| CG      |         3 |           1 |           1 |                    0 |
| CPD     |        24 |          11 |           0 |                    0 |
| IA      |         2 |           0 |           1 |                    4 |
| PI      |         1 |           0 |           1 |                    2 |

Este retrato exclui a recolha do Moodle 2026/2027, que estava em curso, o material do Técnico e caches de compilação. As fontes novas de livros e GitHub estão nos seus próprios grupos e não inflacionam os totais antigos de cada cadeira.

## Limites da coleção

As 75 obras da lista fornecida estão identificadas na bibliografia, mas 97 das 109 entradas adotadas ainda não têm uma cópia local identificada. Algumas obras repetem-se entre cadeiras. Há quatro entradas adotadas com PDF completo local, duas com capítulos OSTEP, quatro com suplementos, uma com download bloqueado e uma cujo livro exige um pedido aos autores. As alternativas abertas são contadas à parte.

Os downloads de Building Skills in Python e University Physics, Volume 1, falharam com HTTP 403. As outras obras sem ficheiro local mantêm o seu estado explícito em [`fontes-bibliografia.json`](fontes-bibliografia.json). Um arquivo descarregado não prova que um exame tem solução, que a solução está certa ou que o material corresponde ao programa atual.

Os ficheiros brutos permanecem privados. A publicação de resumos deve usar explicações e exercícios próprios, com atribuição e verificação das fontes.
