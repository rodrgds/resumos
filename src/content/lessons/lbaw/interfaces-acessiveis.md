---
title: Interfaces, usabilidade e acessibilidade
description: Arquitetura de informação, navegação e formulários acessíveis, com a página de compra refeita.
section: conteudo
order: 7
---

A aplicação funciona quando os dados estão certos; é usável quando as pessoas conseguem comprar sem manual. Esta página desenha a interface da Loja de Bilhetes: onde fica cada coisa, como se navega e como se garante que toda a gente, incluindo quem usa só teclado ou leitor de ecrã, conclui a compra.

## Arquitetura de informação

A **arquitetura de informação** decide que páginas existem e como se ligam. Para a loja chegam quatro níveis:

1. **Início**: eventos em destaque e pesquisa por data.
2. **Evento**: descrição e lista de sessões futuras com lugares livres.
3. **Sessão**: data, preço, lugares e botão de comprar.
4. **Compra**: formulário, confirmação e histórico.

Cada nível responde a uma pergunta do comprador: o que há, quando posso ir, quanto custa e está comprado. Se uma página não responder a uma destas perguntas, está no sítio errado. O caso de uso de comprar bilhete atravessa os níveis 2 a 4 sem desvios: evento, sessão, compra. Qualquer página extra no meio é um passo onde o comprador pode desistir.

## A página de compra refeita

A primeira versão típica mete tudo numa parede de campos: nome, email, cartão, morada de faturação e três botões parecidos. A versão refeita segue três regras.

Primeiro, **hierarquia clara**: um título com a sessão e a data, depois o resumo do pedido com preço total destacado, e só depois o formulário. O comprador confirma o que está a comprar antes de dar dados.

Segundo, **um rótulo por campo**, ligado ao campo:

```html
<label for="email">Email para envio dos bilhetes</label>
<input id="email" name="email" type="email" required autocomplete="email" />
```

O `for` ligado ao `id` faz o leitor de ecrã anunciar o rótulo ao entrar no campo, e o `type="email"` com `required` repete no navegador as regras do servidor. Um campo sem rótulo visível é invisível para parte dos utilizadores, por mais bonito que seja o desenho.

Terceiro, **foco visível e ordem lógica**: a tecla Tab percorre título, resumo, campos e botão de confirmar por esta ordem, e o elemento focado mostra um contorno claro. Testa de olhos fechados no rato: desliga o rato e compra um bilhete só com o teclado. Se ficares preso numa armadilha de foco ou não souberes onde estás, o leitor de ecrã também fica.

## Verificação de contraste e teclado

Antes de declarar a página pronta, corre esta lista curta:

- O texto normal contrasta com o fundo o suficiente para se ler ao sol. Cinzento claro sobre branco para o preço é o falhanço clássico.
- Todas as ações funcionam por teclado: Tab para navegar, Enter para confirmar, Escape para fechar diálogos.
- Cada erro de validação aparece junto ao campo, em texto, não só com cor vermelha. Cor sozinha não chega para quem não a distingue.
- As imagens que informam têm texto alternativo; as decorativas têm alternativo vazio para o leitor de ecrã as saltar.

:::tip[Usabilidade testa-se com pessoas]
Mostra a página a um colega sem explicar nada e pede-lhe para comprar um bilhete para sexta-feira. Observa onde hesita e o que clica por engano. Cada hesitação é um defeito da interface, não do colega. Uma sessão de dez minutos encontra mais problemas do que uma hora a olhar para o próprio desenho.
:::
