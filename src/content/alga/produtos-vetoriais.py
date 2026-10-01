def cross(a, b):
    return (a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0])

def dot(a, b):
    return sum(x * y for x, y in zip(a, b))

u, v, w = (1, 1, 0), (0, 1, 1), (1, 2, 1)
print(cross(u, v))
print(dot(cross(u, v), w))
