## Responsabilidades e extensão

- **SRP:** uma razão para mudar. `Pontos` guarda a regra, `PontuacoesFicheiro` o formato e escrita, `PontosVista` a apresentação. Não é uma classe por método; sem variação independente, não separes.
- **OCP:** o cliente estável não muda com a variação. Controlador chama `Comando.executar()`; a montagem regista alternativas. `switch` fechado e pequeno pode continuar mais claro.

## Substituição e interfaces

**LSP:** o subtipo cumpre as promessas da base. Sem pré-condições mais fortes, sem pós-condições mais fracas, com invariantes e evolução preservados.

Se `setLargura` promete manter a altura, `Quadrado` mutável que muda ambas quebra o cliente. O cliente fixa largura 4 e altura 3 e espera área 12; com o quadrado, o segundo setter repõe ambos em 3 e a área obtida é 9. Relação matemática não autoriza herança de API mutável; `Forma.area()` sem setters resolve.

**ISP:** interfaces por cliente. Controlador de teclas depende de `Entrada`; desenho e som ficam em `Vista` e `Audio`. Um objeto pode implementar as três. Métodos vazios ou não suportados pedem investigação, não uma interface por operação.

## Dependências da regra

**DIP:** a regra depende do contrato; detalhes implementam-no. Para guardar pontos, `Pontuacoes.guardar(int)` esconde CSV, SQL e caminhos. A montagem escolhe o adaptador.

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

Setas de dependência de código; em execução, a chamada vai para o objeto montado. Passar o colaborador no construtor é **injeção**; escolher contratos adequados para a regra é **inversão**. Receber uma classe concreta no construtor injeta o colaborador, mas sem contrato não há inversão de dependências.

## Coesão e acoplamento

- **Coesão:** junta num módulo o que colabora na mesma responsabilidade.
- **Acoplamento:** mede as dependências de um módulo em relação a outros; prefere dependências necessárias e explícitas.

## Pacotes e reutilização

- Agrupa o que se reutiliza e muda em conjunto; evita ciclos entre pacotes, que impedem alterar ou reutilizar um pacote isolado.
- Pacotes com muitos clientes estendem-se por contrato; pacotes sem reutilização podem continuar concretos.

## Antes de abstrair

Nomeia a mudança esperada, o cliente que deve ficar estável e o contrato comum das alternativas; compara a complexidade nova com a dependência removida.

[Contratos e exemplos completos](/cadeiras/ldts/principios-solid/).
