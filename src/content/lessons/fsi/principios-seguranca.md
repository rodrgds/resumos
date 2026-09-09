---
title: Princípios de segurança e gestão de risco
description: Tríade confidencialidade, integridade e disponibilidade, ameaças, vulnerabilidades e matriz de risco resolvida.
section: conteudo
order: 1
---

Antes de defenderes um sistema, precisas de dizer o que estás a defender, de quem e contra o quê. Esta página dá-te o vocabulário para isso: três propriedades a proteger, três perguntas para avaliar cada cenário e uma matriz para decidir onde gastar o esforço primeiro.

## A tríade: confidencialidade, integridade, disponibilidade

Quase todos os objetivos de segurança cabem em três propriedades, a tríade CIA (_confidentiality, integrity, availability_).

- **Confidencialidade**: só quem tem autorização vê os dados. Parte-se com uma fuga, como a lista de clientes copiada por um ex-funcionário.
- **Integridade**: os dados e o sistema não são alterados sem autorização. Parte-se com uma adulteração, como preços modificados na base de dados da loja.
- **Disponibilidade**: os utilizadores legítimos conseguem usar o sistema quando precisam. Parte-se com uma indisponibilidade, como o site em baixo no dia de maior faturação.

Repara que cada propriedade pede mecanismos diferentes. Cifrar o disco protege a confidencialidade, mas não impede que o site caia. Cópias de segurança recuperam a disponibilidade, mas não impedem a fuga. Quando analisares um incidente, começa sempre por classificar qual dos três pilares falhou, porque isso escolhe a família de defesas.

## Risco, ameaça, vulnerabilidade

Um **ativo** é o que queres proteger: dados de clientes, o servidor, a reputação da loja. Uma **ameaça** é quem ou o que pode causar dano: um atacante externo, um funcionário descuidado, uma falha de disco. Uma **vulnerabilidade** é o ponto fraco que a ameaça aproveita: uma palavra-passe fraca, um programa desatualizado, uma porta aberta. O **vetor de ataque** é o caminho: um anexo de correio, um formulário Web, uma pen esquecida.

O **risco** combina a probabilidade de a ameaça explorar a vulnerabilidade com o impacto se isso acontecer:

$$
\text{risco} = \text{probabilidade} \times \text{impacto}
$$

Na prática da cadeira, usa uma escala simples de 1 a 3 (baixo, médio, alto) para cada fator e multiplica. Valores de 1 a 2 são risco baixo, 3 a 4 são risco médio e 6 a 9 são risco alto. O número não é uma medição física, é uma forma de ordenar prioridades com transparência: dois analistas com a mesma tabela chegam à mesma fila de trabalho.

Os **mecanismos de segurança** são as contramedidas: cifragem, autenticação, permissões, cópias, registos. Cada mecanismo baixa a probabilidade ou o impacto de um risco concreto. Segurança nunca elimina o risco, gere-o até um nível aceitável com o orçamento disponível.

## Exemplo: matriz de risco resolvida

Avalia dois cenários da loja em linha com a escala de 1 a 3.

**Cenário A: portátil da contabilidade perdido no comboio.** O disco não tem cifragem e guarda faturas com dados de clientes. Ameaça: quem encontrar o portátil, por curiosidade ou má-fé. Vulnerabilidade: disco legível por quem tiver o aparelho na mão. Probabilidade média (2): portáteis perdem-se todos os anos. Impacto alto (3): dados pessoais de clientes, com dever legal de notificação. Risco: $2 \times 3 = 6$, alto. Medida: cifragem total do disco. Com o disco cifrado, perder o aparelho continua a custar dinheiro, mas a confidencialidade mantém-se, e o impacto cai para baixo.

**Cenário B: SSH com palavra-passe fraca exposto na Internet.** O servidor aceita `root` com uma palavra-passe curta e se encontra numa gama que robôs varrem continuamente. Ameaça: varrimento automático. Vulnerabilidade: autenticação fraca numa conta privilegiada. Probabilidade alta (3): este varrimento chega em minutos, não em dias. Impacto alto (3): acesso total ao servidor da loja. Risco: $3 \times 3 = 9$, o mais alto da matriz. Medida: autenticação só com chaves, conta `root` sem acesso remoto e firewall a limitar a porta. Cada medida ataca um fator diferente: as chaves baixam a probabilidade de adivinhação para perto de zero.

| Cenário | Probabilidade | Impacto | Risco | Medida |
| ------- | ------------- | ------- | ----- | ------ |
| A: portátil perdido | 2 (média) | 3 (alto) | 6 (alto) | cifragem total do disco |
| B: SSH fraco exposto | 3 (alta) | 3 (alto) | 9 (alto) | chaves, sem `root` remoto, firewall |

O cenário B resolve-se primeiro. Repara ainda que a mesma pontuação pode esconder histórias diferentes: um $2 \times 3$ e um $3 \times 2$ valem ambos 6, mas um pede medidas contra o impacto e o outro contra a probabilidade. A matriz ordena, não decide sozinha: o custo e a rapidez de cada medida entram na decisão final.

:::tip[O erro mais comum]
Confundir ameaça com vulnerabilidade. "Um _hacker_" é uma ameaça; "o formulário aceita código" é a vulnerabilidade. A defesa atua sempre sobre a vulnerabilidade, porque não controlas a ameaça. Se a tua medida proposta tenta mudar o atacante em vez do sistema, volta atrás.
:::

:::details[Para onde vão estes riscos]
Cada risco alto desta matriz transforma-se numa tarefa nas próximas páginas: o portátil perdido motiva a [criptografia](criptografia/), o SSH fraco motiva o [controlo de acessos](controlo-acessos/) e a [segurança de redes](seguranca-redes/). Quando estudares cada mecanismo, pergunta a que linha da matriz ele responde.
:::
