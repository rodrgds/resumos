---
title: Fundamentos de Segurança Informática
description: Modelação de ameaças, criptografia, acessos, programação defensiva e segurança Web, com método de atacante.
section: conteudo
order: 0
---

Fundamentos de Segurança Informática é a cadeira onde deixas de perguntar "funciona?" e passas a perguntar "como é que isto parte?". Vais aprender a pensar como atacante para depois construíres defesas: modelar ameaças, cifrar e assinar dados, controlar acessos, escrever código que resista a entradas maliciosas e proteger redes e aplicações Web. O trabalho prático corre em máquinas virtuais, com tutoriais e desafios de segurança.

Imagina uma loja em linha, a mesma que vais reencontrar na última página. Três incidentes diferentes mostram as três propriedades que a segurança protege. Se alguém copia a lista de clientes com números de cartão, falha a **confidencialidade**. Se alguém altera os preços ou o stock, falha a **integridade**. Se o site cai na véspera da Black Friday, falha a **disponibilidade**. Cada pilar parte-se de forma diferente e defende-se de forma diferente, e esta distinção organiza a cadeira inteira.

## Como está organizado

Começa por [Princípios de segurança e gestão de risco](principios-seguranca/), com a tríade confidencialidade, integridade e disponibilidade, e uma matriz de risco resolvida para dois cenários. Depois, [Princípios de construção de sistemas seguros](sistemas-seguros/) redesenha um serviço com permissões a mais, aplicando privilégio mínimo, isolamento e defesa em profundidade.

A seguir vêm os mecanismos. [Criptografia simétrica, assimétrica e PKI](criptografia/) cifra, assina e verifica uma cadeia de certificados até à raiz, com um exemplo RSA em números pequenos que podes confirmar à mão. [Controlo de acessos e fluxos](controlo-acessos/) resolve uma tabela de permissões Unix, incluindo um caso que nega acesso por defeito.

A segunda metade é ataque e defesa na prática. [Programação defensiva e overflows](programacao-defensiva/) explora um `strcpy` vulnerável em C e corrige-o com validação e limites. [Segurança de redes e negação de serviço](seguranca-redes/) lê um registo de acessos que revela um DoS simples e justifica a contramedida. [Segurança Web: sessões e autenticação](seguranca-web/) mostra um XSS refletido e uma injeção SQL mínima, cada um com a sua correção. Fecha com [Pensar como atacante: método e projeto](pensar-como-atacante/), que junta tudo num modelo de ameaças completo e reutilizável.

## Como estudar

Estuda com mentalidade de atacante: perante cada mecanismo, pergunta primeiro como o contornarias e só depois como o reforçarias. Refaz cada ataque destas páginas na tua máquina virtual, nunca em sistemas alheios. Atacar sem autorização é crime, mesmo com boas intenções, e os tutoriais da cadeira existem exatamente para teres alvos legítimos.

Mantém um diário de bordo (_logbook_): para cada experiência, regista o comando, a saída e a conclusão. "Corri X, observei Y, por isso Z" é o formato que os tutoriais avaliados pedem e é também a forma mais rápida de perceberes onde o teu raciocínio falhou. Quando um ataque não funcionar, lê a saída com calma antes de tentar outra coisa: a mensagem de erro indica quase sempre o passo errado.

## Avaliação

Segundo a ficha de 2025/26, a avaliação é distribuída e sem exame final: um Teste conta 60 por cento e o Trabalho laboratorial 40 por cento, com a classificação final $CF = 0{,}6 \times T + 0{,}4 \times TL$.[^avaliacao] Na época normal, $T = 0{,}5 \times T1 + 0{,}5 \times T2$, há mínimo de 6 valores em cada teste, e o trabalho laboratorial faz-se em grupo nas aulas práticas, de frequência obrigatória. As regras mudam de ano para ano, por isso confirma sempre a ficha da unidade curricular no SIGARRA e a página da disciplina no Moodle.

[^avaliacao]: Pesos, mínimos e fórmula da nota final segundo a ficha da unidade curricular de Fundamentos de Segurança Informática, ocorrência de 2025/26, consultada em setembro de 2026 e ligada na secção de fontes.

## Fontes e âmbito

Estas páginas seguem o âmbito da unidade curricular de Fundamentos de Segurança Informática (L.EIC021) do 3.º ano, 1.º semestre da LEIC, ocorrência de 2025/26: princípios de segurança e risco, construção de sistemas seguros, criptografia, controlo de acessos, programação defensiva, segurança de redes e segurança Web. O software de trabalho é o VirtualBox, para correr os ambientes laboratoriais isolados.

Material oficial da FEUP:

- Ficha da unidade curricular de Fundamentos de Segurança Informática, ocorrência de 2025/26, com objetivos, programa, bibliografia e avaliação (consultada em setembro de 2026): [SIGARRA](https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=560106).
