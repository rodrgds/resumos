## Divisão e primos

Para $a,b\in\mathbb Z$, $b\ne0$:

$$
a=bq+r,\qquad 0\le r<|b|.
$$

O resto é não negativo mesmo com dividendo negativo. A relação $b\mid a$ significa $a=bq$ com $q\in\mathbb Z$. Todo o inteiro não nulo divide zero.

- Se $d\mid a$ e $d\mid b$, então $d\mid(ua+vb)$ para quaisquer $u,v\in\mathbb Z$.
- Um primo é $p>1$ com divisores positivos só $1$ e $p$. O número 1 não é primo nem composto.
- A fatorização de $n>1$ é única salvo a ordem. Os expoentes mínimos dão o mdc; os máximos dão o mmc.
- Para $a,b>0$, $\gcd(a,b)\operatorname{mmc}(a,b)=ab$.
- Se $p$ é primo e $p\mid ab$, então $p\mid a$ ou $p\mid b$.

Há infinitos primos: qualquer divisor primo de $p_1\cdots p_k+1$ fica fora da lista. O produto mais 1 não tem de ser primo.

## Euclides

O mdc é o maior divisor positivo comum, para inteiros não ambos zero. $\gcd(a,0)=|a|$ quando $a\ne0$.

1. Divide $a=bq+r$.
2. Substitui $(a,b)$ por $(b,r)$, com o mesmo mdc.
3. Repete até resto zero. O último resto não nulo é o mdc.
4. Retrocede nas igualdades para Bézout: $\gcd(a,b)=ua+vb$ com $u,v\in\mathbb Z$.

Para 252 e 198, os restos são $54,36,18,0$ e $18=4\cdot252-5\cdot198$.

Primos entre si têm mdc 1. Combinação linear igual a 1 prova coprimalidade, mesmo com parâmetro inteiro.

Para $a,b>0$ e $d=\gcd(a,b)$, $ax+by=c$ tem solução inteira se e só se $d\mid c$. A partir de $(x_0,y_0)$:

$$
x=x_0+\frac bd t,\qquad y=y_0-\frac ad t,\qquad t\in\mathbb Z.
$$

Bézout não garante coeficientes naturais. Para naturais impõe $x,y\ge0$. $18x+30y=6$ tem $(2,-1)$, mas nenhuma não negativa.

## Congruências

Para $m>0$, $a\equiv_m b$ significa $m\mid(a-b)$, ou seja igual resto. Podes somar, subtrair e multiplicar no mesmo módulo.

- O inverso de $c$ módulo $m$ existe se e só se $\gcd(c,m)=1$. Se $uc+vm=1$, então $u$ é um inverso. Para $m>1$, o zero não tem inverso.
- Para cancelar com $d=\gcd(c,m)$: $ca\equiv_m cb$ equivale a $a\equiv_{m/d}b$. Só com $d=1$ mantém o módulo original.

$2\cdot2\equiv_6 2\cdot5$ só autoriza $2\equiv_3 5$ depois de dividir o módulo.

## Equações lineares

Para $ax\equiv_m b$:

1. Calcula $d=\gcd(a,m)$. Há solução se e só se $d\mid b$.
2. Divide $a,b,m$ por $d$.
3. Inverte o coeficiente módulo $m/d$ e obtém $x\equiv_{m/d}x_0$.
4. No módulo original lista as $d$ classes $x_0+k(m/d)$, com $0\le k<d$.

$6x\equiv_{14}8$ reduz a $3x\equiv_7 4$, logo $x\equiv_7 6$. Em $\mathbb Z_{14}$ as soluções são 6 e 13. $6x\equiv_{14}9$ não tem solução.

## Fermat

Se $p$ primo e $p\nmid a$, então $a^{p-1}\equiv_p1$ e $a^{-1}\equiv_p a^{p-2}$.

Para $3^{100}\bmod7$, reduz o expoente: $100=16\cdot6+4$, logo $3^{100}\equiv_7 3^4\equiv_7 4$. Não uses estas fórmulas para módulo composto sem outra justificação.

[Euclides, Bézout e equações modulares](/cadeiras/md/inteiros-congruencias/).
