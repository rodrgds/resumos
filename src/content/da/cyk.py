from cyk_apoio import mostrar_tabela_cyk

word = input().strip()
if not word or len(word) > 40 or any(c not in "ab" for c in word):
    print("entrada invalida")
else:
    terminal = {"a": {"A"}, "b": {"B"}}
    binary = [("S", "A", "B"), ("S", "A", "C"),
              ("B", "B", "A"), ("C", "A", "A")]
    n = len(word)
    table = {}
    for i, char in enumerate(word):
        table[i, 1] = set(terminal[char])
    for length in range(2, n + 1):
        for i in range(n - length + 1):
            found = set()
            for split in range(1, length):
                for parent, left, right in binary:
                    if left in table[i, split] and right in table[i + split, length - split]:
                        found.add(parent)
            table[i, length] = found
    mostrar_tabela_cyk(table, n)
    print("aceite" if "S" in table[0, n] else "rejeitada")
