---
title: HTTP, pedidos e Ajax
description: URIs, pedidos e respostas, cabeçalhos, REST, JSON e pesquisa com fetch sobre o PHP.
section: conteudo
order: 5
---

O navegador e o servidor conversam por HTTP: o cliente envia um pedido e o servidor devolve uma resposta. Cada clique, cada formulário e cada pesquisa com `fetch` é um pedido destes. Perceber o formato da conversa permite depurar os dois lados e desenhar interfaces limpas entre eles.

## Ler um pedido e uma resposta

Um pedido tem um método, um caminho, cabeçalhos e às vezes um corpo. Uma resposta tem um estado, cabeçalhos e um corpo. Eis a pesquisa da mercearia escrita à mão:

```
GET /pesquisa.php?q=queijo HTTP/1.1
Host: localhost:8000
Accept: application/json

HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 42

[{"nome":"Queijo da Serra","preco":8.5}]
```

A primeira linha do pedido diz o método (`GET`), o caminho com os parâmetros (`/pesquisa.php?q=queijo`) e a versão do protocolo. A primeira linha da resposta diz o estado: `200 OK` correu bem, `404` não encontrou, `500` partiu no servidor. O cabeçalho `Content-Type` diz em que formato vem o corpo, e o corpo traz os dados. Quando uma página falhar, abre o separador de rede das ferramentas de desenvolvimento e lê esta conversa: o estado e o corpo dizem de que lado está o erro antes de tocares no código.

Os métodos mais usados são `GET` para ler, `POST` para criar ou enviar formulários, `PUT` para substituir e `DELETE` para apagar. Regra prática: `GET` nunca altera nada no servidor, por isso é seguro repetir e marcar como favorito; tudo o que altera vai por `POST` ou pelos outros métodos.

## REST e JSON

Uma interface REST organiza o servidor por recursos com endereços estáveis: `GET /produtos` lista, `GET /produtos/3` lê um, `POST /produtos` cria. O formato de troca é quase sempre JSON, que é texto com a sintaxe dos objetos e arrays do JavaScript:

```json
{"nome": "Queijo da Serra", "preco": 8.5, "stock": true}
```

Em [PHP](php-dinamicas-bd/), uma página que devolve JSON em vez de HTML é um serviço que qualquer cliente consome: `echo json_encode($linhas);` com o cabeçalho `Content-Type: application/json`. Em JavaScript, `JSON.parse` transforma texto em objeto e `JSON.stringify` faz o inverso.

## Pesquisa com fetch sem recarregar

O `fetch` faz um pedido HTTP a partir do JavaScript e devolve uma promessa com a resposta. A pesquisa da mercearia filtra a lista sem recarregar a página:

```js
async function pesquisar(termo) {
    const r = await fetch('api.php?q=' + encodeURIComponent(termo));
    if (!r.ok) throw new Error('HTTP ' + r.status);
    const produtos = await r.json();
    const lista = document.querySelector('#resultados');
    lista.replaceChildren();
    for (const p of produtos) {
        const li = document.createElement('li');
        li.textContent = p.nome + ' : ' + p.preco + ' €';
        lista.append(li);
    }
}
document.querySelector('#q').addEventListener('input', (e) => {
    pesquisar(e.target.value).catch(() => {
        document.querySelector('#resultados').textContent =
            'Pesquisa indisponível.';
    });
});
```

O `encodeURIComponent` protege acentos e espaços no parâmetro. O `await` pausa a função até a resposta chegar sem bloquear a página. O teste `r.ok` apanha estados como 404 e 500 antes de tentar ler JSON que não existe. E o `catch` mostra uma mensagem em vez de deixar a lista antiga a fingir que está atualizada. Cada pedido destes aparece no separador de rede, onde confirmas o endereço, o estado e o corpo antes de culpares o código.

:::warning[O erro mais comum]
Esquecer que o `fetch` é assíncrono e usar `produtos` fora da função ou antes do `await`, onde ainda é uma promessa pendente. Tudo o que depende da resposta vive depois do `await`, dentro da mesma função assíncrona.
:::
