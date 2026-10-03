---
title: Implementação de sistemas de ficheiros
description: Inodes, nomes, descrições abertas, alocação, espaço livre, cache e recuperação.
section: conteudo
order: 13
practices:
  - so/praticar-sistema-ficheiros
---

O nome `notas.txt` precisa de levar aos blocos que contêm os dados. Entre o nome e o dispositivo há diretórios, metadados, posições de leitura e estruturas de alocação. Separar essas estruturas explica como um ficheiro pode ter dois nomes e continuar aberto depois de um nome desaparecer, ou seja o nome e os dados têm tempos de vida diferentes.

## Nome, inode e abertura

Num sistema de ficheiros UNIX típico, uma entrada de diretório associa um nome a um identificador de **inode**. O inode guarda tipo, permissões, dono, tamanho, tempos e informação para localizar os dados. O nome pertence à entrada de diretório, não é necessariamente um campo do inode.

O descritor de um processo referencia uma **descrição de ficheiro aberto**, onde estão a posição e certos flags. Esta, por sua vez, identifica o ficheiro. O modelo tem três níveis:

```text
processo: descritor 3
        → descrição aberta: posição 120, leitura
        → inode: tamanho, permissões, localização dos dados
```

Duas aberturas independentes podem ter posições distintas. `dup` cria outro descritor para a mesma descrição aberta. Após `fork`, as referências herdadas também partilham essa posição.

Se `fd` lê dois bytes e um `dup(fd)` lê mais dois de `abcdef`, as leituras dão `ab` e `cd`. Uma segunda chamada independente a `open` começaria de novo em `ab`. A entrada de diretório não guarda uma posição por cada programa.

## Links e remoção

Um **hard link** acrescenta um nome para o mesmo inode, normalmente no mesmo sistema de ficheiros. Não cria uma cópia dos dados. Um **link simbólico** contém um caminho que será resolvido; pode apontar para um nome inexistente e pode atravessar sistemas de ficheiros.

`unlink` remove uma entrada, não obriga um descritor já aberto a deixar de funcionar. Os dados podem ser recuperados como espaço livre quando não restam referências necessárias, incluindo links e aberturas. O detalhe exato da recuperação pertence à implementação, mas o programa aberto continua a referir o ficheiro.

Links simbólicos para diretórios podem formar ciclos. Uma travessia precisa de decidir se os segue e como evita visitas sem fim. Listar um diretório e atravessar um nome também exigem permissões distintas.

Locks de ficheiros podem ser partilhados para leitores ou exclusivos para escritores. Um lock **consultivo** exige cooperação dos programas; não proíbe toda a I/O de programas que o ignoram. Distingue-o de imposição obrigatória e das permissões do ficheiro.

## Acesso, diretórios e proteção

No acesso **sequencial**, o programa lê o elemento seguinte e faz avançar a posição. No acesso **direto**, calcula uma posição e vai até ela, por exemplo com `lseek` num ficheiro que o suporte. Se registos de 80 bytes começam no byte zero, o registo de índice 7 começa no byte 560. Uma pipe não tem esse conjunto de posições para percorrer com `lseek`.

Um acesso **indexado** acrescenta uma estrutura que associa uma chave a uma localização, como uma tabela de nomes de produtos para os seus registos. Pode exigir um índice com vários níveis se não couber em RAM. Não confundas este índice por chave com os apontadores de blocos usados na alocação indexada: o primeiro ajuda a encontrar um registo lógico; os segundos encontram os blocos que guardam os bytes.

Um diretório único obriga todos os nomes a serem distintos nesse espaço. Um diretório por utilizador separa nomes, mas dificulta certas partilhas. Uma árvore permite subdiretórios e caminhos relativos a um diretório de trabalho. Acrescentar partilhas pode produzir um grafo acíclico; permitir ligações sem restrições pode produzir ciclos. Uma remoção tem de respeitar as outras referências, e uma travessia tem de detetar ou limitar ciclos.

Em UNIX, as permissões de dono, grupo e outros distinguem leitura, escrita e execução. Num diretório, ler permite listar nomes; executar permite atravessar nomes conhecidos; escrever permite alterar entradas, sujeito às outras regras. Ter permissão de escrita no conteúdo de um ficheiro não dá automaticamente permissão para apagar o seu nome. A remoção depende do diretório, e regras como o sticky bit acrescentam restrições. ACLs permitem especificar acesso para identidades além das três classes básicas.

## Estruturas persistentes e estruturas em RAM

Um volume guarda informação de controlo, como tamanho de bloco, dimensão e estado do espaço livre, num superbloco ou estrutura equivalente. Diretórios ligam nomes a metadados. Inodes ou FCBs, blocos de controlo de ficheiros, identificam conteúdo e propriedades.

Na RAM, o sistema guarda tabelas de montagem, aberturas e caches de dados e metadados. Um bloco de arranque só é necessário no percurso de arranque que o usa; não transformes o esquema de um volume antigo numa regra para todos os volumes.

A pesquisa num diretório pode usar uma lista linear, com comparação de nomes, uma tabela de dispersão ou árvores. Hash acelera muitos acessos, mas exige tratar colisões; não significa que todos os nomes tenham um índice exclusivo.

## Métodos de alocação

