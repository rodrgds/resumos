---
title: Verificação e validação de software
description: Testes de integração, sistema e aceitação, inspeções, defeitos e análise estática.
section: conteudo
order: 7
---

**Verificação** pergunta "estamos a construir bem o produto": o código cumpre a especificação. **Validação** pergunta "estamos a construir o produto certo": o software resolve o problema do utilizador. Testar confirma a primeira; mostrar incrementos ao dono do produto e os testes de aceitação tratam da segunda. Sem as duas, ou o código está errado ou o produto é irrelevante.

Uma nota de âmbito: os testes unitários, que verificam funções e classes isoladas com asserts, são pré requisito que trazes de cadeiras anteriores, revê [hábitos de teste](/cadeiras/p/excecoes-testes/) se precisares. O programa desta cadeira concentra-se nos níveis acima: integração, sistema e aceitação.

## Níveis de teste

- **Integração.** Verificar que os módulos funcionam juntos: o início de sessão com a base de dados real, o registo de pedidos com o cálculo de totais. Apanha erros nas fronteiras, que é onde os módulos se desentendem sobre formatos e estados.
- **Sistema.** Verificar o produto completo num ambiente próximo do real: instalar a app, criar conta, iniciar sessão, registar pedidos, com dados realistas. Apanha o que só aparece com tudo ligado: desempenho, configurações, dependências externas.
- **Aceitação.** O cliente confirma que o produto serve, executando cenários acordados (**critérios de aceitação**). É validação pura: o software pode passar todos os testes técnicos e falhar aqui porque resolve o problema errado.

Cada nível precisa do anterior verde para fazer sentido: correr aceitação sobre integração partida é perder tempo a debater sintomas.

## Inspeções e análise estática

Nem tudo se testa a correr. As **inspeções** (ou revisões) são leituras sistemáticas de requisitos, desenho ou código por colegas que procuram defeitos com uma lista de verificação: requisitos ambíguos, erros de lógica, convenções violadas. Apanham o que os testes raramente apanham, como um requisito contraditório ou um desenho frágil.

A **análise estática** é a inspeção feita por ferramenta: o analisador lê o código sem o correr e acusa variáveis não usadas, caminhos impossíveis, possíveis fugas de recursos. Corre na CI, como viste na [construção](construcao-evolucao/), e trata-se como mais um teste que tem de passar: avisos ignorados acumulam-se até ninguém olhar para a lista.

## Registar defeitos

Um defeito bem registado reproduz-se por quem o lê. O registo mínimo tem: identificador, resumo, **severidade** (quanto dói: bloqueante, grave, menor, cosmético), **passos de reprodução** exatos com dados concretos, resultado obtido, resultado esperado e ambiente (versão, dispositivo). Severidade não é prioridade: um erro cosmético no ecrã de pagamento pode ter prioridade alta e severidade baixa. Confundir as duas baralha a discussão com o dono do produto.

:::warning[A armadilha do "funciona na minha máquina"]
"Na minha máquina passa" significa que o teste depende do ambiente, não que o defeito não existe. Passos de reprodução com dados concretos e ambiente registado transformam essa conversa num teste que falha em todo o lado. É a mesma disciplina dos [ficheiros e exceções](/cadeiras/fp/ficheiros-excecoes/): dados de entrada explícitos, comportamento observável.
:::

## Exercício: matriz, aceitação e um defeito

Para o início de sessão, com os requisitos R1 (iniciar sessão com email e palavra passe, sessão de 30 minutos) e R2 (95 por cento das respostas em menos de 2 segundos):

1. **Matriz de rastreabilidade.** Liga cada requisito aos seus testes numa tabela:

   | Requisito | Testes |
   |---|---|
   | R1, credenciais válidas | TI1 (integração com a base de dados), TS1 (fluxo completo na app) |
   | R1, conta bloqueada | TI2 (bloqueio após 5 tentativas), TA1 (aceitação do fluxo de bloqueio) |
   | R2, desempenho | TS2 (100 inícios de sessão, medir percentil 95) |

   Cada requisito tem pelo menos um teste; cada teste aponta para o requisito que verifica. Um requisito sem linha na matriz não está testado, por mais código que exista.
2. **Dois casos de aceitação.** Escreve no formato dado, quando e então: "Dado um utilizador registado com a conta ativa, quando inicia sessão com email e palavra passe corretos, então entra na app em menos de 2 segundos." E: "Dado um utilizador com 5 tentativas falhadas, quando tenta de novo, então vê a mensagem de conta bloqueada e recebe o email de recuperação." Repara que o dono do produto consegue ler e assinar isto sem saber programar: é essa a função da aceitação.
3. **Um defeito registado.** "D-14, grave. Ambiente: versão 1.3, Android 14. Passos: criar conta com o email `ana+loja@mail.com`, terminar sessão, iniciar sessão com o mesmo email. Obtido: erro genérico. Esperado: entrada na app. Suspeita: o sinal de adição não é escapado na pesquisa." Este registo permite a qualquer pessoa reproduzir, e a suspeita final é um palpite identificado como tal, não um diagnóstico disfarçado.

Com isto fecha o ciclo: os requisitos da [página de requisitos](requisitos-uml/) têm testes que os verificam, e os testes apontam para os requisitos que cobrem. Quando conseguires percorrer essa matriz nos dois sentidos sem falhas, percebeste verificação e validação.
