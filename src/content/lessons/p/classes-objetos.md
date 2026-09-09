---
title: Classes e objetos
description: Classes, construtores e destrutor, encapsulamento, métodos const e sobrecarga simples de operadores.
section: conteudo
order: 3
---

Nos [fundamentos](/cadeiras/p/cpp-fundamentos/) separaste dados (variáveis) de comportamento (funções). Uma **classe** junta os dois: descreve um tipo novo com os seus dados (**atributos**) e as operações sobre esses dados (**métodos**). Cada variável desse tipo é um **objeto**. Se programaste com tuplos e dicionários em [Tuplos e listas](/cadeiras/fp/tuplos-listas/), pensa numa classe como um contentor de dados que já traz as suas próprias funções coladas.

## Definir uma classe e criar objetos

Uma classe declara-se com a palavra `class`, e os seus membros dividem-se em **públicos** (quem usa o objeto pode aceder) e **privados** (só os métodos da classe acedem). Os métodos definem-se dentro ou fora da classe:

```cpp
#include <iostream>
#include <string>

class Aluno {
public:
    Aluno(const std::string& n, int nro) : nome(n), numero(nro) {}

    void apresentar() {
        std::cout << nome << " (" << numero << ")\n";
    }

private:
    std::string nome;
    int numero;
};

int main() {
    Aluno a("Ana", 202400123);
    a.apresentar();
}
```

Isto escreve `Ana (202400123)`. O objeto `a` guarda o nome e o número, e o método `apresentar` sabe ir buscar esses dados sem receber argumentos: dentro de um método, os atributos do próprio objeto estão sempre ao alcance. O operador ponto (`.`) escolhe o membro de um objeto concreto.

## Construtores e destrutor

O **construtor** é um método especial com o mesmo nome da classe que corre quando o objeto nasce. Garante que nenhum objeto existe num estado inválido: quem cria um `Aluno` é obrigado a dar nome e número logo. O `: nome(n), numero(nro)` a seguir aos parênteses é a **lista de inicialização** e atribui os valores antes de o objeto começar a ser usado; prefere-a sempre a atribuir dentro do corpo.

Uma classe pode ter vários construtores (**sobrecarga**), desde que os parâmetros difiram:

```cpp
#include <iostream>

class Contador {
public:
    Contador() : valor(0) {}
    Contador(int inicial) : valor(inicial) {}

    int ler() { return valor; }
    void incrementar() { valor++; }

private:
    int valor;
};

int main() {
    Contador c1;
    Contador c2(10);
    c2.incrementar();
    std::cout << c1.ler() << " " << c2.ler() << "\n";
}
```

Isto escreve `0 11`. O `c1` usou o construtor sem argumentos e começou em `0`; o `c2` começou em `10` e o incremento levou-o a `11`. O compilador escolhe o construtor pelos argumentos, tal como escolhe entre funções sobrecarregadas.

O simétrico do construtor é o **destrutor** (`~Contador()`), que corre quando o objeto morre, ao sair de âmbito ou por `delete`. Numa classe simples não precisas de o escrever. Mas quando a classe pedir memória com `new` nos [apontadores](/cadeiras/p/apontadores-memoria/), o destrutor é o sítio onde essa memória se liberta: é o mecanismo por trás do RAII.

## Encapsulamento

Manter os atributos privados e expor só o necessário chama-se **encapsulamento**. A ideia: quem usa a classe não precisa de saber como os dados estão guardados, só precisa das operações garantidas. Se um dia mudares a representação interna, o código que usa a classe continua igual.

```cpp
#include <iostream>

class Nota {
public:
    Nota(int v) { definir(v); }

    void definir(int v) {
        if (v < 0) v = 0;
        if (v > 20) v = 20;
        valor = v;
    }

    int ler() { return valor; }

private:
    int valor;
};

int main() {
    Nota n(25);
    std::cout << n.ler() << "\n";
    n.definir(-3);
    std::cout << n.ler() << "\n";
}
```

