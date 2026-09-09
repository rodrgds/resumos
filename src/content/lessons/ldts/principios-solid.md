---
title: Princípios SOLID
description: Os cinco princípios com sinais de violação em código Java e a refatoração de uma classe de jogo.
section: conteudo
order: 3
---

SOLID são cinco princípios para desenhar classes que aguentam mudanças. Não são regras de sintaxe que o compilador verifica: são cheiros que aprendes a detetar. Cada princípio responde a uma forma típica de o código apodrecer, e todos pagam dividendos quando o projeto cresce nas seis semanas do integrador.

## Os cinco princípios

**S de Single Responsibility**: uma classe tem uma razão para mudar. Uma classe `Jogo` que lê input, atualiza monstros, desenha o ecrã e guarda recordes tem quatro razões para mudar, logo quatro fontes de bugs.

**O de Open/Closed**: aberta a extensão, fechada a modificação. Para adicionar um monstro novo, deves criar uma classe nova, não editar a antiga. A composição da página anterior é a técnica que torna isto possível: o `Monstro` aceita qualquer `Comportamento` sem ser modificado.

**L de Liskov Substitution**: uma subclasse deve poder substituir a classe mãe sem partir nada. Se `Retangulo` tem `setLargura` e `setAltura` independentes, um `Quadrado` que herda dele e força os lados iguais viola o princípio: código que funcionava com retângulos parte-se com quadrados. Quando a herança mente sobre a relação, troca por composição.

**I de Interface Segregation**: interfaces pequenas e específicas em vez de uma interface gorda. Uma interface `Entidade` que obriga paredes e itens a implementar `mover` está errada: separa em `Desenhavel`, `Movivel` e `Coletavel`, e cada classe implementa só o que usa.

**D de Dependency Inversion**: depender de abstrações, não de concretizações. O `Monstro` da página anterior recebe um `Comportamento` (interface), não um `AndarEmZigZag` concreto. Isto também é o que permite testar com doubles, como vais ver nos testes.

## Exemplo: refatorar uma classe que faz tudo

Parte deste `ControladorArena` que viola Single Responsibility e Open/Closed:

```java
public class ControladorArena {
    public void passo(String tecla) {
        if (tecla.equals("cima")) heroi.subir();
        else if (tecla.equals("baixo")) heroi.descer();
        // ... mais teclas, desenho do ecrã e lógica de monstros aqui
    }
}
```

Cada tecla nova, cada monstro novo e cada mudança no desenho mexem nesta classe. A refatoração separa as responsabilidades:

```java
public class ControladorArena {
    private final Heroi heroi;
    private final Map<String, Comando> comandos;

    public void passo(String tecla) {
        comandos.getOrDefault(tecla, Comando.nada()).executar(heroi);
    }
}
```

Agora cada tecla é um objeto `Comando` registado no mapa. Adicionar uma tecla é criar uma classe e registá-la: extensão sem modificação (Open/Closed), e a classe voltou a ter uma só razão para mudar (Single Responsibility). O desenho do ecrã e a lógica dos monstros saem para as suas próprias classes pelo mesmo processo.

:::warning[SOLID não é burocracia]
Cinco classes de uma linha para substituir um `if` com dois ramos é pior, não melhor. Aplica os princípios onde o código muda com frequência: no núcleo do jogo, não nos cantos que ninguém toca.
:::
