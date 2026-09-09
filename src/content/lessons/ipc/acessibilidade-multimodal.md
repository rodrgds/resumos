---
title: Acessibilidade e multimodalidade
description: Contraste, teclado e leitores de ecrã, e novos modos de interação.
section: conteudo
order: 8
---

A **acessibilidade** garante que pessoas com limitações visuais, auditivas, motoras ou cognitivas conseguem usar o sistema. Não é um extra para minorias: legendas servem a quem está no metro sem phones, texto bem contrastado serve a quem está ao sol, navegação por teclado serve a quem partiu o rato. Desenhar acessível é desenhar robusto.

## Contraste: medir em vez de adivinhar

O contraste entre texto e fundo mede-se como rácio de luminância, de 1:1 a 21:1. As linhas de orientação WCAG pedem, para o nível AA, pelo menos 4,5:1 em texto normal e 3:1 em texto grande. O erro clássico é o cinzento elegante: texto `#777777` sobre branco dá 4,48:1, ou seja, falha o AA por dois centésimos. Escurece para `#767676` ou carrega no peso da fonte e passa. Moral: nunca aproves cores a olho; usa um verificador de contraste.

## Teclado: tudo sem rato

Toda a ação deve ser alcançável e operável por teclado: tabular pela ordem lógica, ativar com Enter ou Espaço, sair de menus com Escape, e um indicador de foco sempre visível. Testa o teu protótipo de olhos no teclado: se ficares preso num calendário ou num menu que só abre com rato, há trabalho a fazer. Atalhos ajudam experientes mas nunca substituem o caminho completo por teclado.

## Leitores de ecrã: estrutura que se ouve

Um **leitor de ecrã** lê a página em voz alta para quem não vê. Ele navega pela estrutura, não pelo aspeto: títulos hierárquicos (`h1` a `h3` por ordem), imagens com texto alternativo que diga a função ("gráfico de barras das notas por semana", não "imagem"), formulários com etiquetas associadas a cada campo, e botões com nomes ("Confirmar sessão", não "Clique aqui"). Testa com um leitor gratuito durante dez minutos; a experiência muda a forma como escreves HTML.

## Interação multimodal

**Multimodal** significa combinar vários canais: voz mais toque, gestos mais olhar, caneta mais teclado. Cada canal compensa fraquezas dos outros: a voz é rápida mas má em ambientes ruidosos e expõe privacidade; o toque é preciso mas ocupa as mãos. Ao desenhar multimodal, define que canal manda em cada tarefa e o que acontece quando um falha (o comando de voz não percebido mostra as opções no ecrã em vez de repetir a pergunta).

## Exemplo: auditoria de uma página

Audita a página de confirmação de sessão da app com esta checklist:

1. Contraste: o texto secundário em cinzento passa 4,5:1? Mede; se der 4,2:1, escurece um tom.
2. Teclado: consegues ir de "Nova sessão" a "Confirmar" só com Tab e Enter, com foco sempre visível? Anota onde o foco desaparece.
3. Leitor de ecrã: os dois blocos de horário são títulos ou texto solto? Cada botão diz o que faz fora de contexto?
4. Erros: se a sala ficar indisponível, a mensagem explica e sugere alternativa, ou mostra só um código?
5. Multimodal: faria sentido confirmar por voz? Se sim, o que aparece no ecrã quando o ruído impede o reconhecimento?

Cada "não" vira uma correção concreta com responsável e prioridade, no mesmo formato da avaliação heurística. Uma auditoria destas, feita uma vez por ciclo, evita a acumulação de barreiras que depois exigem redesenho total.

:::details[Onde registar isto no projeto]
A acessibilidade entra na terceira fase como critério de aceitação: cada ecrã final passa a checklist antes de contar como feito. Escreve os critérios no relatório (nível AA, navegação total por teclado) e junta a tabela da auditoria como evidência. Avaliadores gostam de números: "12 barreiras encontradas, 12 corrigidas" vale mais do que "tivemos cuidado".
:::

## Para fechar a cadeira

Chegaste ao fim do ciclo: fundamentos, cognição, princípios, processo, protótipos, avaliação, estudos e acessibilidade. Volta ao [início](index/) e percorre as páginas na ordem do teu projeto: cada fase tem aqui o seu manual.
