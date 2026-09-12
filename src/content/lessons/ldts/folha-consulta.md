---
title: Folha de consulta de LDTS
description: Decisões rápidas para Git, Java, testes, padrões, desenho OO, refatoração e UML.
section: recursos
studyKind: revision
editorial:
  sources:
    - title: Resumos LDTS SofiaViP
      url: https://drive.google.com/file/d/1hcOt8gAPt-hdaZIsVSoaxifYwK7Lmnq4/view
  coverage: As páginas 2 a 18 do PDF apresentam Git, Java e coleções, testes unitários e de propriedades, padrões de desenho, princípios de desenho OO, refatoração e UML. A página 1 é a capa.
  gaps:
    - O PDF não é uma referência completa de Java, JUnit, Gradle ou todos os padrões; a parte de testes baseados em propriedades é breve.
    - A edição do programa e as regras de avaliação a que os apontamentos correspondem não foram confirmadas.
---

Esta folha condensa os [apontamentos LDTS de SofiaViP](https://drive.google.com/file/d/1hcOt8gAPt-hdaZIsVSoaxifYwK7Lmnq4/view). Usa-a para escolher um passo ou uma estrutura, não como lista de nomes para decorar.

## Git e trabalho em equipa

**Working tree → staging area → commit.** `git add` escolhe o conteúdo do próximo commit; `git commit` grava esse snapshot local. Antes de o criar, consulta `git status` e `git diff --cached`. Um branch aponta para um commit e avança com novos commits. Num merge sem fast-forward há um commit que reúne as duas histórias; se houver conflito, resolve o conteúdo e testa antes de concluir. `fetch` atualiza referências remotas sem integrar, `pull` integra depois de obter, `push` publica os commits locais. Vê [repositório local e remoto](/cadeiras/ldts/controlo-versoes/#repositório-local-e-remoto), [branches e merges](/cadeiras/ldts/controlo-versoes/#branches-e-merges) e [workflow em equipa](/cadeiras/ldts/controlo-versoes/#workflows-em-equipa).

**Recuperação:** `git revert <commit>` acrescenta um commit inverso e preserva o histórico partilhado. `git reset` move a referência local; `--hard` descarta também mudanças de ficheiros e índice. Verifica o âmbito antes de o usar. Mantém ficheiros gerados e segredos fora do repositório; resolve dependências no sistema de build do projeto. Vê [Gradle](/cadeiras/ldts/controlo-versoes/#dependências-com-gradle).

## Java e modelação OO

Uma variável primitiva guarda um valor; uma variável de tipo de referência guarda uma referência que pode ser `null`. `final` impede atribuir outra referência, **não** torna o objeto imutável. `static` pertence à classe; um método de instância pode usar o estado do objeto. `==` compara referências para objetos; `equals` deve representar igualdade lógica. Se redefinires `equals`, mantém o contrato de `hashCode`, sobretudo em `HashSet` e `HashMap`. Escolhe `List` para ordem e duplicados, `Set` para unicidade e `Map` para associação chave-valor. Vê [tipos e coleções](/cadeiras/ldts/java-orientado-objetos/#tipos-e-coleções) e [classes e objetos](/cadeiras/ldts/java-orientado-objetos/#classes-e-objetos).

**Herança** modela substituição válida: uma subclasse deve poder ocupar o lugar da base sem quebrar as suas promessas. **Composição** modela posse ou colaboração e costuma ser mais simples quando o comportamento pode variar. Uma interface fixa operações esperadas sem exigir uma implementação; uma classe abstrata pode partilhar estado e implementação. Encapsula o estado e expõe operações que protejam os invariantes. Vê [herança e composição](/cadeiras/ldts/java-orientado-objetos/#herança-e-composição) e [princípios SOLID](/cadeiras/ldts/principios-solid/#os-cinco-princípios).

## Testes que dizem algo

Um teste unitário prepara o estado, executa **uma ação** e verifica um resultado observável. Testa casos normais, limites e erros a partir do contrato, sem copiar a lógica da implementação. Um _stub_ devolve respostas controladas; um _mock_ permite verificar interações quando estas fazem parte do comportamento exigido. Injeção de dependências permite trocar dependências externas por substitutos. Cobertura conta código executado, não prova a qualidade das asserções; _mutation testing_ verifica se alterações artificiais são detetadas. Vê [JUnit](/cadeiras/ldts/testes-unitarios/#o-primeiro-teste-com-junit), [mocks e stubs](/cadeiras/ldts/testes-unitarios/#mocks-e-stubs-com-mockito) e [cobertura](/cadeiras/ldts/testes-unitarios/#cobertura-e-mutation-testing).

Nos **testes baseados em propriedades**, declara um invariante válido para muitas entradas, gera casos e reduz um contraexemplo até ficar fácil de explicar. Regista a _seed_ para repetir falhas. Uma propriedade útil, por exemplo, pode afirmar que codificar e descodificar um valor suportado recupera esse valor; não basta verificar que o método não lança exceção. O PDF só introduz esta técnica, não desenvolve um fluxo completo.

## Padrões, princípios e refatoração

Escolhe um padrão pelo problema concreto:

| Necessidade                                       | Padrão e consequência                                              |
| ------------------------------------------------- | ------------------------------------------------------------------ |
| Variar um algoritmo sem condicionais espalhadas   | **Strategy**: troca a implementação por composição.                |
| Mudar comportamento conforme o estado interno     | **State**: o estado atual escolhe transições e ações.              |
| Notificar dependentes quando algo muda            | **Observer**: define subscrição e ciclo de vida dos observadores.  |
| Criar famílias relacionadas de objetos            | **Abstract Factory**: clientes dependem das interfaces da família. |
| Converter uma interface existente noutra esperada | **Adapter**: traduz pedidos sem mudar o cliente.                   |
| Acrescentar responsabilidades a um objeto         | **Decorator**: envolve o objeto e preserva a interface.            |

**Factory Method** entrega a escolha da classe concreta a subclasses; **Command** encapsula um pedido; **Singleton** impõe uma instância global, mas introduz estado global e dificulta isolamento em testes. Um padrão não substitui uma justificação de desenho. Vê [padrões de desenho](/cadeiras/ldts/padroes-desenho/#os-dez-padrões-em-rascunho-rápido), [Strategy e State](/cadeiras/ldts/padroes-desenho/#exemplo-strategy-e-state-nos-monstros) e [Observer](/cadeiras/ldts/padroes-desenho/#exemplo-observer-na-pontuação).

**SRP:** uma classe tem uma razão clara para mudar. **OCP:** extensões não exigem alterar todas as alternativas existentes. **LSP:** subtipos mantêm contratos da base. **ISP:** interfaces pequenas evitam métodos irrelevantes para clientes. **DIP:** código de alto nível depende de abstrações adequadas. Estes princípios orientam decisões, não são regras para criar uma interface por classe. Se um método é longo, mistura níveis de abstração ou mexe mais nos dados de outra classe, caracteriza o problema, fixa comportamento com testes e refatora em passos pequenos. Vê [SOLID](/cadeiras/ldts/principios-solid/#os-cinco-princípios), [cheiros](/cadeiras/ldts/smells-refactoring/#os-cheiros-mais-comuns) e [refatorar em segurança](/cadeiras/ldts/smells-refactoring/#como-refatorar-em-segurança).

## UML para comunicar o desenho

No **diagrama de classes**, mostra classes, atributos, operações e multiplicidades: associação liga objetos; agregação é um todo/parte fraco; composição implica que a parte pertence ao ciclo de vida do todo; generalização representa substituição. No **diagrama de sequência**, lê o tempo de cima para baixo e distingue chamadas, respostas e condições. Um **diagrama de estados** mostra estados, eventos e transições; documenta quando uma transição pode ocorrer, não apenas os nomes dos estados. Vê [classes](/cadeiras/ldts/diagramas-uml/#diagrama-de-classes), [sequência](/cadeiras/ldts/diagramas-uml/#diagrama-de-sequência) e [comunicação](/cadeiras/ldts/diagramas-uml/#diagrama-de-comunicação).

No projeto, separa **modelo** (regras e estado), **vista** (apresentação) e **controlador** (interpretação das ações). Confirma a direção das dependências e testa cada parte no limite que lhe pertence. Vê [MVC](/cadeiras/ldts/mvc-projeto/#mapear-o-hero) e [testes do projeto](/cadeiras/ldts/mvc-projeto/#exemplo-planear-os-testes-do-projeto).

O PDF é uma seleção de tópicos, não uma especificação completa do projeto ou do programa atual.
