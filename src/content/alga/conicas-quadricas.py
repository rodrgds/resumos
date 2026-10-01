from math import sqrt

for x, y in [(1, 1), (2, 1), (0, 0), (3, -1)]:
    u = (x + y - 2) / sqrt(2)
    v = (x - y) / sqrt(2)
    original = 2*x*x + 2*x*y + 2*y*y - 6*x - 6*y + 3
    transformada = 3*u*u + v*v - 3
    print((x, y), original, round(transformada, 10))
