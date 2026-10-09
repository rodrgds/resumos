## Divisibilidade e primos

Para $a,b\in\mathbb Z$, $b\ne0$, a divisão tem quociente e resto únicos:

$$
a=bq+r,\qquad 0\le r<|b|.
$$

O resto é não negativo mesmo para dividendos negativos. $b\mid a$ significa $a=bq$ para algum inteiro $q$. Nesta cadeira, o divisor é não nulo. Todo o inteiro não nulo divide zero.

Se $d\mid a,d\mid b$, então $d\mid(ua+vb)$ para quaisquer $u,v\in\mathbb Z$.

Um primo é um inteiro $p>1$ com divisores positivos apenas $1,p$. O 1 não é primo nem composto. A fatorização em primos de um inteiro positivo maior que 1 é única salvo a ordem.

- Na fatorização, expoentes mínimos dão o mdc e máximos dão o mmc.
- Para $a,b>0$, $\gcd(a,b)\operatorname{mmc}(a,b)=ab$.
- Se $p$ é primo e $p\mid ab$, então $p\mid a$ ou $p\mid b$. A condição de primalidade é necessária.

Há infinitos primos: qualquer divisor primo de $p_1\cdots p_k+1$ fica fora da lista $p_1,\ldots,p_k$. O produto mais 1 não tem de ser primo.

## Euclides e Bézout

O mdc é o maior divisor positivo comum, para inteiros não ambos zero. $\gcd(a,0)=|a|$ quando $a\ne0$.

1. Divide $a=bq+r$.
2. Substitui $(a,b)$ por $(b,r)$, que tem o mesmo mdc.
3. Repete até resto zero. O último resto não nulo é o mdc.
4. Retrocede nas igualdades para obter Bézout:

$$
\gcd(a,b)=ua+vb,\qquad u,v\in\mathbb Z.
$$

Para 252 e 198, os restos são $54,36,18,0$ e $18=4\cdot252-5\cdot198$.

São primos entre si quando o mdc é 1. Uma combinação linear igual a 1 prova coprimalidade, inclusive para expressões com um parâmetro inteiro.

## Congruência, inversos e cancelamento

Para $m>0$, $a\equiv_m b$ significa $m\mid(a-b)$, ou igual resto módulo $m$. Podes somar, subtrair e multiplicar congruências do mesmo módulo.

Um inverso de $c$ módulo $m$ existe se e só se $\gcd(c,m)=1$. Se $uc+vm=1$, então $u$ é inverso. Para $m>1$, zero não tem inverso.

Cancelar um fator não invertível pode mudar o módulo. Com $d=\gcd(c,m)$:

$$
ca\equiv_m cb\Longleftrightarrow a\equiv_{m/d}b.
$$

Assim, $2\cdot2\equiv_6 2\cdot5$ só dá $2\equiv_3 5$, não congruência módulo 6.

## Congruências lineares

Para resolver $ax\equiv_m b$:

1. Calcula $d=\gcd(a,m)$. Existe solução **se e só se $d\mid b$**.
2. Divide $a,b,m$ por $d$.
3. Inverte o coeficiente módulo $m/d$ e obtém $x\equiv_{m/d}x_0$.
4. No módulo original, lista as $d$ classes: $x_0+k(m/d)$, para $0\le k<d$.

$6x\equiv_{14}8$ reduz-se a $3x\equiv_7 4$, logo $x\equiv_7 6$. Em $\mathbb Z_{14}$, as soluções são 6 e 13. $6x\equiv_{14}9$ não tem solução.

## Pequeno teorema de Fermat

Se $p$ é primo e $p\nmid a$, então $a^{p-1}\equiv_p1$ e $a^{-1}\equiv_p a^{p-2}$.

Para $3^{100}\bmod7$, reduz o expoente: $100=16\cdot6+4$, logo $3^{100}\equiv_7 3^4\equiv_7 4$. Não uses estas fórmulas para módulo composto sem outra justificação.

[Euclides, Bézout e equações modulares](/cadeiras/md/inteiros-congruencias/).
