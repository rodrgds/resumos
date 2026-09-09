---
title: Perceção e cognição
description: Visão, atenção e memória, carga cognitiva e os erros que o design deve prevenir.
section: conteudo
order: 2
---

As pessoas não são computadores lentos; são sistemas com sensores e memória próprios, com limites bem conhecidos. Desenhar sem conhecer esses limites é como programar sem conhecer a linguagem: o resultado até pode correr, mas ninguém garante o comportamento.

## Visão: o que salta à vista

A visão deteta primeiro contraste, cor, tamanho e movimento, e só depois lê. Isto decide hierarquias: o botão principal deve ser o elemento visualmente mais forte, não apenas mais um retângnulo no meio de outros. Agrupar por proximidade diz "isto pertence junto"; alinhar diz "isto é da mesma família". São as leis da Gestalt em roupa prática: o utilizador agrupa o que está perto e alinhado antes de ler uma palavra.

Duas consequências diretas. Primeira, reserva cor e movimento para o que importa: se tudo pisca, nada se destaca. Segunda, não contes com subtilezas: texto cinzento claro sobre fundo branco pode ser ilegível para muita gente, como vais medir na página de [acessibilidade](acessibilidade-multimodal/).

## Atenção: um recurso escasso

A atenção consciente é quase unitária: fazemos bem uma coisa de cada vez. Tudo o que a interface exige além da tarefa (decifrar ícones, lembrar códigos, ignorar banners) rouba atenção à tarefa. O utilizador não lê ecrãs, **varre** ecrãs à procura da próxima ação. Por isso títulos, botões e mensagens de erro devem funcionar sozinhos, sem exigir a leitura do parágrafo inteiro.

## Memória: reconhecer vence recordar

Há dois tipos de memória em jogo. A **memória de trabalho** aguenta cerca de $7 \pm 2$ blocos de informação de cada vez, e só por segundos. A **memória de longo prazo** é vasta mas lenta a recuperar sem pistas. Daqui sai a regra de ouro: **reconhecer é mais fácil do que recordar**. Um menu mostra as opções (reconhecimento); uma linha de comandos exige decorá-las (recordação). Sempre que pedes ao utilizador para se lembrar de algo que o sistema já sabe, como um código que apareceu dois ecrãs atrás, estás a falhar.

O **chunking**, agrupar informação em blocos com sentido, multiplica a capacidade efetiva. Um número de telefone escreve-se em grupos por isto mesmo. Aplica a mesma ideia a formulários, menus e instruções.

## Carga cognitiva e erros

A **carga cognitiva** é o esforço mental que a tarefa mais a interface exigem. Há carga boa (pensar no problema) e carga má (decifrar a interface). O teu trabalho é eliminar a má: valores por defeito sensatos, passos visíveis, formatos aceites à entrada, confirmações antes de ações destrutivas.

Quanto aos erros, assume que vão acontecer e desenha para eles. Há lapsos (carregar no botão ao lado), enganos (achar que o botão faz outra coisa) e violações (contornar o processo de propósito). Para lapsos, confirmações e desfazer. Para enganos, nomes claros e pré-visualização. Nunca culpes o utilizador; pergunta que pista faltou.

## Exemplo: formulário com oito campos

Um formulário de registo pede nome, email, palavra-passe, confirmação, morada, código postal, cidade e telemóvel, tudo numa coluna sem agrupamento nem feedback até ao "Submeter" final, que responde "dados inválidos".

Redesenho com esta página:

1. Agrupa em dois blocos com títulos: "Conta" (nome, email, palavra-passe, confirmação) e "Contacto" (morada, código postal, cidade, telemóvel). O chunking reduz oito decisões a duas.
2. Valida cada campo ao sair dele, com mensagem junto ao campo: "o email precisa de um @". Feedback imediato em vez de um erro genérico no fim.
3. Mostra a força da palavra-passe enquanto escreve e confirma a igualdade das duas automaticamente. O utilizador reconhece o estado em vez de adivinhar.
4. Preenche a cidade a partir do código postal quando possível. Não peças o que o sistema pode saber.

:::warning[O erro mais comum]
Acrescentar explicações em vez de simplificar. Se um campo precisa de um parágrafo de ajuda, o problema é o campo. Primeiro tenta eliminar, fundir ou pré-preencher; só depois explica o que restar.
:::

## Para levar para a próxima página

Visão agrupa antes de ler, atenção é unitária e memória prefere reconhecer a recordar. Estas leis viram regras práticas de desenho: affordances, feedback, consistência e uma lista de verificação famosa. São os [princípios de usabilidade](principios-usabilidade/).
