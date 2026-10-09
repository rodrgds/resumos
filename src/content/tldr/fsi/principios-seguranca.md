## Propriedades e ameaças

| Propriedade       | Regra                                                                                             |
| ----------------- | ------------------------------------------------------------------------------------------------- |
| Confidencialidade | Só entidades autorizadas conhecem a informação.                                                   |
| Integridade       | As alterações cumprem a política, incluindo correções autorizadas.                                |
| Disponibilidade   | O serviço continua utilizável quando necessário. Limitar pedidos pode preservá-lo.                |
| Autenticidade     | A entidade ou mensagem corresponde à origem que afirma ter.                                       |
| Responsabilização | Registos protegidos ligam ações a entidades; uma conta comprometida limita a atribuição à pessoa. |

- Um **ativo** tem valor; uma **ameaça** é uma causa potencial de dano; uma **vulnerabilidade** é a fraqueza que o permite.
- O **vetor** é o caminho de exploração. Um **controlo** reduz a probabilidade ou as consequências.
- Exemplo: notas são o ativo; escrita não autorizada é a ameaça; aceitar qualquer sessão é a fraqueza; o pedido ao endpoint é o vetor. Autorizar a conta sobre aquela pauta, no servidor, atua nessa fraqueza.

## Risco e perda esperada

Uma matriz qualitativa pode ordenar prioridades por probabilidade × impacto. As categorias não são probabilidades medidas: pontuação 6 não demonstra o dobro do risco de 3.

Num modelo de **um evento anual**, com probabilidade anual $p$ e perda $L$ por ocorrência:

$$E=pL,\qquad T=C+p_{\text{residual}}L.$$

$E$ é a perda esperada anual; $T$ inclui o custo anual $C$ do controlo. Com $p=0{,}1$, $L=20\,000$ euros, $C=500$ euros/ano e $p_{\text{residual}}=0{,}02$, temos $E=2\,000$ e $T=900$ euros/ano. A redução líquida é $1\,100$ euros/ano, não uma poupança garantida num ano concreto.

O risco pode ser reduzido, evitado, partilhado ou aceite explicitamente. Cópias ajudam a recuperar perdas; não desfazem divulgação. Revê estimativas quando o cenário muda.

## Política e hipóteses

- A **política** define o permitido; o **mecanismo** aplica-a.
- O modelo de confiança identifica componentes dos quais dependemos. O modelo de ameaça fixa adversários e capacidades; a fronteira de confiança marca a mudança de autoridade.
- Uma garantia só vale nas hipóteses do modelo. Testar entradas válidas não demonstra segurança contra entradas hostis.
- Privacidade inclui finalidade e metadados. Cifrar conteúdo não esconde necessariamente interlocutores, horários ou localização.

[Reconstruir a análise de risco](/cadeiras/fsi/principios-seguranca/#perda-esperada).
