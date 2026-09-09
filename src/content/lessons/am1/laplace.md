---
title: Transformada de Laplace
description: Definição, transformadas das funções elementares, propriedades de translação e derivação, inversão e resolução de EDOs.
section: conteudo
order: 11
---

A **transformada de Laplace** converte uma função $f(t)$ numa função $F(s)$ tal que derivar no tempo corresponde a multiplicar por $s$. Com isto, uma equação diferencial linear com condições iniciais vira uma equação algébrica, que se resolve e se transforma de volta. É uma máquina de resolver EDOs, não um truque isolado.

## Definição e primeiras transformadas

Para $f$ definida em $[0, \infty[$, a transformada é

$$
\mathcal{L}\{f(t)\} = F(s) = \int_0^{\infty} e^{-st} f(t)\,dt,
$$

sempre que o integral impróprio convirja (funções contínuas por partes e de ordem exponencial chegam).

Calculando diretamente: para $f(t) = 1$,

$$
\mathcal{L}\{1\} = \int_0^{\infty} e^{-st}\,dt = \frac{1}{s}, \quad s > 0.
$$

Para $f(t) = e^{at}$: $\int_0^{\infty} e^{-(s-a)t}\,dt = 1/(s-a)$ para $s > a$. E para potências, a integração por partes repetida dá $\mathcal{L}\{t^n\} = n!/s^{n+1}$. A linearidade, $\mathcal{L}\{af + bg\} = a\mathcal{L}\{f\} + b\mathcal{L}\{g\}$, estende isto a combinações: por exemplo,

$$
\mathcal{L}\{4t - 10\} = \frac{4}{s^2} - \frac{10}{s}.
$$

Duas transformadas a decorar para a prova: $\mathcal{L}\{\sin(\omega t)\} = \omega/(s^2+\omega^2)$ e $\mathcal{L}\{\cos(\omega t)\} = s/(s^2+\omega^2)$. As hiperbólicas seguem das exponenciais: como $\sinh(kt) = (e^{kt}-e^{-kt})/2$, vem $\mathcal{L}\{\sinh(kt)\} = k/(s^2-k^2)$.

## Propriedades operacionais

As propriedades que fazem a máquina funcionar:

- **Translação no tempo:** $\mathcal{L}\{f(t-a)u(t-a)\} = e^{-as}F(s)$, onde $u$ é o degrau unitário. Atrasar a função multiplica por exponencial.
- **Translação em $s$:** $\mathcal{L}\{e^{at}f(t)\} = F(s-a)$. Multiplicar por exponencial desloca a transformada.
- **Derivação no tempo:** $\mathcal{L}\{f'(t)\} = sF(s) - f(0)$, e em geral $\mathcal{L}\{f''(t)\} = s^2F(s) - sf(0) - f'(0)$. É aqui que entram as condições iniciais.
- **Multiplicação por $t$:** $\mathcal{L}\{t f(t)\} = -F'(s)$.
- **Funções periódicas:** se $f$ tem período $T$, $\mathcal{L}\{f\} = \frac{1}{1-e^{-sT}}\int_0^T e^{-st}f(t)\,dt$. Basta integrar num período.

A translação em $s$ calcula, por exemplo, $\mathcal{L}\{e^{-t}\sin t\}$: como $\mathcal{L}\{\sin t\} = 1/(s^2+1)$, deslocar $s$ para $s+1$ dá $1/((s+1)^2+1)$.

## Transformada inversa

Escrever $f = \mathcal{L}^{-1}\{F\}$ é desfazer a transformação, em geral por reconhecimento após decompor $F(s)$ em frações simples. Exemplo: para inverter $F(s) = 1/(3s-1)$, escreve $F(s) = \frac{1}{3}\cdot\frac{1}{s-1/3}$ e reconhece a exponencial:

$$
\mathcal{L}^{-1}\left\{\frac{1}{3s-1}\right\} = \frac{1}{3}e^{t/3}.
$$

Outro: $\mathcal{L}^{-1}\{1/(s^2+9)\} = \frac{1}{3}\sin(3t)$, porque $\mathcal{L}\{\sin 3t\} = 3/(s^2+9)$. O padrão é sempre o mesmo: manipula $F(s)$ até veres formas tabeladas.

## Resolver EDOs com Laplace

O procedimento tem três passos: transforma a equação (as condições iniciais entram automaticamente), resolve algebricamente para $Y(s)$ e inverte.

Exemplo completo: $y' + 2y = e^{-t}$ com $y(0) = 1$. Transformando:

$$
sY - 1 + 2Y = \frac{1}{s+1}, \qquad Y(s+2) = 1 + \frac{1}{s+1} = \frac{s+2}{s+1}.
$$

Logo $Y(s) = 1/(s+1)$ e, invertendo, $y(t) = e^{-t}$. Confirma: $y' + 2y = -e^{-t} + 2e^{-t} = e^{-t}$, com $y(0) = 1$. Certo. Repara como a condição inicial entrou na equação logo no primeiro passo, sem constantes $C$ a arrastar.

Para EDOs de segunda ordem o ganho é maior: $\mathcal{L}\{y''\}$ absorve $y(0)$ e $y'(0)$ de uma vez, e $Y(s)$ sai de uma equação do primeiro grau.

:::tip[Quando usar Laplace]
Se a EDO linear tem coeficientes constantes e condições iniciais dadas, Laplace é quase sempre o caminho mais curto. Se pede só a solução geral sem condições, os métodos da [página de EDOs](equacoes-diferenciais/) são equivalentes; escolhe o que te sai com menos erros.
:::

## Para onde ir

O último bloco da cadeira representa funções periódicas de outra forma, como soma de senos e cossenos: as [séries de Fourier](fourier/).
