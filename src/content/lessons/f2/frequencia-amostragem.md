---
title: Frequência e amostragem
description: Resposta em frequência, filtros, teorema de Nyquist e aliasing.
section: conteudo
order: 8
---

Se a entrada de um SLIT for a sinusoide $e^{j\omega t}$, a saída é a mesma sinusoide multiplicada pela **resposta em frequência** $H(\omega)$, um número complexo que depende só de $\omega$. Todo o comportamento do sistema fica contido numa função de uma variável: o módulo $|H|$ diz quanto passa a cada frequência, o argumento diz o atraso de fase. É esta curva que desenhas quando caracterizas um filtro, e é ela que decide que frequências sobrevivem até à amostragem.

## Resposta em frequência do RC

Para o filtro RC passa-baixo da [página anterior](/cadeiras/f2/sistemas-lti/), com saída no condensador, o divisor de tensão em fasores dá

$$
H(\omega) = \frac{1}{1 + j\omega RC}, \qquad |H(\omega)| = \frac{1}{\sqrt{1 + (\omega RC)^2}}.
$$

Em $\omega = 0$ passa tudo ($|H| = 1$); quando $\omega \to \infty$ passa zero. A **frequência de corte** $f_c = 1/(2\pi RC)$ marca $|H| = 1/\sqrt{2} \approx 0{,}707$, a meia potência. Abaixo dela o sinal passa quase intacto, acima é atenuado a cerca de dez vezes por década de frequência.

Com $R = 1{,}0\ \text{k}\Omega$ e $C = 1{,}0\ \mu\text{F}$, $f_c = 1/(2\pi \times 10^{-3}) \approx 159{,}15\ \text{Hz}$. Calculado em Python só com o módulo `math`:

```python
import math
R = 1000.0
C = 1e-6
fc = 1 / (2 * math.pi * R * C)
for f in (50.0, 159.15, 500.0):
    h = 1 / math.hypot(1.0, 2 * math.pi * f * R * C)
    print(f"{f:6.1f} Hz -> |H| = {h:.3f}")
```

Saída:

```text
  50.0 Hz -> |H| = 0.954
 159.2 Hz -> |H| = 0.707
 500.0 Hz -> |H| = 0.303
```

(Verificado com CPython e só o módulo `math`; ficou por testar noutras implementações de Python indicadas pela cadeira.) Aos $50\ \text{Hz}$ passam $95\%$, no corte $71\%$ como previsto, e aos $500\ \text{Hz}$ sobram $30\%$. Um filtro **passa-alto** (saída na resistência) faz o espelho: bloqueia o contínuo e passa as altas.

## Amostragem e Nyquist

Medir um sinal contínuo em instantes espaçados de $T_s$ é **amostrar** à frequência $f_s = 1/T_s$. O **teorema de Nyquist** fixa o limite: para reconstruir um sinal com frequência máxima $f_{\text{máx}}$ precisas de $f_s > 2f_{\text{máx}}$. Amostrar devagar não dá um sinal "menos nítido", dá um sinal errado.

Porquê? Amostrar multiplica o espectro em cópias espaçadas de $f_s$. Se $f_s$ for pequena, as cópias sobrepõem-se e as frequências altas dobram-se sobre as baixas: é o **aliasing**. Uma sinusoide de frequência $f$ amostrada a $f_s$ (com $f$ entre $f_s/2$ e $f_s$) aparece como frequência $|f - f_s|$. O filtro anti-aliasing antes do conversor existe exatamente para matar as altas frequências antes que elas se disfarcem de baixas.

## Exemplo: sinusoide dobrada

Uma sinusoide de $3{,}0\ \text{kHz}$ amostrada a $f_s = 5{,}0\ \text{kHz}$. A frequência de Nyquist é $f_s/2 = 2{,}5\ \text{kHz}$, e $3{,}0 > 2{,}5$: há aliasing. A frequência aparente é $|3{,}0 - 5{,}0| = 2{,}0\ \text{kHz}$. No computador vês uma sinusoide perfeita de $2{,}0\ \text{kHz}$, indistinguível de uma original, e nenhum processamento posterior a desmascara. A cura seria amostrar acima de $6{,}0\ \text{kHz}$, ou filtrar tudo acima de $2{,}5\ \text{kHz}$ antes de amostrar. É por isto que o áudio de CD usa $44{,}1\ \text{kHz}$ para $20\ \text{kHz}$ audíveis: margem para o filtro anti-aliasing real, que nunca corta a pique.

:::warning[Aliasing não é ruído, é impostura]
O sinal com aliasing parece limpo e mede-se bem: está é na frequência errada. Sempre que uma medição digital mostra uma frequência suspeitamente baixa e estável, pergunta primeiro pela frequência de amostragem antes de culpar o sensor.
:::

## Para onde ir

Fecha o arco da cadeira: o campo gerou a onda, a onda confinou-se em circuito, o circuito virou sistema, e o sistema entrega amostras prontas a processar. Volta à [apresentação](index/) para rever o mapa, e treina cada passagem com números antes do mini-teste.
