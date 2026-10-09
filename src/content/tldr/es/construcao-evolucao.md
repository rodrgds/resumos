## Ambiente e versões

- Um **ambiente reproduzível** regista versões, dependências, serviços, configuração de exemplo e preparação de dados de teste. Segredos e dados pessoais não pertencem ao repositório.
- **Commit:** alteração compreensível; **branch:** linha separada; **merge:** integração de linhas; **tag:** identificação de um estado, frequentemente publicado.
- Um pedido de integração explica mudança, razão, efeitos e evidência. Ausência de conflitos textuais não garante compatibilidade de comportamento.

Uma alteração de limite de 120 para 180 minutos exige acompanhar requisito, regra, mensagens, testes de fronteira, documentação e entrega. Integra passos pequenos para descobrir incompatibilidades cedo.

## CI, entrega e implantação

| Conceito                | Garantia pretendida                                                               |
| ----------------------- | --------------------------------------------------------------------------------- |
| Integração contínua, CI | Integrar frequentemente e verificar automaticamente o estado combinado            |
| Continuous delivery     | Manter o produto entregável, com preparação automatizada e decisão de implantação |
| Continuous deployment   | Implantar automaticamente as mudanças que passam os critérios                     |
| DevOps                  | Aproximar desenvolvimento e operação, incluindo entrega, observação e recuperação |

Um pipeline verde prova apenas os checks executados na revisão e ambiente indicados. Um artefacto construído não é uma versão já em uso nem demonstra validação de necessidades omitidas.

O plano de recuperação inclui **dados, compatibilidade e migrações**. Repor o executável antigo pode falhar se a versão nova tiver escrito dados num formato incompatível.

## Manutenção e legado

| Tipo       | Motivo e exemplo                                                          |
| ---------- | ------------------------------------------------------------------------- |
| Corretiva  | Corrigir defeito, como reservas duplicadas                                |
| Adaptativa | Responder ao ambiente, como uma nova API                                  |
| Perfetiva  | Melhorar ou acrescentar capacidade, como recorrência                      |
| Preventiva | Reduzir problemas futuros, como remover duplicação preservando resultados |

O motivo distingue os tipos: mudar 120 para 180 é perfetivo se a regra mudou, corretivo se o requisito sempre exigiu 180. Uma alteração pode ter vários motivos.

- **Evolução:** acrescentar ou alterar capacidades. **Servicing:** manter operação com correções e adaptação, sem novas funcionalidades. **Phase-out:** ainda usado, mas sem alterações. **Retirada:** termina o uso, com plano para dados e substituição.
- Um **legado** ainda tem valor, apesar de dificuldades de manutenção. Decide manter, transformar, substituir ou retirar conforme valor de negócio e qualidade técnica. Descobre regras escondidas e dados históricos antes de substituir.

## Desenvolvimento assistido por IA

A equipa responde pelas sugestões aceites e pela evidência. Código plausível pode omitir concorrência ou usar APIs inexistentes. Testes precisam de **oráculos independentes**: implementação e expectativa geradas a partir da mesma regra errada podem concordar.

Não partilhes segredos ou dados privados. Regista sugestões, decisões e verificações; confirma as regras docentes de declaração de uso. Divide mudanças por objetivo e risco para que a revisão acompanhe a geração.

[Entrega e recuperação de versões](/cadeiras/es/construcao-evolucao/#entrega-e-implantação).
