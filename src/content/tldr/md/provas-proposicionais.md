## Caixas e âmbito

- $\Gamma\vdash\varphi$ significa que há dedução de $\varphi$ a partir de $\Gamma$.
- Cada hipótese temporária só sai através **da regra que fecha a sua caixa**. Fechar remove a dependência dessa hipótese.
- Linhas exteriores acessíveis podem entrar numa caixa. Linhas de uma caixa fechada não saem diretamente. Caixas irmãs não partilham linhas internas.

## Regras

| Regra     | Uso                                                                   |
| --------- | --------------------------------------------------------------------- |
| $\land I$ | de $\varphi,\psi$ obtém $\varphi\land\psi$                            |
| $\land E$ | de $\varphi\land\psi$ obtém um membro                                 |
| $\lor I$  | de $\varphi$ obtém $\varphi\lor\psi$ ou $\psi\lor\varphi$             |
| $\lor E$  | de $\varphi\lor\psi$ e dois casos com a mesma $\theta$ obtém $\theta$ |
| $\to E$   | de $\varphi\to\psi$ e $\varphi$ obtém $\psi$                          |
| $\to I$   | assume $\varphi$, deduz $\psi$, fecha e obtém $\varphi\to\psi$        |
| $FI$      | de $\varphi,\neg\varphi$ obtém $F$                                    |
| $FE$      | de $F$ obtém qualquer fórmula                                         |
| $\neg I$  | assume $\varphi$, deduz $F$, fecha e obtém $\neg\varphi$              |
| $\neg E$  | de $\neg\neg\varphi$ obtém $\varphi$                                  |
| $R$       | repete fórmula acessível                                              |

$\neg E$ aqui elimina dupla negação, na notação da cadeira. RA assume $\neg\varphi$, deriva $F$ e conclui $\varphi$; abrevia $\neg I$ mais $\neg E$ quando autorizada.

## Escolha do passo

Olha primeiro para a conetiva principal da conclusão:

- Conjunção: prova ambos os membros.
- Implicação: assume o antecedente e procura o consequente.
- Negação: assume a fórmula e procura $F$.
- Disjunção: prova um dos membros.

Depois olha para as premissas: decompõe conjunções, fornece antecedentes e considera casos para disjunções. São orientações, não um algoritmo completo.

Exemplo por casos para $(p\land q)\lor(q\land r)\vdash q$:

```text
1  (p ∧ q) ∨ (q ∧ r)    premissa
2  | p ∧ q              hipótese
3  | q                  ∧E, 2
4  | q ∧ r              hipótese de outra caixa
5  | q                  ∧E, 4
6  q                    ∨E, 1, 2 a 3, 4 a 5
```

Ambas as caixas acabam em $q$. O $p$ do primeiro caso não fica disponível depois da linha 6.

## Correção e completude

- Correção: $\Gamma\vdash\varphi$ implica $\Gamma\models\varphi$.
- Completude: $\Gamma\models\varphi$ implica $\Gamma\vdash\varphi$.

A DN clássica tem ambas. Um contraexemplo semântico impede dedução correta: $p=F,q=T$ refuta concluir $p$ de $p\to q,q$.

$\varphi\dashv\vdash\psi$ exige prova em cada direção.

[Provas em Fitch e laboratório de deduções](/cadeiras/md/provas-proposicionais/).