Isto escreve `20` e depois `0`. A regra "nota entre 0 e 20" vive num único sítio, o método `definir`, e o construtor reutiliza-o. Com o atributo público, qualquer parte do programa podia escrever `n.valor = 25` e a regra quebrava-se em silêncio. O encapsulamento troca um pequeno incómodo (escrever métodos de acesso) por uma garantia: o objeto nunca fica inválido.

## Métodos const

Um método que não altera o objeto deve declarar isso com `const` a seguir aos parênteses. Assim ele pode ser chamado sobre objetos constantes, e o compilador impede alterações acidentais, tal como nos parâmetros `const` dos [fundamentos](/cadeiras/p/cpp-fundamentos/):

```cpp
#include <iostream>

class Ponto {
public:
    Ponto(double px, double py) : x(px), y(py) {}

    double soma_coordenadas() const { return x + y; }
    void deslocar(double dx, double dy) {
        x += dx;
        y += dy;
    }

private:
    double x, y;
};

int main() {
    const Ponto p(3.0, 4.0);
    std::cout << p.soma_coordenadas() << "\n";
}
```

Isto escreve `7`. Como `p` é `const`, só aceita métodos `const`: `soma_coordenadas` pode ser chamado, mas `deslocar` sobre `p` nem compilava. Ganha o hábito de marcar todos os métodos de leitura como `const` desde a primeira versão; acrescentar depois obriga a rever a classe toda.

## Sobrecarga de operadores

Em C++ podes dar novo significado aos operadores (`+`, `==`, `<<`) para os teus tipos. É o que permite somar dois objetos com a mesma naturalidade com que somas dois inteiros. Um exemplo pequeno e útil: comparar dois pontos com `==`:

```cpp
#include <iostream>

class Ponto {
public:
    Ponto(double px, double py) : x(px), y(py) {}

    bool operator==(const Ponto& outro) const {
        return x == outro.x && y == outro.y;
    }

    void mostrar() const {
        std::cout << "(" << x << ", " << y << ")\n";
    }

private:
    double x, y;
};

int main() {
    Ponto a(1.0, 2.0);
    Ponto b(1.0, 2.0);
    Ponto c(3.0, 4.0);
    std::cout << (a == b) << " " << (a == c) << "\n";
}
```

Isto escreve `1 0`. O método `operator==` recebe o ponto da direita como parâmetro e compara com o da esquerda, que é o próprio objeto. Repara nos dois `const`: o método não altera nenhum dos dois pontos. Sem esta sobrecarga, `a == b` compararia os objetos como blocos de memória, o que raramente é o que queres.

## Exemplo completo: uma fração

Vamos construir uma classe `Fracao` com construtor, leitura, soma e comparação, e usá-la num programa completo. Uma fração guarda numerador e denominador; somar $a/b + c/d$ dá $(a d + c b)/(b d)$.

```cpp
#include <iostream>

class Fracao {
public:
    Fracao(int n, int d) : num(n), den(d) {}

    Fracao operator+(const Fracao& outra) const {
        return Fracao(num * outra.den + outra.num * den, den * outra.den);
    }

    bool operator==(const Fracao& outra) const {
        return num * outra.den == outra.num * den;
    }

    void mostrar() const {
        std::cout << num << "/" << den << "\n";
    }

private:
    int num, den;
};

int main() {
    Fracao a(1, 2);
    Fracao b(1, 3);
    Fracao soma = a + b;
    soma.mostrar();
    std::cout << (soma == Fracao(5, 6)) << "\n";
}
```

Isto escreve `5/6` e depois `1`. Confere a soma: $1/2 + 1/3 = (1 times 3 + 1 times 2)/(2 times 3) = 5/6$. E a comparação evita divisões reais: $5/6 == 5/6$ porque $5 times 6 == 5 times 6$. Repara que `operator+` devolve um objeto novo sem tocar nos operandos, tal como `+` entre inteiros não altera os inteiros.

:::details[O que falta para a fração ser perfeita]
A soma devia simplificar o resultado (por exemplo, $1/2 + 1/2$ dá `2/4` em vez de `1/1`), o denominador devia ser validado contra zero no construtor e o `mostrar` devia ser um `operator<<`. São três bons exercícios: cada um exercita uma parte desta página, encapsulamento, construtor e sobrecarga.
:::
