## Domínio e inversas

- Impõe simultaneamente denominadores não nulos, radicandos pares não negativos e argumentos de logaritmos positivos.
- Em $f(g(x))$, exige $x\in D_g$ e $g(x)\in D_f$.
- Uma função injetiva admite inversa na sua imagem. $f^{-1}$ desfaz $f$, não significa $1/f$. $x^2$ só tem inversa depois de restringir o domínio, por exemplo a $[0,+\infty[$.

Para $\ln(x-1)/\sqrt{4-x}$, as condições são $x>1$ e $x<4$, logo o domínio é $]1,4[$.

## Trigonometria

Usa radianos. $\sin^2x+\cos^2x=1$ e $\tan x=\sin x/\cos x$, onde $\cos x\ne0$.

| Inversa                 | Domínio     | Valores principais |
| ----------------------- | ----------- | ------------------ |
| $\arcsin$               | $[-1,1]$    | $[-\pi/2,\pi/2]$   |
| $\arccos$               | $[-1,1]$    | $[0,\pi]$          |
| $\arctan$               | $\mathbb R$ | $]-\pi/2,\pi/2[$   |
| $\operatorname{arccot}$ | $\mathbb R$ | $]0,\pi[$          |

Assim, $\arcsin(\sin(3\pi/4))=\pi/4$. As [outras inversas e identidades](/cadeiras/am1/funcoes-limites/#trigonometria-e-funções-inversas) também exigem ramos definidos.

## Limites

Para um ponto de acumulação $a$ do domínio, $f(x)\to L$ significa que, para todo $\varepsilon>0$, existe $\delta>0$ tal que

$$
0<|x-a|<\delta\Longrightarrow |f(x)-L|<\varepsilon.
$$

- A condição vale para todos os $x$ do domínio nessa vizinhança. $\delta$ pode depender de $\varepsilon$, mas não de $x$.
- O limite não depende de $f(a)$. Se há domínio dos dois lados, o limite bilateral finito existe exatamente quando os laterais existem e coincidem.
- $1/x^2\to+\infty$ em zero; $1/x$ tem limites laterais de sinais opostos.

## Cálculo e continuidade

1. Substitui quando a expressão é contínua e definida no ponto.
2. Em $0/0$, tenta fatorizar ou racionalizar. No infinito, divide pelo termo dominante.
3. Usa confronto se $g\le f\le h$ e $g,h\to L$.

$$
\frac{x^2-4}{x-2}=x+2\quad(x\ne2),\qquad
\lim_{x\to2}\frac{x^2-4}{x-2}=4.
$$

Os limites fundamentais são $\sin x/x\to1$, $(e^x-1)/x\to1$ e $\ln(1+x)/x\to1$ em zero. Por exemplo, $\sin(3x)/x\to3$.

- **Continuidade em $a$:** $a$ pertence ao domínio e o limite é $f(a)$, usando o lado disponível num extremo.
- Contínua em $[a,b]$ implica máximo e mínimo atingidos e todos os valores entre $f(a)$ e $f(b)$ atingidos. Mudança de sinal garante uma raiz, mas não unicidade.
