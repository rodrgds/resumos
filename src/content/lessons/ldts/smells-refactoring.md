---
title: Code smells e refactoring
description: Cheiros típicos de código doente e as refatorações que os resolvem sem mudar comportamento.
section: conteudo
order: 6
---

Um **code smell** é um sintoma de mau desenho: o código funciona, mas cheira a problema futuro. **Refactoring** é a cura: reestruturar o código sem mudar o comportamento observável. A rede de segurança são os testes da página anterior. A regra de ouro: nunca refatores sem testes verdes, e corre-os a cada passo pequeno.

## Os cheiros mais comuns

**Método longo**: um método com cinquenta linhas faz várias coisas. Resolve-se com **extrair método**, dando um nome a cada bloco.

**Classe grande**: a `Jogo` que sabe de input, física, desenho e pontuação. Resolve-se com **extrair classe**, como fizeste no SOLID.

**Código duplicado**: o mesmo bloco em três sítios. Cada correção futura tem de ser feita três vezes, e uma vai ser esquecida. Resolve-se com **extrair método** e chamar o método nos três sítios.

**Feature Envy**: um método que usa mais os dados de outra classe que os seus. O método tem inveja da outra classe e devia mudar-se para lá com **mover método**.

**Data class**: uma classe só com getters e setters, sem comportamento. O comportamento vive espalhado por quem usa a classe. Resolve-se a mover os métodos para dentro dela.

**Switch extenso**: um `switch` sobre o tipo que cresce a cada funcionalidade nova. Resolve-se com polimorfismo: cada caso vira uma classe, como os `Comando` do SOLID.

## Como refatorar em segurança

Refactoring faz-se em passos minúsculos, cada um com os testes verdes no fim:

1. Garante que há um teste a cobrir o código que vais mexer.
2. Faz uma mudança pequena: extrai um método, muda um nome, move uma linha.
3. Corre os testes. Se falharem, desfaz e tenta de outra forma.
4. Só quando está verde é que dás o passo seguinte.

:::warning[Refactoring não é reescrever]
Se mudas comportamento e estrutura ao mesmo tempo, e algo parte, não sabes qual das duas mudanças causou. Primeiro refatora com testes verdes, depois muda comportamento, depois refatora outra vez.
:::

## Exemplo: método longo com Feature Envy

Este método atualiza um monstro e cheira mal duas vezes: é longo e passa a vida nos dados da arena:

```java
void atualizar(Monstro m, Arena arena) {
    Posicao p = m.getPosicao();
    int nx = p.getX() + arena.getVentoX();
    int ny = p.getY() + arena.getGravidade();
    if (arena.dentroLimites(nx, ny) && !arena.ocupado(nx, ny)) {
        m.setPosicao(new Posicao(nx, ny));
    }
    arena.contarPasso();
    if (arena.getPassos() % 10 == 0) {
        arena.surgirItem();
    }
}
```

O método usa `arena` cinco vezes e `m` duas: tem inveja da arena. A refatoração move o cálculo para onde os dados vivem e extrai métodos com nome:

```java
void atualizar(Monstro m, Arena arena) {
    arena.moverMonstro(m);
    arena.avancarRelogio();
}
```

O `moverMonstro` fica na `Arena`, junto dos limites, da ocupação, do vento e da gravidade que ele consulta. O `avancarRelogio` esconde a contagem e o surgimento de itens. O método original passou de onze linhas para duas, cada pedaço tem um nome que diz a intenção, e os testes continuam verdes porque nada observável mudou.
