## Responsabilidades e extensão

- **SRP:** separa razões independentes para mudar. `Pontos` protege a regra de pontuação, `PontuacoesFicheiro` trata formato e escrita, `PontosVista` trata apresentação. Não é uma classe por método.
- **OCP:** escolhe uma variação concreta e mantém estável o cliente que a usa. Um controlador que chama `Comando.executar()` pode receber novos comandos sem mudar. A montagem continua a registar as alternativas.
- Um `switch` pequeno sobre opções fechadas pode ser mais claro que uma hierarquia criada para extensões hipotéticas.

## Substituição e interfaces

**LSP** exige que o subtipo cumpra as promessas da base: não fortalece pré-condições, não enfraquece pós-condições e preserva invariantes e evolução do estado.

Se `Retangulo.setLargura` promete conservar a altura, `Quadrado` não pode alterar ambas. O cliente que faz largura 4 e altura 3 espera área 12; o quadrado mutável produziria 9. Uma interface `Forma.area()` sem setters independentes permite outro contrato.

**ISP** separa capacidades segundo os clientes. Um controlador que só lê teclas depende de `Entrada`, não de uma interface que também exige desenhar e tocar som. Um dispositivo pode implementar várias capacidades. Métodos vazios ou operações não suportadas merecem investigação.

## Dependências da regra

**DIP** faz a regra depender do contrato de que precisa; os adaptadores implementam esse contrato. Para guardar pontos, a regra não precisa de conhecer CSV, SQL ou caminhos.

```java
interface Pontuacoes { void guardar(int valor); }

class FimDeJogo {
    private final Pontuacoes pontuacoes;
    FimDeJogo(Pontuacoes p) { pontuacoes = p; }
    void concluir(int valor) {
        if (valor < 0) throw new IllegalArgumentException("pontos negativos");
        pontuacoes.guardar(valor);
    }
}
```

```text
FimDeJogo --> Pontuacoes <-- FicheiroPontuacoes
                        <-- PontuacoesMemoria
```

A montagem escolhe o adaptador. Em execução, a regra chama o objeto concreto; as setas acima representam dependências de código.

- **Injeção** passa o colaborador ao objeto. Passar uma classe concreta no construtor já é injeção, mas não demonstra DIP.
- **Coesão** junta elementos que colaboram na mesma responsabilidade. **Acoplamento** mede dependências de outros módulos e das suas decisões.
- Um ciclo entre pacotes dificulta reutilizá-los isoladamente. Se o modelo importa a vista, identifica a capacidade necessária e coloca o contrato do lado da regra.

Antes de criar uma abstração, identifica a mudança pretendida, o cliente que deve ficar estável e o contrato comum às alternativas. [Contratos e exemplos completos](/cadeiras/ldts/principios-solid/).
