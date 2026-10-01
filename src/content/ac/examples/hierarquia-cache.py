endereco = 0x12345678
bytes_linha = 64
conjuntos = 32
bloco = endereco // bytes_linha
print("deslocamento", endereco % bytes_linha)
print("indice", bloco % conjuntos)
print("etiqueta", hex(bloco // conjuntos))
print("inicio", hex(endereco - endereco % bytes_linha))
