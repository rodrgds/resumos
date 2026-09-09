---
title: Arquitetura e desenho de software
description: Estilos de arquitetura, diagramas UML de classes e sequência, reutilização e desenho detalhado.
section: conteudo
order: 5
---

A **arquitetura** decide a estrutura do sistema: que partes existem, que responsabilidades tem cada uma e como comunicam. O **desenho detalhado** decide como cada parte cumpre a sua responsabilidade: classes, métodos, estruturas de dados. Arquitetura errada significa reescrever; detalhe errado significa refatorar. Por isso a arquitetura decide-se cedo e com mais cerimónia.

## Estilos de arquitetura

Um estilo é uma forma recorrente de organizar as partes:

- **Em camadas.** Apresentação, lógica de negócio, dados. Cada camada só fala com a de baixo. Simples de perceber e de testar por camadas; a app do exemplo cabe aqui.
- **Cliente servidor.** A app pede, o servidor responde. Separa o que corre no dispositivo do que corre na infraestrutura e permite evoluir cada lado.
- **MVC.** Modelo (dados e regras), Vista (ecrã), Controlador (mediação). Mantém a interface separada da lógica para poderes mudar o ecrã sem tocar nas regras.
- **Microsserviços.** Pequenos serviços independentes que comunicam pela rede. Escalam e evoluem em separado, mas pagam complexidade de operação e de consistência.

Escolher é trocar vantagens por custos: camadas são simples mas podem virar monolitos rígidos; microsserviços escalam mas exigem operação séria. Numa pergunta de escolha, justifica com os requisitos não funcionais (escala esperada, equipa disponível, criticidade).

## Diagramas de classes e de sequência

O **diagrama de classes** mostra a estrutura: classes com atributos e métodos, e relações (associação, agregação, herança). Revê [classes e objetos](/cadeiras/p/classes-objetos/) se precisares. Para registar um pedido na app:

```
+-------------------+         +-------------------+
|     Utilizador    |         |      Pedido       |
+-------------------+         +-------------------+
| - email           | 1     * | - itens           |
| - palavraPasse    |---------------->| - total           |
| + iniciarSessao() |  efectua  | + calcularTotal() |
+-------------------+         +-------------------+
```

Lê-se: um utilizador efetua vários pedidos; cada pedido tem itens e sabe calcular o seu total. O verbo na associação ("efetua") importa: associações sem nome escondem decisões.

O **diagrama de sequência** mostra o comportamento no tempo: objetos em cima, tempo a descer, mensagens com setas, retornos a tracejado. Para o mesmo cenário:

```
Utilizador -> App: registarPedido(itens)
App -> Pedido: criar(itens)
Pedido -> Pedido: calcularTotal()
Pedido --> App: pedido
App -> BaseDados: guardar(pedido)
BaseDados --> App: ok
App --> Utilizador: confirmação
```

Os dois diagramas respondem a perguntas diferentes: o de classes diz o que existe, o de sequência diz como colabora. Um desenho completo precisa dos dois.

## Reutilização e desenho detalhado

**Reutilizar** é preferir código já feito e testado: bibliotecas, frameworks, serviços. Reutilizar poupa tempo e defeitos, mas cria dependência: a biblioteca pode mudar, ter vulnerabilidades ou não fazer exatamente o que precisas. A regra prática: reutiliza o que é genérico e bem testado (autenticação, validação, datas), escreve o que é o valor do teu produto (as regras de negócio que te distinguem).

No desenho detalhado, mantém cada módulo pequeno e com uma responsabilidade, se és programador decompõe como em [funções](/cadeiras/fp/funcoes/): cada função e cada classe fazem uma coisa e fazem bem. Fronteiras claras entre módulos são o que permite mudar um requisito sem partir o resto, como viste na [introdução](introducao/).

:::tip[Como desenhar sem paralisar]
Desenha primeiro a sequência feliz num guardanapo: três a cinco mensagens chegam. Só depois pergunta pelos erros (credenciais inválidas, base de dados em baixo) e acrescenta os fluxos alternativos. Quem começa pelos erros nunca chega ao fluxo principal.
:::

## Exercício: classes, sequência e decisão de reutilizar

Para "registar um pedido" na app:

1. **Classes.** Desenha `Utilizador` (email, palavra passe, iniciarSessao), `Pedido` (itens, total, calcularTotal) e `BaseDados` (guardar, carregar). Marca a associação "efetua" entre utilizador e pedidos e justifica cada método com um requisito: `calcularTotal` existe porque o requisito de totais o exige.
2. **Sequência.** Escreve as seis mensagens do exemplo acima e acrescenta o fluxo alternativo: se `calcularTotal` detetar um item sem preço, a App devolve erro ao utilizador sem guardar nada. Repara como o diagrama alternativo revela um requisito em falta: "o que é um item válido".
3. **Reutilizar ou escrever.** A app precisa de transformar palavras passe antes de as guardar. Escrever a tua própria função criptográfica é um erro clássico: parece simples e falha de formas subtis. Justifica reutilizar uma biblioteca estabelecida de dispersão com sal: é código genérico, revisto por especialistas e testado por milhões de utilizadores, enquanto a lógica de portes dinâmicos, essa sim específica do negócio, escreve-se em casa.

Na próxima página, [Construção e evolução](construcao-evolucao/), o desenho transforma-se em código gerido com Git e integração contínua.
