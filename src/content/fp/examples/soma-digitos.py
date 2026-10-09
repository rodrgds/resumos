n = int(input())
soma = 0
while n > 0:
    soma += n % 10
    n //= 10
print(soma)
