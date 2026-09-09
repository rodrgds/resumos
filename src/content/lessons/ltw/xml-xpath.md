---
title: XML e XPath
description: Documentos bem formados, elementos e atributos, e consultas XPath com predicados.
section: conteudo
order: 8
---

O XML representa dados em texto com etiquetas: legível por pessoas, processável por máquinas e independente da linguagem. Nesta cadeira aparece como formato de troca e de configuração, e o XPath é a linguagem para ir buscar pedaços a um documento XML sem o percorrer à mão.

## Documentos bem formados

Um documento XML tem um elemento raiz único, etiquetas bem aninhadas e atributos entre aspas. O catálogo da mercearia em `catalogo.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<catalogo>
  <livro isbn="978-0-13-110362-7">
    <titulo>C Programming Language</titulo>
    <autor>Kernighan</autor>
    <preco>45.00</preco>
  </livro>
  <livro isbn="978-0-596-52068-7">
    <titulo>JavaScript: The Good Parts</titulo>
    <autor>Crockford</autor>
    <preco>25.00</preco>
  </livro>
</catalogo>
```

Cada `livro` é um elemento com um atributo (`isbn`) e três elementos filhos. A distinção entre atributo e elemento filho é uma decisão de modelação: atributos para identificadores e metadados curtos, elementos para conteúdo que pode crescer ou repetir-se. Ao contrário do HTML, o XML não perdoa: uma etiqueta por fechar ou mal aninhada invalida o documento inteiro. Valida sempre antes de culpares a consulta.

## Consultas XPath

O XPath navega na árvore com um caminho parecido com o dos ficheiros. Sobre o catálogo acima:

- `//livro` escolhe todos os elementos `livro`, em qualquer profundidade.
- `//livro/titulo` escolhe os títulos desses livros.
- `//livro[@isbn="978-0-596-52068-7"]` escolhe o livro com esse atributo.
- `//livro[preco<30]/titulo` escolhe os títulos dos livros com preço abaixo de 30, ou seja, "JavaScript: The Good Parts".

Os parênteses retos são predicados: condições que filtram os nós. Lê a última de dentro para fora: para cada `livro`, fica com os que têm `preco` menor que 30 e devolve o `titulo`. É a mesma ideia do `WHERE` do SQL que usaste no [PHP](php-dinamicas-bd/), aplicada a uma árvore em vez de uma tabela.

:::tip[Exercício por predicado]
Escreve a expressão que devolve os autores dos livros com preço superior a 40. Resposta: `//livro[preco>40]/autor`, que devolve "Kernighan". E para contar quantos são? Envolve com `count(...)`: `count(//livro[preco>40])` devolve `1`. Se a tua expressão devolver vazio, confirma os nomes das etiquetas e o aninhamento no documento antes de a reescreveres.
:::

## Quando usar XML

Usa XML quando o formato precisa de validação formal contra um esquema, de namespaces para misturar vocabulários ou de ferramentas de transformação. Para trocar dados simples entre o teu JavaScript e o teu PHP, o JSON da página de [HTTP](http-ajax-json/) é mais leve e direto. A relação entre os dois resume-se assim: JSON para dados que o programa consome, XML para documentos que precisam de contrato.
