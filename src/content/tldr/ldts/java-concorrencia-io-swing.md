## Threads e estado partilhado

Uma thread tem a sua pilha de chamadas e pode partilhar objetos com outras threads do processo. Concorrência permite tarefas avançarem em períodos sobrepostos, sem garantir execução paralela.

- `start()` inicia a thread que executará `run()`. Chamar `run()` diretamente executa na thread atual.
- `join()` espera pelo fim; não inicia a thread. `sleep()` não prova que outra tarefa terminou.
- `contador++` lê, soma e escreve. Se duas threads lerem 0 antes de escrever, ambas podem escrever 1, perdendo um incremento.
- `synchronized` protege secções pelo **mesmo monitor** e estabelece visibilidade entre libertação e aquisição desse monitor. Locks distintos não protegem um campo partilhado entre si.

Um método de instância sincronizado usa `this`; um método estático usa o objeto `Class`. Incrementar e consultar o contador exigem coordenação coerente. `volatile` dá garantias de visibilidade, mas não torna `valor++` atómico; para um contador isolado, `AtomicInteger.incrementAndGet()` é uma alternativa.

## Espera e notificação

Sob o monitor que protege a condição, espera enquanto ela não permite avançar:

```java
synchronized int retirar() throws InterruptedException {
    while (valor == null) wait();
    int resultado = valor;
    valor = null;
    notifyAll();
    return resultado;
}
```

Este método pertence a uma caixa cujo campo `Integer valor` é também alterado sob o mesmo monitor pelo produtor.

- `wait()` liberta o monitor e suspende; antes de continuar, readquire-o.
- `notifyAll()` acorda interessados, mas não liberta imediatamente o monitor nem reserva o valor.
- Dois consumidores podem acordar para um único valor. Depois de o primeiro retirar, o segundo tem de voltar ao `while` e esperar. `if` deixá-lo-ia continuar com a caixa vazia.
- Uma `BlockingQueue` costuma evitar implementar esta coordenação à mão.

`interrupt()` pede interrupção, não termina à força. Se capturas `InterruptedException` sem a propagar, normalmente restaura o sinal com `Thread.currentThread().interrupt()` e termina coerentemente. Para evitar ciclos de deadlock entre vários locks, adquire-os numa ordem comum e evita operações bloqueantes enquanto os deténs.

## Bytes, texto e fecho

| Tipos                          | Dados tratados                                  |
| ------------------------------ | ----------------------------------------------- |
| `InputStream` / `OutputStream` | Bytes.                                          |
| `Reader` / `Writer`            | Texto.                                          |
| `InputStreamReader`            | Descodifica bytes com uma codificação definida. |
| `BufferedReader`               | Acrescenta buffer e leitura por linhas.         |

Escolhe UTF-8 explicitamente quando esse é o formato. `readLine()` devolve `null` no fim; uma linha vazia continua a ser uma string. `DataInputStream` lê um formato binário, não números em texto decimal.

`try-with-resources` fecha também quando a leitura ou conversão falha. Fechar o leitor exterior fecha os recursos envolvidos. Recursos de `src/main/resources` podem estar num JAR: usa `getResourceAsStream` e verifica `null`, em vez de assumir um ficheiro normal.

## Swing e EDT

A **Event Dispatch Thread** processa eventos e alterações da interface. Um listener demorado bloqueia eventos e redesenho.

| Momento            | Thread e tarefa                                                          |
| ------------------ | ------------------------------------------------------------------------ |
| Listener           | EDT: cria `SwingWorker`, chama `execute()` e termina.                    |
| `doInBackground()` | Worker: faz I/O ou cálculo demorado, sem tocar em componentes Swing.     |
| `done()`           | EDT: obtém o resultado com `get()`, trata falhas e atualiza componentes. |

Chamar `get()` no listener durante o trabalho volta a bloquear. `invokeLater` sozinho só adia o trabalho na EDT.

Usa layout managers. Para desenho personalizado, redefine `paintComponent`, chama `super.paintComponent(g)` e desenha a partir do estado; pede atualização com `repaint()`. `getGraphics()` não mantém um desenho entre redesenhos.

[Exemplos de threads, I/O e Swing](/cadeiras/ldts/java-concorrencia-io-swing/).
