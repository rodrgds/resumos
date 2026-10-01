def contar_inferiores(valores, limite):
    total = 0
    grupos = len(valores) // 4
    for g in range(grupos):
        grupo = valores[4*g:4*g + 4]
        mascara = [255 if x < limite else 0 for x in grupo]
        total += sum(x & 1 for x in mascara)
    total += sum(x < limite for x in valores[4*grupos:])
    return total

for valores, limite in [([], 0), ([-3, 0, 5, -8, 2], 0), ([-1]*1024, 0)]:
    resultado = contar_inferiores(valores, limite)
    assert resultado == sum(x < limite for x in valores)
    print(resultado)
