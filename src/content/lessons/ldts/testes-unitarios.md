---
title: Testes unitários com JUnit
description: Testes com JUnit, mocks e stubs com Mockito, cobertura e mutation testing.
section: conteudo
order: 4
---

Um **teste unitário** verifica uma unidade pequena de código, tipicamente um método, de forma automática e repetível. Em LDTS os testes protegem o projeto: quando refatoras na semana 5, são eles que dizem se partiste a semana 2. JUnit executa os testes, Mockito cria substitutos para as dependências, e a cobertura e o mutation testing medem a qualidade da tua bateria.

## O primeiro teste com JUnit

Cada teste prepara um cenário, executa e verifica o resultado. Por convenção, um teste por comportamento, com nome que diz o que verifica:

```java
import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;

class PosicaoTest {
    @Test
    void somarDeslocamentoDevolveNovaPosicao() {
        Posicao origem = new Posicao(3, 4);

        Posicao destino = origem.somar(1, -2);

        assertEquals(4, destino.getX());
        assertEquals(2, destino.getY());
        assertEquals(3, origem.getX());
    }
}
```

As três fases estão separadas por linhas em branco: preparar, agir, verificar. A última verificação confirma que a origem não mudou, porque `somar` devolve um objeto novo. Se já escreveste asserts simples em [exceções e testes](/cadeiras/p/excecoes-testes/), isto é a versão industrial da mesma ideia: cada teste corre sozinho, sem ordem garantida e sem depender de outros testes.

## Mocks e stubs com Mockito

O problema: testar o `ControladorArena` exige um ecrã e um teclado, que não existem nos testes. A solução é trocar as dependências reais por **doubles**: um **stub** devolve respostas fixas e um **mock** regista as chamadas para verificação posterior.

```java
import static org.mockito.Mockito.*;

interface Ecra { void desenhar(String conteudo); }

class ControladorArenaTest {
    @Test
    void passoDesenhaHeroiNaNovaPosicao() {
        Ecra ecra = mock(Ecra.class);
        ControladorArena arena = new ControladorArena(ecra);

        arena.passo("cima");

        verify(ecra).desenhar("heroi:(3,3)");
    }
}
```

O `mock` cria um ecrã falso que regista tudo. Depois de agir, o `verify` confirma que o controlador pediu exatamente o desenho esperado. Se o controlador desenhasse duas vezes, ou desenhasse outra coisa, o teste falhava. É por isto que a inversão de dependências importa: só consegues injetar o mock porque o controlador depende da interface `Ecra`, não de uma classe concreta.

## Cobertura e mutation testing

A **cobertura** diz que percentagem do código os testes executam. 100 por cento de cobertura com testes fracos vale pouco: um teste que chama o método e não verifica nada conta para a cobertura. O **mutation testing** (Pitest no projeto) resolve isto ao introduzir mutantes, pequenas alterações como trocar `+` por `-` ou apagar uma chamada. Cada mutante que a bateria apanha é um ponto; cada mutante que sobrevive denuncia um teste fraco ou código morto.

:::tip[Como ler o relatório do Pitest]
Um mutante sobrevivente numa condição de fronteira (`<` contra `<=`) quase sempre significa que falta um teste para o caso limite. Escreve esse teste antes de mexer no código.
:::

## Exemplo completo: controlador com stub e mock

Testar o movimento do herói junta as duas técnicas. Um stub de entrada finge que o utilizador premiu "cima", e um mock de ecrã verifica o desenho:

```java
@Test
void heroiSobeQuandoTeclaECima() {
    Entrada entrada = mock(Entrada.class);
    when(entrada.lerTecla()).thenReturn("cima");
    Ecra ecra = mock(Ecra.class);
    ControladorArena arena = new ControladorArena(entrada, ecra);

    arena.passo();

    verify(ecra).desenhar("heroi:(3,3)");
}
```

O teste não precisa de teclado nem de terminal: a entrada está presa na resposta fixa e o ecrã regista a chamada. Corre com `gradle test` em menos de um segundo, e vai continuar a correr em cada build até ao fim do projeto.
