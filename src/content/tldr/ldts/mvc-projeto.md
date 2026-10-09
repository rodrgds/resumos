## Responsabilidades de MVC

| Participante | Responsabilidade                                                             |
| ------------ | ---------------------------------------------------------------------------- |
| Model        | Guarda estado e protege invariantes do domínio, como os limites da arena.    |
| View         | Apresenta o estado e encaminha eventos. Não decide a validade de movimentos. |
| Controller   | Interpreta ações, pede operações ao modelo e coordena a apresentação.        |
| Montagem     | Escolhe implementações e liga os objetos.                                    |

O modelo deve poder funcionar sem Swing. Nesta variante, o controlador atualiza explicitamente a vista; noutras, a vista recebe notificações com Observer.

```text
Controlador --> Modelo
Controlador --> Vista <-- VistaTexto ou VistaSwing
```

## Mostrar o estado aceite

Numa arena de largura 5, as posições válidas são de 0 a 4. O herói começa em 2:

| Antes | Deslocamento | Destino pedido | Aceite? | Mostrado |
| ----- | ------------ | -------------- | ------- | -------- |
| 2     | +1           | 3              | Sim     | 3        |
| 3     | +2           | 5              | Não     | 3        |
| 3     | -1           | 2              | Sim     | 2        |

O modelo valida o destino e só altera `x` quando o aceita. Calcular `(long) x + deslocamento` evita overflow inteiro antes da validação; converte para `int` depois de verificar os limites.

O método do controlador usa as operações do modelo e da interface `Vista`:

```java
void mover(int deslocamento) {
    modelo.mover(deslocamento);
    vista.mostrar(modelo.getX());
}
```

Mostrar o destino pedido inventaria uma posição quando o movimento é recusado. No botão Swing, o listener apenas encaminha o pedido:

```java
somar.addActionListener(evento -> controlador.mover(1));
```

Operações curtas podem correr na EDT; trabalho demorado precisa de outra thread e regressa à EDT para atualizar componentes. [Implementação completa](/cadeiras/ldts/mvc-projeto/#seguir-uma-ação-completa).

## Testar e integrar

- Testa o modelo sem janela: construção inválida, movimentos aceites, ambos os limites e deslocamentos extremos. Uma recusa deve conservar a posição.
- Testa o controlador com uma vista em memória. Partindo de 4, pede `+1` e espera que a vista receba **4**. Este caso distingue estado aceite de destino pedido; movimentos válidos não distinguem os dois controladores.
- Testa a tradução da vista e os eventos que envia. Um teste da aplicação pode depois percorrer a ligação inteira.
- Em JUnit, usa `assertEquals`. A instrução Java `assert` só corre quando a JVM tem as asserções ativadas, por exemplo com `-ea`.

Começa por uma funcionalidade completa, da entrada à apresentação. Combina contratos, tipos e invariantes antes de dividir trabalho; integra cedo. Usa Command para guardar pedidos, Strategy para variar algoritmos ou State para reações por estado apenas quando essa mudança existe no projeto. O relatório deve justificar decisões com o código e evidência dos comportamentos preservados.
