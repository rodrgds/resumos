---
title: Escalabilidade e o caso DNS
description: Replicação, partição e cache, com a resolução de um nome passo a passo.
section: conteudo
order: 8
---

Escalabilidade é a capacidade de servir mais carga acrescentando recursos, sem redesenhar o sistema. Depois de distribuir o trabalho e tolerar falhas, esta página fecha a cadeira com as técnicas que fazem sistemas crescerem e com o exemplo maior de todos, o DNS.

## As três técnicas básicas

A **replicação** põe cópias dos mesmos dados ou serviços em várias máquinas. Ganha-se disponibilidade e capacidade de leitura, paga-se com a necessidade de manter as cópias coerentes. A **partição** (_sharding_) divide os dados em fatias, cada uma entregue a um grupo de máquinas. Ganha-se capacidade de escrita e de armazenamento, paga-se com operações que atravessam fatias. A **cache** guarda respostas recentes perto de quem pergunta, com um prazo de validade (TTL). Ganha-se velocidade e alívio nos servidores, paga-se com dados potencialmente desatualizados dentro do TTL.

Quase todos os sistemas grandes combinam as três, e o DNS mostra como.

## Exemplo completo

Resolução de `www.exemplo.pt` por um resolvedor que parte de cache vazia:

1. O resolvedor pergunta a um servidor **raiz** quem serve `.pt`. Os raiz são poucos, replicados por anycast em centenas de locais, e respondem só com a referência para os servidores de `.pt`.
2. Pergunta a um servidor de `.pt` quem serve `exemplo.pt`. A zona `.pt` está particionada por sufixo, por isso estes servidores só sabem dos domínios `.pt`, uma fatia do espaço total.
3. Pergunta ao servidor **autoritativo** de `exemplo.pt` qual o endereço de `www.exemplo.pt` e recebe a resposta final.
4. Guarda cada resposta em cache pelo seu TTL. O próximo pedido igual resolve-se localmente, sem nenhum pacote na rede.

Onde está a escalabilidade: a hierarquia distribui a carga, porque os raiz só apontam e nunca resolvem nomes finais. A partição por zona divide o espaço de nomes pelo mundo. A cache absorve a repetição, porque poucos nomes concentram a maioria dos pedidos. Nenhum servidor precisa de conhecer o sistema todo, e é por isso que o DNS escala para milhares de milhões de consultas diárias.

:::tip[Como pensar em teste]
Perante "como escala este sistema", procura as três técnicas pelo nome. Réplicas para ler mais e sobreviver a falhas, partição para guardar mais e escrever mais, cache com TTL para repetir barato. Depois identifica o preço de cada uma, coerência, operações entre fatias e dados temporariamente velhos.
:::
