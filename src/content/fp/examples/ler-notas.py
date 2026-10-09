with open("notas.txt", "w", encoding="utf-8") as ficheiro:
    ficheiro.write("12\n16\n")

with open("notas.txt", "r", encoding="utf-8") as ficheiro:
    notas = [int(linha.strip()) for linha in ficheiro]

print(notas)
print(sum(notas) / len(notas))
