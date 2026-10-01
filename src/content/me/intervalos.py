from math import ceil, sqrt
from statistics import mean, stdev
from scipy import stats

x = [10.1, 10.3, 10.2, 10.4, 10.0]
n = len(x)
se = stdev(x) / sqrt(n)
q = stats.t.isf(0.025, n - 1)
print(f"n = {n}, média = {mean(x):.5f}, s = {stdev(x):.5f}")
print(f"IC t 95%: [{mean(x) - q * se:.5f}, {mean(x) + q * se:.5f}]")
for confianca in (0.95, 0.99):
    z = stats.norm.isf((1 - confianca) / 2)
    print(f"IC conhecido {confianca:.0%}: [{102 - z:.5f}, {102 + z:.5f}]")
print("n para margem 1.5 (z = 1.96):", ceil((1.96 * 8 / 1.5) ** 2))
print("n para erro padrão 1.5:", ceil((8 / 1.5) ** 2))
