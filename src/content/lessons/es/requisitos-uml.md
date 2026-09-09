---
title: Requisitos de software
description: Tipos de requisitos, elicitação até validação, casos de uso em UML e protótipos.
section: conteudo
order: 4
---

Um requisito é uma afirmação sobre o que o sistema deve fazer ou sobre uma restrição que deve respeitar. Todo o resto do projeto (desenho, código, testes) responde a estes textos. Requisitos vagos produzem discussões infinitas; requisitos precisos produzem testes que passam ou falham.

## Tipos de requisitos

- **Funcionais.** O que o sistema faz: "o sistema permite iniciar sessão com email e palavra passe". Cada requisito funcional descreve uma interação observável do utilizador com o sistema.
- **Não funcionais.** Restrições sobre como o sistema se comporta: desempenho, segurança, usabilidade, fiabilidade. "O início de sessão deve ser rápido" não é um requisito, é um desejo. "95 por cento dos inícios de sessão concluem-se em menos de 2 segundos" é um requisito, porque se consegue testar.
- **De domínio.** Regras do mundo onde o sistema vive: "as palavras passe guardam-se transformadas por uma função de dispersão com sal" ou "a conta bloqueia após 5 tentativas falhadas". Muitas vezes o cliente nem os menciona porque os acha óbvios, e é aí que moram os mal entendidos.

Quando leres um enunciado, classifica cada frase nestes três tipos antes de fazer seja o que for. Metade dos erros em exercícios de requisitos nasce de tratar uma restrição como funcionalidade ou de aceitar um "rápido" sem número.

## Da elicitação à validação

Trabalhar requisitos tem quatro atividades:

1. **Elicitação.** Descobrir o que as partes interessadas precisam: entrevistas, observação do trabalho real, questionários. Pergunta sempre pelo problema antes da solução.
2. **Análise.** Resolver conflitos (dois utilizadores que pedem coisas opostas), detetar omissões e ordenar por valor e risco.
3. **Especificação.** Escrever os requisitos de forma clara, completa e testável, com identificadores para os referenciar (R1, R2, ...).
4. **Validação.** Confirmar que os requisitos dizem o que o cliente quer: revisões com o cliente, protótipos, e a pergunta de ouro, "como testarias isto". Um requisito sem teste imaginável volta para trás.

## Casos de uso em UML

Um **diagrama de casos de uso** mostra quem usa o sistema e para quê. Tem **atores** (bonecos de palha: utilizador, administrador, sistema externo), **casos de uso** (elipses: ações com valor para o ator) e relações (linhas ator a caso de uso; `<<include>>` para comportamento sempre partilhado; `<<extend>>` para comportamento opcional). Para o início de sessão:

```
Utilizador ---- (Iniciar sessão)
                  <<include>>
              (Validar credenciais)

(Recuperar palavra passe) ..<<extend>>.. (Iniciar sessão)
Administrador ---- (Desbloquear conta)
```

Lê-se assim: o utilizador inicia sessão, o que inclui sempre validar credenciais; recuperar a palavra passe é uma extensão opcional desse fluxo; o administrador desbloqueia contas. Cada elipse depois precisa de uma descrição textual: pré condições, fluxo principal e fluxos alternativos (palavra passe errada, conta bloqueada).

## Protótipos de interface

Antes de programar ecrãs, desenha um **protótipo**: um esboço do ecrã de início de sessão com os campos, os botões e as mensagens de erro. Pode ser em papel. O objetivo é validar requisitos com o cliente quando ainda é barato mudar: discutir "onde aparece o erro de conta bloqueada" sobre um desenho demora minutos; discutir sobre código pronto demora dias e cria resistência a mudar.

:::warning[O erro mais comum]
Descrever a solução em vez do requisito: "o sistema usa uma tabela de dispersão para as sessões" não é um requisito, é uma decisão de desenho disfarçada. O requisito é "o sistema mantém a sessão ativa durante 30 minutos de inatividade". Guarda o "como" para a arquitetura.
:::

## Exercício: escrever requisitos e o diagrama

Escreve para o início de sessão da app:

1. **Um requisito funcional (R1).** "O sistema permite a um utilizador registado iniciar sessão com o seu email e palavra passe, mantendo a sessão ativa durante 30 minutos de inatividade." Repara: quem, o quê e a condição de sessão numa frase.
2. **Um requisito não funcional mensurável (R2).** "95 por cento das tentativas de início de sessão recebem resposta em menos de 2 segundos, e as palavras passe nunca são guardadas em texto claro." Tem número, percentagem e uma proibição verificável.
3. **O diagrama de casos de uso.** Desenha os atores (Utilizador, Administrador) e os casos (Iniciar sessão, Validar credenciais com `<<include>>`, Recuperar palavra passe com `<<extend>>`, Desbloquear conta). Depois valida cada elipse com a pergunta de ouro: consegues imaginar o teste que a verifica? "Validar credenciais" testa-se com pares válidos e inválidos; "Recuperar palavra passe" testa-se pedindo o email de recuperação. Se algum caso não tiver teste imaginável, o requisito está incompleto.

Antes de desenhares classes para estes conceitos, revê [classes, construtores e encapsulamento](/cadeiras/p/classes-objetos/): os diagramas de classes da próxima página assentam nessas ideias. A página seguinte é [Arquitetura e desenho](arquitetura-desenho/).
