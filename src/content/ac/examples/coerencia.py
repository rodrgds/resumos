parciais = [sum(range(i*10, (i+1)*10)) for i in range(10)]
print(parciais)
while len(parciais) > 1:
    seguinte = []
    for i in range(0, len(parciais), 2):
        seguinte.append(parciais[i] + parciais[i+1]
                        if i+1 < len(parciais) else parciais[i])
    parciais = seguinte
    print(parciais)
assert parciais[0] == sum(range(100))
