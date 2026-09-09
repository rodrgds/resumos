---
title: Modelo conceptual em UML
description: Classes, associações, multiplicidades e restrições a partir dos requisitos, com o diagrama da Loja de Bilhetes.
section: conteudo
order: 2
---

Os [requisitos](requisitos/) dizem o que o sistema faz. O modelo conceptual diz o que o sistema guarda: que entidades existem, que dados tem cada uma e como se relacionam. Desenha-se em UML, antes de pensar em tabelas, para discutir o problema sem o ruído da tecnologia.

## Classes e atributos

Uma **classe** é um tipo de coisa que o sistema regista, com **atributos** que guardam os seus dados. Na Loja de Bilhetes precisamos de quatro:

- **Utilizador**: nome, email (único) e palavra-passe.
- **Evento**: título, descrição e categoria.
- **Sessão**: data, hora, preço e lotação. Cada sessão pertence a um evento.
- **Bilhete**: código e estado (reservado, pago ou cancelado). Cada bilhete liga um utilizador a uma sessão.

Cada classe tem exatamente os atributos que os casos de uso exigem, nem mais nem menos. O email é único porque o registo com email duplicado é uma exceção tratada nos requisitos. O estado do bilhete existe porque a compra tem confirmação e pode ser cancelada. Se um atributo não serve nenhum requisito, corta-o.

## Associações e multiplicidades

Uma **associação** liga duas classes, e a **multiplicidade** diz quantos objetos de um lado se ligam a cada objeto do outro. Lê-se nos dois sentidos.

- Um **Evento** tem uma ou mais **Sessões** (`1` a `1..*`). Uma sessão pertence a exatamente um evento. Sem esta associação, a pesquisa de eventos por data não teria onde ir buscar as datas.
- Um **Utilizador** compra zero ou mais **Bilhetes** (`0..*`), e cada bilhete pertence a exatamente um utilizador.
- Uma **Sessão** tem zero ou mais **Bilhetes**, e cada bilhete refere exatamente uma sessão.

Repara na leitura inversa: dizer "uma sessão tem muitos bilhetes" não chega, porque também é preciso dizer que "cada bilhete é de uma só sessão". As duas leituras juntas é que fecham a regra, e é dessa regra que nascem as chaves estrangeiras no [esquema relacional](esquema-relacional/).

## Resolver o muitos para muitos

Um utilizador compra bilhetes para várias sessões e cada sessão recebe bilhetes de vários utilizadores: entre **Utilizador** e **Sessão** há uma relação de muitos para muitos. Em UML não a desenhas direta quando ela tem dados próprios. O **Bilhete** é a classe de associação que a resolve: guarda o código e o estado da compra e liga cada compra a exatamente um utilizador e uma sessão.

A regra para reconhecer este padrão: quando a ligação entre dois lados precisa de guardar informação (quando foi comprado, em que estado está), essa ligação merece ser uma classe. O bilhete tem código e estado, por isso é classe. Se a ligação não guardasse nada, uma associação simples chegava.

## Restrições que o desenho não mostra

O diagrama mostra estrutura, mas algumas regras precisam de texto. Escreve-as como **restrições** junto ao modelo:

- O email do utilizador é único em todo o sistema.
- Não se vendem mais bilhetes do que a lotação da sessão.
- A data de uma sessão não pode estar no passado.
- Um bilhete cancelado liberta o lugar para nova venda.

Estas frases são o contrato com as fases seguintes: a unicidade do email vira restrição na tabela, a lotação vira [trigger](triggers-transacoes/) e a data mínima vira validação na aplicação. Um modelo sem restrições escritas empurra estas decisões para o código, onde cada programador do grupo inventa a sua versão.

:::warning[O erro mais comum]
Desenhar o modelo a partir das páginas que imaginaste, em vez de o desenhar a partir dos requisitos. Se uma classe existe só porque "a página precisa", volta aos casos de uso: ou o requisito existe e a classe fica, ou não existe e a classe sai do diagrama e do projeto.
:::
