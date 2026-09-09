---
title: Programação defensiva e overflows
description: Validação de entradas, exploração guiada de um strcpy vulnerável, race conditions e atualizações.
section: conteudo
order: 5
---

A maioria das intrusões não parte a criptografia nem adivinha senhas: entra por programas que confiam demasiado na entrada que recebem. **Programação defensiva** é escrever código que continua correto mesmo quando a entrada é hostil. Esta página mostra a regra de ouro da validação e o ataque clássico que a motiva.

## Validar entradas: permitir, não proibir

Toda a entrada vinda de fora, utilizador, ficheiro, rede ou argumento, é suspeita até prova em contrário. Há duas estratégias de validação. A **lista de negação** (_denylist_) proíbe o que parece perigoso: bloqueia `<script>`, `../`, ponto e vírgula. Falha sempre que o atacante encontra uma forma que não previste, e há sempre uma. A **lista de permissão** (_allowlist_) define o que é aceitável e rejeita o resto: nomes com letras e hífenes até 40 caracteres, números dentro de um intervalo, ficheiros dentro de uma pasta. É mais trabalho a desenhar, mas o atacante precisa de caber no molde em vez de contornar a proibição.

Valida também o tamanho antes de copiar, o tipo antes de converter e o significado antes de usar: um nome de ficheiro vindo do utilizador resolve-se para o caminho canónico antes de verificar se está dentro da pasta permitida, porque `../` e ligações simbólicas mudam o destino depois da verificação ingénua.

## O clássico: buffer overflow

Em C, um vetor é um endereço com uma convenção, e nada impede escrever para além do fim. Quando um `strcpy` copia 20 bytes para um vetor de 8, os 12 a mais sobrescrevem a memória vizinha na pilha: outras variáveis locais e, mais acima, o endereço de retorno da função. Se o atacante controla esses bytes, controla dados do programa ou para onde ele salta a seguir.

```c
void saudar(char *nome) {
  char buf[8];
  strcpy(buf, nome);          /* copia sem olhar para o tamanho */
  printf("Olá, %s!\n", buf);
}
```

Com a entrada `Ana`, cabem 4 bytes (`A`, `n`, `a`, terminador) e está tudo bem. Com uma entrada de 12 letras, os bytes a mais transbordam para a zona vizinha da pilha. Numa versão com uma variável `autenticado` declarada a seguir ao vetor, esses bytes extra podem sobrescrevê-la e virar uma verificação que devia falhar. A disposição exata depende do compilador, mas o mecanismo é sempre o mesmo: escrita sem limite atinge memória que o programador julgava intocável.

A correção tem duas camadas. Primeiro, valida: rejeita nomes fora da lista de permissão antes de copiar. Depois, limita mesmo assim, porque a validação pode ter falhas:

```c
void saudar(char *nome) {
  char buf[8];
  if (strlen(nome) > 6) {     /* lista de permissão: curto e simples */
    printf("Nome demasiado comprido.\n");
    return;
  }
  strncpy(buf, nome, sizeof(buf) - 1);
  buf[sizeof(buf) - 1] = '\0'; /* garante a terminação em qualquer caso */
  printf("Olá, %s!\n", buf);
}
```

O `strncpy` com o terminador forçado garante que, mesmo que a validação falhe um dia, a escrita nunca passa dos 8 bytes. Defesa em profundidade dentro de uma função.

## Race conditions e atualizações

Uma **race condition** (TOCTOU, _time of check to time of use_) é uma vulnerabilidade de intervalo: o programa verifica uma condição e usa o resultado depois, e o atacante muda a realidade no intervalo. O exemplo típico verifica que um ficheiro pertence ao utilizador e só depois o abre pelo nome; entre as duas operações, o atacante troca o ficheiro por uma ligação simbólica para um ficheiro do sistema. A cura é operar sobre o que se verificou, não sobre o nome: abrir primeiro e decidir com base no descritor já aberto.

Por fim, **atualizações de segurança**: software desatualizado é uma coleção de vulnerabilidades públicas com instruções de exploração anexadas. Aplicar atualizações, do sistema operativo às bibliotecas, fecha as portas que já toda a gente conhece. É a medida com melhor rácio custo-benefício da segurança, e a sua ausência invalida quase tudo o resto.

:::warning[Onde treinar isto]
Explora e corrige estes programas apenas na tua máquina virtual, com código teu. Testar entradas maliciosas em serviços alheios, mesmo "só para ver", é um ataque. Os tutoriais da cadeira dão-te alvos legítimos; a [última página](pensar-como-atacante/) mostra como registar cada tentativa no diário de bordo.
:::
