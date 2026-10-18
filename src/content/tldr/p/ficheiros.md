## Abrir e fechar

- `ifstream` lê. `ofstream` escreve e substitui por defeito. `app` acrescenta.
- Caminho relativo parte da pasta de trabalho, não da fonte.
- Confirma abertura. Fecha com `close()` e confirma escrita. O destrutor fecha mas não trata o erro final.
- Ficheiros correm localmente. O executor do navegador não cria ficheiros.

## Condição certa do ciclo

```cpp
while (entrada >> nome >> nota) {
    // os dois campos saíram bem
}
```

- `eof()` indica que o fim foi encontrado. Não prevê a próxima leitura.
- `while (!eof())` pode repetir o último registo.
- `fail()` sinaliza falha de uma operação ou conversão; fica também
  verdadeiro quando `badbit` está ativo. `bad()` sinaliza falha grave.
  Podem coexistir.
- Depois de falha, `clear()` mais consumir a causa. Só limpar pode prender o ciclo.

## Um registo por linha

Quando o formato exige linha completa, lê a linha e interpreta à parte.

1. `getline` lê a linha, com espaços interiores.
2. Extrai nome e nota num `istringstream` novo.
3. Rejeita se falta campo, se sobra texto ou se a nota sai de `0` a `20`.

| Linha                      | Resultado         |
| -------------------------- | ----------------- |
| `Ana 15`                   | Válida            |
| `Ana`, vazia               | Falta campo       |
| `Eva 12abc`, `Leo 12 lixo` | Sobra texto       |
| `Eva 21`                   | Fora do intervalo |

- Fluxo novo por linha isola falhas.
- Ficheiro vazio não dá registo. Linha `Ana` dá registo incompleto a rejeitar.
- `binary` evita conversões de texto. Não define formato portátil. Memória bruta de struct depende de padding e ordem de bytes.

[Validação por linhas](/cadeiras/p/ficheiros/#separar-linhas-e-registos).
