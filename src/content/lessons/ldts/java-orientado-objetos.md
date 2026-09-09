---
title: Java orientado a objetos
description: Tipos, coleções, classes e objetos, herança e composição em vez de herança profunda.
section: conteudo
order: 2
---

Java é a linguagem do projeto de LDTS. Se vens de [classes e objetos](/cadeiras/p/classes-objetos/) em C++, quase tudo te soa familiar: classes, construtores, encapsulamento e herança funcionam da mesma forma. As diferenças que interessam são a máquina virtual com recolha de lixo (adeus `delete`), uma só herança de classes com muitas interfaces, e uma biblioteca de coleções que vais usar todos os dias.

## Tipos e coleções

Java distingue tipos primitivos (`int`, `double`, `boolean`, `char`) de tipos referência (objetos). Texto é `String`, e listas, conjuntos e mapas vêm de `java.util`:

```java
import java.util.ArrayList;
import java.util.List;

List<String> nomes = new ArrayList<>();
nomes.add("Heroi");
nomes.add("Monstro");
System.out.println(nomes.size());
```

Isto escreve `2`. Programa contra a interface (`List`) e instancia a implementação (`ArrayList`): se um dia precisares de outra implementação, só muda uma linha. Os genéricos entre `< >` dizem que tipo vive dentro da coleção, e o compilador impede misturas.

## Classes e objetos

A sintaxe é próxima da de C++, sem ficheiros de cabeçalho e sem destrutores:

```java
public class Posicao {
    private final int x;
    private final int y;

    public Posicao(int x, int y) {
        this.x = x;
        this.y = y;
    }

    public int getX() { return x; }
    public int getY() { return y; }

    public Posicao somar(int dx, int dy) {
        return new Posicao(x + dx, y + dy);
    }
}
```

Repara nas escolhas: atributos privados e `final` (ninguém muda uma posição por fora), acesso por getters, e `somar` que devolve uma posição nova em vez de alterar a atual. Objetos imutáveis como este são muito mais fáceis de testar, como vais ver em [testes unitários](testes-unitarios/).

## Herança e composição

Java permite estender uma classe com `extends` e implementar várias interfaces com `implements`. A tentação é modelar o jogo com uma árvore de herança profunda: `Entidade`, depois `Personagem`, depois `Heroi` e `Monstro`, depois `MonstroVoador`. Cada nível partilha um pouco mais e percebe-se um pouco menos.

A alternativa que a cadeira recomenda é **composição em vez de herança**: em vez de herdares comportamento, juntas peças. Se já viste [herança e polimorfismo](/cadeiras/p/heranca-polimorfismo/), pensa nisto como escolher "tem um" em vez de "é um":

```java
public interface Comportamento {
    Posicao mover(Posicao atual);
}

public class Monstro {
    private Posicao posicao;
    private Comportamento comportamento;

    public Monstro(Posicao posicao, Comportamento comportamento) {
        this.posicao = posicao;
        this.comportamento = comportamento;
    }

    public void agir() {
        posicao = comportamento.mover(posicao);
    }
}
```

Um monstro **tem um** comportamento, não **é um** tipo de comportamento. Para criar um monstro novo, escreves uma classe pequena que implementa `Comportamento` e passas uma instância ao construtor. Nada de hierarquias de cinco níveis para representar "anda em zigzag".

:::tip[Herança para o estável, composição para o variável]
Usa herança quando a relação nunca vai mudar (um `Retangulo` é sempre uma `Forma`). Usa composição quando o comportamento varia, porque trocar um objeto em tempo de execução é trivial e reescrever uma hierarquia não é.
:::
