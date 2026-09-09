---
title: Padrões de desenho
description: Os dez padrões do programa aplicados a problemas concretos do jogo.
section: conteudo
order: 7
---

Um **padrão de desenho** é uma solução reutilizável para um problema recorrente, com nome, estrutura e consequências conhecidas. O programa lista dez. Não os decores como definições: aprende a reconhecer o problema que cada um resolve, porque nos exercícios e nas provas a pergunta é sempre "que padrão aplicavas aqui".

## Os dez padrões em rascunho rápido

**Strategy** troca algoritmos em tempo de execução: o `Monstro` recebe um `Comportamento` diferente. Usa quando há várias formas de fazer a mesma coisa.

**State** troca comportamento conforme o estado interno: um monstro calmo foge, um monstro alerta persegue. Usa quando um objeto se comporta de forma muito diferente consoante o estado, em vez de um `switch` gigante.

**Observer** avisa interessados quando algo muda: a pontuação observa os monstros e atualiza-se quando um cai. Usa para dependências um para muitos sem acoplamento.

**Command** transforma um pedido num objeto: cada tecla vira um `Comando` com `executar`. Usa para desfazer, filas e menus.

**Factory Method** e **Abstract Factory** criam objetos sem expor a classe concreta: uma fábrica de monstros devolve o tipo certo para cada nível. Usa quando a criação tem lógica.

**Composite** trata um grupo como um objeto: uma parede feita de segmentos desenha-se como uma peça. Usa para estruturas em árvore.

**Decorator** acrescenta comportamento por embrulho: um monstro com bónus de velocidade embrulha o monstro base. Usa para combinações que explodiriam em subclasses.

**Adapter** converte uma interface noutra: adapta a biblioteca de ecrã à interface `Ecra` do jogo. Usa para integrar código que não controlas.

**Singleton** garante uma só instância: o registo de recordes. Usa com moderação, porque estado global dificulta testes.

## Exemplo: Strategy e State nos monstros

O movimento dos monstros usa Strategy, como na página de [Java](java-orientado-objetos/):

```java
Comportamento zigzag = new AndarEmZigZag();
Comportamento perseguir = new PerseguirHeroi(heroi);
Monstro m1 = new Monstro(new Posicao(5, 5), zigzag);
Monstro m2 = new Monstro(new Posicao(8, 2), perseguir);
```

Quando o nível aperta, o estado do monstro muda a estratégia por dentro:

```java
public class MonstroAlerta implements EstadoMonstro {
    public Comportamento comportamento(Heroi heroi) {
        return new PerseguirHeroi(heroi);
    }
}
```

O `Monstro` pede ao seu estado o comportamento atual. Calmo devolve passeio, alerta devolve perseguição: o `switch` sobre o estado desapareceu, e um estado novo é uma classe nova.

## Exemplo: Observer na pontuação

A pontuação observa cada monstro sem os monstros saberem dela:

```java
monstro.adicionarObservador(pontuacao);
// ... quando o monstro cai:
observadores.forEach(o -> o.notificar(100));
```

Adicionar um contador de mortes ou um efeito sonoro é registar mais um observador. Nenhum monstro muda, porque nenhum monstro conhece os observadores: é o desacoplamento que o padrão promete.

:::tip[Como escolher na prova]
Pergunta o que varia: algoritmos que se trocam é Strategy, comportamento que depende de estado é State, notificações a vários interessados é Observer, pedidos como objetos é Command, criação com lógica é Factory. O nome do padrão descreve a solução, não o problema.
:::
