## Dedução natural e caixas

$\Gamma\vdash\varphi$ significa que há uma dedução de $\varphi$ a partir de $\Gamma$. Uma hipótese temporária só deixa de ser uma dependência ao ser descarregada pela regra que fecha a caixa.

- Linhas exteriores acessíveis podem usar-se dentro de uma caixa.
- Linhas de uma caixa fechada não podem usar-se diretamente fora dela.
- Caixas irmãs não partilham linhas internas. Uma regra pode citar as subdeduções completas.

## Regras de base

| Regra     | Uso                                                                             |
| --------- | ------------------------------------------------------------------------------- |
| $\land I$ | De $\varphi,\psi$, obter $\varphi\land\psi$                                     |
| $\land E$ | De $\varphi\land\psi$, obter um membro                                          |
| $\lor I$  | De $\varphi$, obter $\varphi\lor\psi$ ou $\psi\lor\varphi$                      |
| $\lor E$  | De $\varphi\lor\psi$ e dois casos que concluem a mesma $\theta$, obter $\theta$ |
| $\to E$   | De $\varphi\to\psi$ e $\varphi$, obter $\psi$                                   |
| $\to I$   | Assumir $\varphi$, deduzir $\psi$ e fechar para obter $\varphi\to\psi$          |
| $FI$      | De $\varphi,\neg\varphi$, obter a contradição $F$                               |
| $FE$      | De $F$, obter qualquer fórmula                                                  |
| $\neg I$  | Assumir $\varphi$, deduzir $F$ e fechar para obter $\neg\varphi$                |
| $\neg E$  | De $\neg\neg\varphi$, obter $\varphi$                                           |
| $R$       | Repetir uma fórmula acessível                                                   |

Aqui $\neg E$ elimina **dupla negação**, conforme a notação da cadeira. A redução ao absurdo, RA, assume $\neg\varphi$, deriva $F$ e conclui $\varphi$; abrevia $\neg I$ seguido de $\neg E$ quando é autorizada.

## Escolha da regra

A conetiva principal da conclusão orienta o fim da prova:

- Para uma conjunção, prova ambos os membros.
- Para uma implicação, assume o antecedente e procura o consequente.
- Para uma negação, assume a fórmula negada e procura $F$.
- Para uma disjunção, provar um dos membros chega.

Nas premissas, decompõe conjunções, fornece antecedentes às implicações e considera casos para disjunções. São orientações, não um algoritmo completo de procura.

Exemplo de prova por casos:

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

- Correção significa $\Gamma\vdash\varphi\Rightarrow\Gamma\models\varphi$.
- Completude significa $\Gamma\models\varphi\Rightarrow\Gamma\vdash\varphi$.

A DN clássica tem ambas. Um contraexemplo semântico impede uma dedução correta: $p=F,q=T$ refuta a tentativa de concluir $p$ de $p\to q,q$.

A equivalência dedutiva $\varphi\dashv\vdash\psi$ exige uma prova em cada direção.

[Provas em Fitch e laboratório de deduções](/cadeiras/md/provas-proposicionais/).
