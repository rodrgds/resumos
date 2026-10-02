---
title: Funções, limites e continuidade
description: Domínio, inversas, radianos, limites laterais, indeterminações e continuidade antes de derivar.
section: conteudo
order: 1
---

Antes de calcular uma derivada ou um integral, precisamos de saber onde a função existe e o que acontece perto dos pontos problemáticos. Nesta página revemos as ferramentas de pré-cálculo usadas nas contas seguintes.

## Domínio e composição

Uma função $f:D\to\mathbb R$ atribui a cada $x$ do domínio $D$ um único valor $f(x)$. A imagem é o conjunto dos valores realmente atingidos. Para encontrar o domínio de uma expressão real, impõe todas as condições ao mesmo tempo:

- Um denominador não pode ser zero.
- Uma raiz de índice par exige radicando não negativo.
- Um logaritmo exige argumento positivo.
- Numa composição $f(g(x))$, $x$ deve pertencer ao domínio de $g$ e $g(x)$ ao domínio de $f$.

Por exemplo, em $f(x)=\ln(x-1)/\sqrt{4-x}$, o logaritmo exige $x>1$ e a raiz no denominador exige $x<4$. O domínio é $]1,4[$. Não podemos testar limites pela esquerda de $1$ dentro deste domínio.

Se $f$ for injetiva, valores diferentes de entrada dão valores diferentes de saída. A inversa $f^{-1}$ desfaz a aplicação de $f$ e tem como domínio a imagem de $f$. O símbolo $f^{-1}$ não significa $1/f$.

## Trigonometria e funções inversas

Nos cálculos diferenciais usamos **radianos**. Uma volta mede $2\pi$ radianos. O ponto da circunferência unitária correspondente ao ângulo $x$ é $(\cos x,\sin x)$, por isso

$$
\sin^2x+\cos^2x=1,\qquad \tan x=\frac{\sin x}{\cos x}.
$$

A tangente só existe quando $\cos x\ne0$. Também usamos $\cot x=\cos x/\sin x$, $\sec x=1/\cos x$ e $\csc x=1/\sin x$, nos domínios em que os denominadores não se anulam.

As funções trigonométricas não são injetivas em todo o domínio. Para definir as inversas escolhemos uma restrição:

| Inversa                  | Domínio     | Valores da inversa |
| ------------------------ | ----------- | ------------------ |
| $\arcsin x$              | $[-1,1]$    | $[-\pi/2,\pi/2]$   |
| $\arccos x$              | $[-1,1]$    | $[0,\pi]$          |
| $\arctan x$              | $\mathbb R$ | $]-\pi/2,\pi/2[$   |
| $\operatorname{arccot}x$ | $\mathbb R$ | $]0,\pi[$          |

Adotamos $\operatorname{arccot}x=\pi/2-\arctan x$. Assim, $\arcsin(\sin x)=x$ apenas no intervalo principal. Por exemplo, $\arcsin(\sin(3\pi/4))=\pi/4$, porque o arco-seno devolve um valor entre $-\pi/2$ e $\pi/2$.

As identidades $\sin(2x)=2\sin x\cos x$ e $\cos(2x)=1-2\sin^2x=2\cos^2x-1$ vão permitir simplificar integrais. Lembra também que $\ln(ab)=\ln a+\ln b$ exige $a,b>0$ e que $\ln(a+b)$ não se separa.

## O que significa um limite

Escrever $\lim_{x\to a}f(x)=L$ diz que os valores de $f(x)$ ficam tão perto de $L$ quanto quisermos quando $x$ está suficientemente perto de $a$, com $x\ne a$. O valor $f(a)$ pode ser diferente ou nem existir.

Precisamente, para todo $\varepsilon>0$ existe $\delta>0$ tal que, para todo $x$ no domínio,

$$
0<|x-a|<\delta\quad\Longrightarrow\quad |f(x)-L|<\varepsilon.
$$

**Exemplo: provar que $\lim_{x\to2}(3x+1)=7$.** Queremos que a distância entre $3x+1$ e $7$ seja menor do que um $\varepsilon>0$ arbitrário. Simplificando essa distância,

$$
|(3x+1)-7|=|3x-6|=3|x-2|.
$$

Assim, precisamos de $|x-2|<\varepsilon/3$. Dado qualquer $\varepsilon>0$, escolhemos $\delta=\varepsilon/3>0$. Para todo $x\in\mathbb R$ tal que $0<|x-2|<\delta$, temos

$$
|(3x+1)-7|=3|x-2|<3\delta=\varepsilon.
$$

A escolha de $\delta$ depende de $\varepsilon$, não de $x$, e funciona para todos os pontos dessa vizinhança. Isto prova o limite pela definição.

O limite pela esquerda usa $x<a$; o limite pela direita usa $x>a$. Se há domínio dos dois lados, o limite existe e é finito se e só se ambos os limites laterais existem e são iguais. Para $f(x)=|x|/x$, os limites em zero são $-1$ e $1$. O limite bilateral não existe.

Um limite infinito descreve crescimento sem limite, não um número para substituir numa conta. Por exemplo, $1/x^2\to+\infty$ quando $x\to0$, mas $1/x$ tende para $-\infty$ pela esquerda e $+\infty$ pela direita.

## Calcular sem L'Hôpital

Se a função é contínua no ponto e a expressão continua definida depois da substituição, substitui diretamente. Nas formas $0/0$, procura primeiro fatorização ou racionalização.

Para $x\ne2$,

$$
\frac{x^2-4}{x-2}=\frac{(x-2)(x+2)}{x-2}=x+2.
$$

Logo o limite em $2$ é $4$, embora a expressão inicial não esteja definida em $2$. Cancelar o fator permite estudar a vizinhança, não acrescenta o ponto ao domínio original.

Com raízes, o conjugado elimina a subtração:

$$
\lim_{x\to0}\frac{\sqrt{1+x}-1}{x}
=\lim_{x\to0}\frac{1}{\sqrt{1+x}+1}=\frac12.
$$

No infinito, divide pelo termo dominante. Por exemplo,

$$
\lim_{x\to+\infty}\frac{3x^2-x+1}{2x^2+4}=\frac32.
$$

Se $g(x)\le f(x)\le h(x)$ perto de $a$ e $g,h\to L$, o **teorema do confronto** dá $f\to L$. Como $|x\sin(1/x)|\le|x|$, temos $x\sin(1/x)\to0$.

Os limites fundamentais, com ângulos em radianos, são

$$
\lim_{x\to0}\frac{\sin x}{x}=1,\quad
\lim_{x\to0}\frac{e^x-1}{x}=1,\quad
\lim_{x\to0}\frac{\ln(1+x)}x=1.
$$

Por mudança de variável, $\sin(3x)/x=3\sin(3x)/(3x)\to3$. A forma $0/0$ apenas indica que ainda falta trabalhar. Não tem valor igual a zero.

## Continuidade

Uma função é contínua em $a$ quando $a$ pertence ao domínio e $\lim_{x\to a}f(x)=f(a)$. Num extremo do domínio, usamos o limite do lado disponível. Polinómios são contínuos em $\mathbb R$; racionais, exponenciais, logaritmos e funções trigonométricas são contínuos nos seus domínios.

Para tornar contínua a função

$$
f(x)=\begin{cases}(x^2-4)/(x-2),&x\ne2,\\k,&x=2,\end{cases}
$$

calculamos primeiro o limite, que é $4$, e escolhemos $k=4$.

Se $f$ é contínua em $[a,b]$, atinge máximo e mínimo nesse intervalo, pelo teorema de Weierstrass. Também atinge todos os valores entre $f(a)$ e $f(b)$, pelo teorema do valor intermédio. Assim, $x^3+x-1$ tem uma raiz em $]0,1[$, pois os valores nos extremos são $-1$ e $1$. O teorema garante existência; a unicidade exige outro argumento, que veremos com a derivada.
