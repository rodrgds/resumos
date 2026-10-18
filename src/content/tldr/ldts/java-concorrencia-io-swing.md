## Threads e estado partilhado

- Threads do mesmo processo partilham objetos, cada uma com a sua pilha. Concorrência é sobreposição possível, não paralelismo garantido.
- `start()` executa `run()` noutra thread; chamar `run()` é uma chamada normal. `join()` espera o fim; `sleep()` não sincroniza nada.
- `contador++` lê, soma e escreve: duas threads podem ler 0 e escrever 1, perdendo um incremento.
- `synchronized` exclui só pelo **mesmo monitor** e publica alterações entre libertar e adquirir. Método de instância usa `this`, estático usa o `Class`; dois objetos não partilham lock.
- `volatile` publica leituras e escritas, sem tornar `++` atómico. Para um contador isolado, `AtomicInteger.incrementAndGet()`.

## Espera e notificação

Espera sob o monitor que protege a condição:

```java
synchronized int retirar() throws InterruptedException {
    while (valor == null) wait();
    int resultado = valor;
    valor = null;
    notifyAll();
    return resultado;
}
```

- `wait()` liberta o monitor e suspende; ao acordar, readquire-o. Outra thread pode agir primeiro, por isso o `while` volta a testar. Há também despertares sem notificação.
- `notifyAll()` acorda interessados sem libertar o monitor nem reservar o valor. Dois consumidores para um valor: o segundo volta a esperar; com `if`, leria `null`.
- Para este padrão pronto, prefere uma `BlockingQueue`.
- `interrupt()` pede, não força. Sem propagar `InterruptedException`, repõe o sinal e termina de forma coerente. Vários locks adquirem-se sempre pela mesma ordem; secções curtas, sem I/O dentro.

## Bytes, texto e fecho

| Tipo                           | Trata                                        |
| ------------------------------ | -------------------------------------------- |
| `InputStream` / `OutputStream` | Bytes.                                       |
| `Reader` / `Writer`            | Texto.                                       |
| `InputStreamReader`            | Bytes para texto, com codificação explícita. |
| `BufferedReader`               | Buffer e leitura por linhas.                 |

`readLine()` dá `null` no fim; linha vazia é string. `DataInputStream` lê formato binário, não texto decimal. `try-with-resources` fecha mesmo com exceção; fechar o exterior fecha os envolvidos. Recurso em JAR lê-se com `getResourceAsStream`, verificando `null`.

## Swing e EDT

A **Event Dispatch Thread** trata eventos e redesenho. Listener demorado congela a interface.

| Momento            | Onde   | Tarefa                                      |
| ------------------ | ------ | ------------------------------------------- |
| Listener           | EDT    | Cria o worker, `execute()`, termina.        |
| `doInBackground()` | Worker | I/O ou cálculo, sem tocar em Swing.         |
| `done()`           | EDT    | `get()`, trata falha, atualiza componentes. |

`get()` no listener bloqueia de novo; `invokeLater` sozinho só adia. Layout managers posicionam; desenho próprio redefine `paintComponent` com `super.paintComponent(g)`, a partir do estado, com `repaint()`. `getGraphics()` não persiste entre redesenhos.

[Exemplos de threads, I/O e Swing](/cadeiras/ldts/java-concorrencia-io-swing/).
