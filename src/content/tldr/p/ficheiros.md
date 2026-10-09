## Abertura e escrita

- `ifstream` lê; `ofstream` escreve e, por defeito, substitui o conteúdo existente. `std::ios::app` acrescenta ao fim.
- Caminhos relativos partem da pasta de trabalho do processo, não da pasta da fonte.
- Confirma abertura e escrita. O destrutor fecha o ficheiro, mas não trata erros finais; usa `close()` explícito e verifica o estado quando precisas de os detetar.

```cpp
std::ofstream saida("notas.txt");
if (!saida) { /* tratar falha de abertura */ }
else {
    saida << "Ana 15\nRui 12\n";
    saida.close();
    if (!saida) { /* tratar falha de escrita */ }
}
```

Fecha a escrita antes de ler o ficheiro. Os programas de ficheiros correm localmente; o executor C++ do navegador não cria ficheiros.

## Ler pelo resultado da operação

```cpp
while (entrada >> nome >> nota) {
    // Os dois campos foram extraídos.
}
```

Não uses `while (!entrada.eof())`: `eof()` relata que uma operação anterior encontrou o fim, sem prever o sucesso da seguinte. Esse ciclo pode usar um registo incompleto ou repetir valores anteriores.

| Estado   | Significado                                        |
| -------- | -------------------------------------------------- |
| `fail()` | Falha de operação ou conversão, incluindo `badbit` |
| `bad()`  | Falha grave de I/O                                 |
| `eof()`  | Uma operação encontrou o fim                       |

Estados podem coexistir. Depois de uma falha, `clear()` limpa os indicadores, mas também tens de consumir ou corrigir a entrada problemática para haver progresso. `ignore(..., '\n')` pode descartar o resto da linha.

## Validar um registo por linha

`>>` ignora espaços e fins de linha. Se o formato exige um registo por linha, lê com `getline` e interpreta num novo `istringstream`.

Contrato do exemplo: nome sem espaços, inteiro de `0` a `20`, sem campos extra; permite espaços iniciais e finais.

```cpp
bool registo_valido(const std::string& linha) {
    std::istringstream registo(linha);
    std::string nome, extra;
    int nota = 0;
    if (!(registo >> nome >> nota)) return false;
    if (registo >> extra) return false;
    return 0 <= nota && nota <= 20;
}
```

Inclui `<sstream>` e `<string>`. A função confirma extração, ausência de sobra e domínio, nesta ordem.

| Linha                        | Resultado                  |
| ---------------------------- | -------------------------- |
| `Ana 15` ou `Rui 20   `      | Válida                     |
| `Ana` ou linha vazia         | Falta um campo             |
| `Eva 12abc` ou `Leo 12 lixo` | Sobra texto após o inteiro |
| `Eva 21`                     | Fora do intervalo          |

O fluxo novo isola falhas entre linhas. Um ficheiro vazio não produz registos; a linha `Ana` produz um registo incompleto que precisa de rejeição. Nomes com espaços exigem outro formato definido.

## Formatos binários

`std::ios::binary` evita transformações de texto da plataforma, mas não define o formato. Memória bruta de uma struct depende de padding, ordem dos bytes e representação dos tipos. Um formato portátil especifica esses aspetos e a codificação.

[Validação completa de cada linha](/cadeiras/p/ficheiros/#separar-linhas-e-registos).
