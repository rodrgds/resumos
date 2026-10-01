from math import sqrt
from scipy import stats

n1, m1, s1 = 10, 20, 4
n2, m2, s2 = 15, 17, 5
a, b = s1 ** 2 / n1, s2 ** 2 / n2
se = sqrt(a + b)
gl = (a + b) ** 2 / (a ** 2 / (n1 - 1) + b ** 2 / (n2 - 1))
margem = stats.t.isf(0.025, gl) * se
print(f"Welch: SE={se:.6f}, gl={gl:.6f}")
print(f"IC 95%: [{m1 - m2 - margem:.6f}, {m1 - m2 + margem:.6f}]")
sp2 = ((n1 - 1) * s1 ** 2 + (n2 - 1) * s2 ** 2) / (n1 + n2 - 2)
sep = sqrt(sp2 * (1 / n1 + 1 / n2))
print(f"Variância comum estimada: {sp2:.6f}, SE ponderado: {sep:.6f}")
d = [2, 1, 3, 2, 4, 0]
resultado = stats.ttest_1samp(d, popmean=0)
ic = resultado.confidence_interval(confidence_level=0.95)
print(f"Pares: t={resultado.statistic:.6f}, valor-p={resultado.pvalue:.6f}")
print(f"IC das diferenças: [{ic.low:.6f}, {ic.high:.6f}]")
