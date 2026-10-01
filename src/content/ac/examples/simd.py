def empacotar(vias, bits=8):
    mascara = (1 << bits) - 1
    return sum((v & mascara) << (i * bits) for i, v in enumerate(vias))

def vias(valor, bits=8):
    return [(valor >> (i * bits)) & ((1 << bits) - 1)
            for i in range(32 // bits)]

def com_sinal(v, bits):
    return v - (1 << bits) if v & (1 << (bits - 1)) else v

a = [250, 2, 3, 4]
b = [10, 20, 30, 40]
print("ADD8", hex(empacotar([x + y for x, y in zip(a, b)])))
print("soma escalar", hex((empacotar(a) + empacotar(b)) & 0xFFFFFFFF))
mascara = [255 if com_sinal(x, 8) < 10 else 0 for x in [240, 10, 127, 128]]
print("SCMPLT8", vias(empacotar(mascara)))
