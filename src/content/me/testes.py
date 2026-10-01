from scipy import stats

media, s, n, mu0 = 98.5, 2, 16, 100
se = s / n ** 0.5
t = (media - mu0) / se
gl = n - 1
print(f"t = {t:.6f}; graus de liberdade = {gl}")
print(f"Valor-p bilateral: {2 * stats.t.sf(abs(t), gl):.6f}")
print(f"Valor-p à esquerda: {stats.t.cdf(t, gl):.6f}")
print(f"Valor-p à direita: {stats.t.sf(t, gl):.6f}")
margem = stats.t.isf(0.025, gl) * se
print(f"IC bilateral 95%: [{media - margem:.6f}, {media + margem:.6f}]")