| Método   | Localizar bloco lógico $i$            | Vantagem                           | Limitação                                     |
| -------- | ------------------------------------- | ---------------------------------- | --------------------------------------------- |
| Contíguo | Início + $i$                          | Acesso sequencial e direto simples | Crescimento e fragmentação externa            |
| Extents  | Encontrar o intervalo que contém $i$  | Agrupa sequências contíguas        | Precisa de gerir vários intervalos            |
| Ligado   | Seguir apontadores                    | Cresce sem grande buraco contíguo  | Acesso aleatório percorre a cadeia            |
| FAT      | Seguir entradas numa tabela de blocos | Cadeia pode ficar em cache         | Tabela ocupa espaço e precisa de consistência |
| Indexado | Consultar apontadores do índice       | Acesso direto sem contiguidade     | Blocos de índice e leituras adicionais        |

Na alocação contígua com blocos de 512 bytes e início físico 20, o byte lógico 1300 está no bloco lógico $\lfloor1300/512\rfloor=2$, deslocamento 276. O bloco físico é 22. O deslocamento é sempre relativo ao bloco, não somado ao número de bloco sem multiplicação.

Uma alocação ligada pode usar parte de cada bloco para um apontador, reduzindo dados úteis. Se um apontador se perde, pode tornar inacessível o resto da cadeia. FAT desloca os apontadores para uma tabela, não transforma a cadeia em contiguidade física.

## Apontadores diretos e indiretos

Num esquema de inode, apontadores diretos vão aos dados; um indireto simples vai a um bloco de apontadores; um duplo vai a apontadores de blocos de apontadores.

Assumamos blocos de 4 KiB, apontadores de 4 bytes, 12 diretos, um indireto simples e um duplo. Cada bloco de índice contém $4096/4=1024$ apontadores. A capacidade de dados é:

$$
(12+1024+1024^2)\times4096=4299210752\text{ bytes}.
$$

Esta conta não inclui blocos de índice e assume que o tamanho do ficheiro e os endereços suportam a capacidade. O ficheiro pequeno de 10 KiB usa três blocos de dados e nenhum indireto. O espaço final não usado é $3\times4096-10240=2048$ bytes.

Para aceder ao bloco lógico 12, contando desde zero, precisas do primeiro apontador do indireto simples. Ao bloco lógico 1036, precisas do primeiro caminho pelo indireto duplo, porque $12+1024=1036$ blocos anteriores cabem nas áreas anteriores. Se o inode está em RAM e índices não estão em cache, um acesso por indireto duplo pode exigir duas leituras de índice e uma de dados. Não acrescentes leituras que o enunciado diz estarem em cache.

## Gerir espaço livre

Um **bitmap** usa um bit por bloco ou cluster. Precisa de uma convenção para dizer se 1 significa livre ou ocupado. Para um volume de 1 TiB com blocos de 4 KiB:

$$
N=2^{40}/2^{12}=2^{28}\text{ blocos},\qquad
N/8=2^{25}\text{ bytes}=32\text{ MiB}.
$$

Não confundas bits com bytes. Um bitmap permite procurar sequências livres; uma lista ligada de blocos livres é simples, mas procurar contiguidade exige mais trabalho. Agrupar apontadores num bloco reduz travessias. Guardar início e comprimento de regiões livres é eficiente quando há sequências contíguas.

Clusters maiores reduzem metadados e podem melhorar transferências, mas aumentam a unidade mínima e possível fragmentação interna. Gestão por mapas de espaço e registos de alocação é outra escolha para volumes grandes.

## Cache, desempenho e durabilidade

Guardar metadados próximos dos dados pode reduzir I/O. Reservar espaço com antecedência pode evitar fragmentação no crescimento. Antecipar leituras sequenciais reduz futuras esperas se a previsão estiver correta.

**Buffering** não é prova de persistência. `fflush` envia o buffer stdio para o sistema, não garante que o dispositivo tenha persistido os dados. `fsync` pede sincronização do ficheiro; operações de nomes, como criar ou renomear, também podem exigir sincronizar o diretório para uma garantia de durabilidade completa no sistema usado.

Um `write` que retorna uma quantidade menor deixou apenas essa parte entregue. Um erro ao fechar ou sincronizar pode revelar uma falha de escrita que não era visível antes. Um programa que promete guardar dados precisa de conferir estes retornos.

## Falhas e recuperação

Criar um ficheiro pode precisar de marcar blocos ocupados, escrever dados, atualizar o inode e acrescentar um nome. Uma falha entre esses passos pode deixar estruturas inconsistentes.

Uma verificação de consistência compara referências, metadados e mapa livre e tenta reparar discrepâncias. Pode ser cara e não recupera necessariamente os dados pretendidos pelo utilizador.

No **journaling**, um protocolo regista certas alterações num diário antes de as aplicar nas estruturas finais. Depois de uma falha, recupera transações segundo os registos confirmados. Garantir consistência dos metadados não garante que todo o conteúdo recente foi persistido. _Log-structured_ designa uma organização que escreve atualizações num log como estrutura principal; não é sinónimo exato de qualquer sistema com journal.

Copy-on-write pode escrever novos blocos e só depois mudar a referência para a nova versão, permitindo outras estratégias de recuperação e snapshots. Um snapshot no mesmo dispositivo não substitui uma cópia de segurança perante a perda desse dispositivo.
