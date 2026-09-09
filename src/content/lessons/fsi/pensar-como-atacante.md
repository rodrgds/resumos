---
title: Pensar como atacante
description: Modelo de ameaças completo de uma aplicação simples, com método reutilizável de tutoriais e CTF.
section: conteudo
order: 8
---

Todas as páginas anteriores ensinaram peças. Esta junta-as num método: como analisar um sistema desconhecido, ordenar o que atacar ou defender primeiro e registar o trabalho de forma reutilizável. É também o método que os tutoriais avaliados e os desafios CTF esperam ver no teu diário de bordo.

## Modelação de ameaças em cinco passos

A **modelação de ameaças** (_threat modeling_) é uma conversa estruturada sobre um sistema, feita antes ou durante a sua análise. Cinco perguntas chegam longe:

1. **O que proteger?** Lista os ativos: dados, serviços, reputação. Sem ativos, não há prioridades.
2. **Quem ataca?** Lista os atacantes plausíveis com as suas capacidades: o curioso sem meios, o cliente descontente, o criminoso organizado, o ex-funcionário com acessos antigos.
3. **Por onde entra?** Para cada ativo, enumera os vetores: formulários, anexos, rede exposta, suportes perdidos, pessoas enganadas.
4. **O que corre mal?** Descreve cenários concretos de falha, um por combinação relevante de atacante e vetor.
5. **O que fazer?** Propõe contramedidas, ordenadas pelo risco da [primeira página](principios-seguranca/): probabilidade vezes impacto, custo da medida e rapidez de aplicação.

O modelo nunca está acabado: cada descoberta nos tutoriais atualiza-o. Um vetor que julgavas fechado e afinal está aberto reordena as prioridades, e registar essa mudança é parte do trabalho.

## O método nos tutoriais e nos CTF

Perante um desafio novo, resiste ao impulso de experimentar comandos ao acaso:

1. **Reconhece.** Lê o enunciado e explora o ambiente: que sistema é, que serviços respondem, que entradas aceitam. Aponta tudo antes de tocar.
2. **Formula uma hipótese.** "Este formulário ecoa a entrada, logo testo XSS refletido." Uma hipótese diz o que esperas observar, o que distingue um teste de uma tentativa cega.
3. **Testa em ambiente próprio.** Só na tua máquina virtual ou no alvo oficial do desafio. Começa pelo caso benigno, depois pelo caso hostil mínimo.
4. **Regista comando, saída e conclusão.** "Corri X, observei Y, por isso Z." O diário de bordo é a tua memória externa e a prova do trabalho nos tutoriais avaliados.
5. **Verifica a correção.** Depois de explorar, aplica a defesa e confirma que o ataque deixa de funcionar sem partir o uso legítimo. Atacar sem propor defesa é metade do exercício.

## Exemplo: modelo de ameaças da loja em linha

Aplica os cinco passos à loja da [apresentação](index/), que vende em linha e guarda dados de clientes:

| Ativo                       | Atacante plausível                 | Vetor                     | Cenário                                          | Contramedida (página)                                                                                                              |
| --------------------------- | ---------------------------------- | ------------------------- | ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| Dados de clientes e cartões | criminoso organizado               | formulário de registo     | injeção SQL devolve a tabela inteira             | consultas parametrizadas e conta só de leitura ([Segurança Web](/cadeiras/fsi/seguranca-web/))                                     |
| Preços e stock              | concorrente ou cliente malicioso   | painel de administração   | palavra-passe fraca permite alterar preços       | chaves SSH, sem `root` remoto, papéis por função ([Controlo de acessos](controlo-acessos/))                                        |
| Disponibilidade do site     | extorsionista                      | rede exposta              | SYN flood ou avalanche HTTP na véspera de saldos | fila gerida, limitação de débito, filtragem a montante ([Segurança de redes](seguranca-redes/))                                    |
| Cópias de segurança         | ex-funcionário com acessos antigos | pasta partilhada          | leitura de arquivos com dados de clientes        | utilizador próprio, arquivos cifrados, acessos revogados ([Criptografia](criptografia/), [Controlo de acessos](controlo-acessos/)) |
| Código da aplicação         | fornecedor ou erro interno         | dependência desatualizada | biblioteca vulnerável abre execução remota       | atualizações e validação de entradas ([Programação defensiva](programacao-defensiva/))                                             |

Para reutilizares, copia a tabela e preenche-a para o teu alvo: uma linha por ativo, sem linhas decorativas. Se uma célula te obrigar a inventar, marca-a como dúvida e vai verificar ao sistema em vez de a fechar com imaginação. O modelo vale pela honestidade, não pelo tamanho.

:::warning[Só em alvos legítimos]
Todo este método pressupõe autorização: a tua máquina virtual, os tutoriais da cadeira, as plataformas de CTF. Aplicar reconhecimento, testes ou exploração a sistemas de terceiros sem permissão explícita é crime, por mais educativo que pareça o objetivo. Em caso de dúvida, pergunta ao docente antes de correres o primeiro comando.
:::
