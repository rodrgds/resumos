---
title: 'Fundamentos de Segurança Informática'
description: 'Como estudar a teoria, relacionar ataques com defesas e preparar os dois testes.'
section: conteudo
order: 0
editorial:
  basedOn: 2026/27
  sources:
    - title: Ficha oficial de FSI, 2026/27
      url: https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=586999
    - title: Moodle FSI, materiais iniciais atualmente publicados
      url: https://moodle2627.up.pt/course/view.php?id=4735
  coverage: 'Como estudar a teoria, relacionar ataques com defesas e preparar os dois testes.'
  gaps:
    - A apresentação Moodle tem capa de 2025/26 e mínimo 6/20, divergindo do mínimo 8/20 da ficha 2026/27.
    - Não foi possível comparar esta página com provas e critérios de correção de 2026/27.
---

Um sistema pode cifrar todos os dados e continuar vulnerável se entregar esses dados à pessoa errada. Em FSI vamos ligar cada propriedade de segurança às hipóteses, ao mecanismo que a protege e ao ataque que quebra essas hipóteses.

## O que deves conseguir resolver

Perante um cenário, identifica o ativo, a ameaça, a vulnerabilidade e a propriedade afetada. Depois explica como o ataque funciona, propõe uma defesa e diz o que essa defesa ainda deixa por resolver. Nos problemas com código, segue os dados controlados pelo atacante até à operação perigosa. Nos problemas de criptografia e permissões, escreve a regra antes de fazer a conta.

A sequência de leitura acompanha os temas do programa oficial:

1. [Princípios de segurança](/cadeiras/fsi/principios-seguranca/), risco e propriedades.
2. [Sistemas seguros](/cadeiras/fsi/sistemas-seguros/), isolamento e princípios de construção.
3. [Criptografia](/cadeiras/fsi/criptografia/) e [modos e protocolos](/cadeiras/fsi/modos-protocolos/), confidencialidade, autenticidade, chaves e PKI.
4. [Controlo de acessos](/cadeiras/fsi/controlo-acessos/), políticas, fluxos e Unix.
5. [Programação defensiva](/cadeiras/fsi/programacao-defensiva/), memória, entradas e concorrência.
6. [Segurança de redes](/cadeiras/fsi/seguranca-redes/), canais, filtragem, deteção e DoS.
7. [Segurança Web](/cadeiras/fsi/seguranca-web/), sessões, autorização e injeções.
8. [Modelar ameaças](/cadeiras/fsi/pensar-como-atacante/), aplicação conjunta destes conceitos.

## Avaliação em 2026/27

A [ficha oficial](https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=586999) define dois testes de teoria e trabalho laboratorial. Se $T_1$ e $T_2$ são as notas dos testes e $TL$ a nota laboratorial, todas de 0 a 20:

$$T=0{,}5T_1+0{,}5T_2,\qquad CF=0{,}6T+0{,}4TL.$$

Cada teste exige pelo menos **8/20**. Em recurso, cada metade conserva o máximo entre a nota do teste correspondente e a dessa metade do recurso. O corte da matéria entre os testes será indicado no Moodle. A frequência prática também é condição de aprovação.

A apresentação disponibilizada no Moodle ainda tem uma capa de 2025/26 e indica 6/20 por teste, divergindo da ficha de 2026/27. A fórmula e mínimos acima são os da ficha atual. Confirma os avisos de avaliação da equipa docente antes de planear a preparação.

## Treinar sem consultar a solução

Lê um exemplo, fecha-o e refaz o raciocínio. Resolve os exercícios no fim de cada página antes de abrir as pistas. Confere a explicação, incluindo as hipóteses e os limites da defesa, mesmo quando o valor numérico está certo. Usa a [cheat sheet](/cadeiras/fsi/folha-consulta/) para recordar regras já compreendidas.

Os exercícios aqui são originais e não reproduzem provas da cadeira. Os exemplos e os resumos cobrem o programa público; a lista exata de matéria e o formato dos testes dependem dos materiais e avisos da edição atual.

## Referências complementares

- [The Protection of Information in Computer Systems, de Saltzer e Schroeder](https://web.mit.edu/Saltzer/www/publications/protection/), para os princípios de construção de sistemas seguros.
- [PKCS #1, RFC 8017](https://datatracker.ietf.org/doc/html/rfc8017), para RSA, OAEP e PSS.
- [TLS 1.3, RFC 8446](https://datatracker.ietf.org/doc/html/rfc8446), para a negociação e proteção do canal.
