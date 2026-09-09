---
title: Levantamento de requisitos
description: Atores, casos de uso e histórias de utilizador a partir de um enunciado, com o exemplo da Loja de Bilhetes.
section: conteudo
order: 1
---

Antes de desenhares uma tabela ou escreveres uma linha de código, precisas de responder a uma pergunta: o que é que a aplicação tem de fazer, para quem e com que limites. O levantamento de requisitos transforma um enunciado vago nessa resposta escrita. Tudo o resto do projeto, do [modelo conceptual](modelo-conceptual/) às interfaces, nasce daqui.

## Atores e objetivos

Um **ator** é quem interage com o sistema: uma pessoa com um papel ou outro sistema. Um **objetivo** é o que esse ator quer conseguir. Na Loja de Bilhetes há dois atores humanos:

- **Visitante**: explora eventos e sessões sem conta. Quer descobrir o que há e decidir se compra.
- **Comprador**: tem conta, compra bilhetes e consulta as suas compras. Quer garantir o lugar com o mínimo de passos.

Escreve os atores antes de qualquer funcionalidade. Cada requisito que levantares a seguir pertence a um ator com um objetivo. Se não souberes dizer quem precisa da funcionalidade nem para quê, ainda não é um requisito, é uma ideia.

## Casos de uso

Um **caso de uso** descreve uma interação completa entre um ator e o sistema, do início ao resultado. Tem nome, ator, pré-condições e um fluxo numerado de passos, incluindo o que acontece quando algo corre mal.

Caso de uso 1, comprar bilhete:

1. O comprador escolhe uma sessão com lugares livres.
2. O sistema mostra o preço e os lugares disponíveis.
3. O comprador confirma a compra.
4. O sistema reserva os bilhetes, regista a compra e mostra a confirmação.

Exceção no passo 3: se os lugares esgotarem entre a escolha e a confirmação, o sistema avisa e devolve o comprador à lista de sessões. Repara que a exceção faz parte do caso de uso. Uma compra sem este ramo parece completa no papel e falha na primeira sessão esgotada.

Caso de uso 2, registar conta:

1. O visitante indica nome, email e palavra-passe.
2. O sistema verifica que o email ainda não está registado.
3. O sistema cria a conta e inicia a sessão do novo comprador.

Exceção no passo 2: se o email já existir, o sistema sugere iniciar sessão em vez de criar uma conta duplicada.

## Histórias de utilizador

Uma **história de utilizador** diz o mesmo que um caso de uso numa frase com três partes: quem, o quê e para quê. Servem para ordenar o trabalho e conversar com o grupo.

- Como comprador, quero ver os lugares livres de cada sessão para escolher sem adivinhar.
- Como comprador, quero receber confirmação da compra para ter prova do que paguei.
- Como visitante, quero pesquisar eventos por data para planear a semana.

Cada história deve ser pequena o suficiente para caber numa entrega e concreta o suficiente para se testar. "Como comprador, quero uma boa experiência" não é testável e por isso não é uma história, é um desejo.

## Tabela de requisitos e um requisito rejeitado

Junta tudo numa tabela com identificador, descrição, ator e prioridade. A tabela é o contrato do grupo: o que lá está faz-se, o que lá não está não se faz.

| Id  | Requisito                                           | Ator      | Prioridade |
| --- | --------------------------------------------------- | --------- | ---------- |
| R1  | Comprar bilhetes para uma sessão com lugares livres | Comprador | Alta       |
| R2  | Registar conta com email único                      | Visitante | Alta       |
| R3  | Pesquisar eventos por data                          | Visitante | Média      |
| R4  | Consultar o histórico de compras                    | Comprador | Média      |

E agora o requisito rejeitado: "o sistema deve ser rápido". Parece razoável, mas não diz quanto é rápido, a medir onde nem em que condições. Rejeita-o na forma atual e substitui-o por algo verificável, por exemplo "a pesquisa de eventos responde em menos de 2 segundos com 1000 eventos na base de dados". Um requisito que não se consegue testar não se consegue cumprir.

:::tip[O teste do requisito]
Para cada requisito, pergunta como vais demonstrar que está feito. Se a resposta for "abre-se a página e vê-se", escreve os passos. Se não houver resposta, o requisito ainda está vago e deve voltar para a mesa antes de desenhar seja o que for.
:::

## Para levar para a próxima página

Com os requisitos fechados, o passo seguinte é desenhar o que o sistema guarda: que entidades existem, como se relacionam e que regras as limitam. É o [modelo conceptual em UML](modelo-conceptual/), onde os casos de uso desta página se transformam em classes.
