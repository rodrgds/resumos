---
title: "Herança e polimorfismo"
description: Classes derivadas, funções virtuais e override, classes abstratas, slicing e destrutor virtual.
section: conteudo
order: 4
---

Quando duas [classes](/cadeiras/p/classes-objetos/) partilham dados e comportamento, copiar os membros de uma para a outra duplica código e espalha cada correção por vários sítios. A **herança** resolve isto: uma classe **derivada** herda os membros de uma classe **base** e acrescenta ou especializa o que precisa. O **polimorfismo** vai um passo além: trata objetos de classes diferentes através da mesma interface, e cada objeto responde à sua maneira.

## Herdar de uma classe base

A classe derivada declara a base a seguir a dois pontos. Herdam-se os membros públicos e protegidos (`protected`, acessível à classe e às derivadas); o construtor da base corre sempre antes do da derivada:

```cpp
#include <iostream>
#include <string>

class Pessoa {
public:
    Pessoa(const std::string& n) : nome(n) {}

    void apresentar() const {
        std::cout << "Sou " << nome << "\n";
    }

protected:
    std::string nome;
};

class Aluno : public Pessoa {
public:
    Aluno(const std::string& n, int nro) : Pessoa(n), numero(nro) {}

    void apresentar_numero() const {
        std::cout << nome << " tem o numero " << numero << "\n";
    }

private:
    int numero;
};

int main() {
    Aluno a("Ana", 123);
    a.apresentar();
    a.apresentar_numero();
}
```

Isto escreve `Sou Ana` e depois `Ana tem o numero 123`. O construtor de `Aluno` chama o da base na lista de inicialização (`Pessoa(n)`) antes de inicializar o seu próprio atributo. O método herdado `apresentar` funciona sobre o objeto derivado sem ser reescrito, e o membro `protected` fica visível nos métodos de `Aluno` mas continua escondido de `main`.

## Funções virtuais e override

Se a derivada redefinir um método da base, qual das versões corre? Sem `virtual`, decide o tipo da variável em tempo de compilação. Com `virtual`, decide o tipo real do objeto em tempo de execução: é esta escolha tardia que se chama **polimorfismo**. A redefinição marca-se com `override`, que manda o compilador confirmar que existe mesmo um método virtual com essa assinatura na base:

```cpp
#include <iostream>
#include <string>

class Pessoa {
public:
    Pessoa(const std::string& n) : nome(n) {}
    virtual ~Pessoa() = default;

    virtual void apresentar() const {
        std::cout << "Sou " << nome << "\n";
    }

protected:
    std::string nome;
};

class Aluno : public Pessoa {
public:
    Aluno(const std::string& n, int nro) : Pessoa(n), numero(nro) {}

    void apresentar() const override {
        std::cout << "Sou " << nome << ", aluno numero " << numero << "\n";
    }

private:
    int numero;
};

void cumprimentar(const Pessoa& p) {
    p.apresentar();
}

int main() {
    Aluno a("Ana", 123);
    cumprimentar(a);
}
```

Isto escreve `Sou Ana, aluno numero 123`. A função `cumprimentar` recebe uma referência para `Pessoa`, mas o objeto real é um `Aluno`, e é a versão de `Aluno` que corre. Sem o `virtual`, sairia `Sou Ana`: a função veria só a parte `Pessoa` do objeto. Repara que a passagem por referência é essencial aqui; por valor, nem o `virtual` salvava, como mostra a próxima secção.

:::tip[override é o teu corretor automático]
Escreve sempre `override` nas redefinições. Se a assinatura tiver um detalhe errado (um `const` a menos, um tipo trocado), sem `override` crias silenciosamente um método novo que nunca é chamado por polimorfismo; com `override` o compilador reclama logo. É dos hábitos com melhor rácio custo-benefício em C++.
:::

## Classes abstratas

Uma função virtual **pura** (`= 0`) não tem implementação na base e obriga cada derivada concreta a defini-la. Uma classe com pelo menos uma função virtual pura é **abstrata**: não se pode instanciar, serve apenas de interface comum:

```cpp
#include <iostream>

class Forma {
public:
    virtual ~Forma() = default;
    virtual double area() const = 0;
};

class Quadrado : public Forma {
public:
    Quadrado(double l) : lado(l) {}
    double area() const override { return lado * lado; }

private:
    double lado;
};

int main() {
    Quadrado q(3.0);
    std::cout << q.area() << "\n";
}
```

Isto escreve `9`. Tentar declarar `Forma f;` nem compilava: uma forma genérica não tem área calculável, por isso a linguagem impede que exista. Cada forma concreta (quadrado, círculo, triângulo) implementa o seu `area`, e o código que usa formas fala só com a interface `Forma`. É o padrão do exemplo completo abaixo.

## A armadilha do slicing

Guardar um objeto derivado numa variável do tipo base **corta** a parte derivada: chama-se **slicing** (fatiamento). A variável base só tem espaço para a parte base, e o resto perde-se, incluindo o comportamento polimórfico:

```cpp
#include <iostream>

class Base {
public:
    virtual void quem() const { std::cout << "base\n"; }
    virtual ~Base() = default;
};

class Derivada : public Base {
public:
    void quem() const override { std::cout << "derivada\n"; }
};

int main() {
    Derivada d;
    Base copia = d;
    copia.quem();
    Base& ref = d;
    ref.quem();
}
```

Isto escreve `base` e depois `derivada`. A `copia` sofreu slicing: é um `Base` genuíno construído a partir da parte `Base` de `d`, por isso responde `base`. A referência `ref` aponta para o objeto completo, por isso o `virtual` escolhe `derivada`. A regra prática: polimorfismo usa-se com referências ou apontadores, nunca com objetos por valor. É também por isto que contentores de objetos polimórficos guardam apontadores (de preferência smart pointers, como viste nos [apontadores](/cadeiras/p/apontadores-memoria/)).

## A regra do destrutor virtual

Se uma classe tem pelo menos uma função virtual, o destrutor também deve ser virtual. Quando apagas um objeto derivado através de um apontador para a base, só o destrutor virtual garante que corre o destrutor da derivada antes do da base:

```cpp
#include <iostream>

class Base {
public:
    virtual ~Base() { std::cout << "limpa base\n"; }
};

class Derivada : public Base {
public:
    ~Derivada() override { std::cout << "limpa derivada\n"; }
};

int main() {
    Base* p = new Derivada();
    delete p;
}
```

Isto escreve `limpa derivada` e depois `limpa base`. Sem o `virtual`, só correria o destrutor da base, e os recursos da derivada (memória pedida com `new`, ficheiros abertos) ficavam por libertar. Nos exemplos desta página escrevemos `virtual ~Forma() = default;`: destrutor virtual com implementação omissa, suficiente quando não há limpeza própria a fazer.

## Exemplo completo: áreas de formas

Vamos juntar classe abstrata, duas derivadas e uma função que trata ambas pela interface comum. A área do círculo é $pi r^2$; usamos $3.1416$ como valor de $pi$.

```cpp
#include <iostream>

class Forma {
public:
    virtual ~Forma() = default;
    virtual double area() const = 0;
};

class Quadrado : public Forma {
public:
    Quadrado(double l) : lado(l) {}
    double area() const override { return lado * lado; }

private:
    double lado;
};

class Circulo : public Forma {
public:
    Circulo(double r) : raio(r) {}
    double area() const override { return 3.1416 * raio * raio; }

private:
    double raio;
};

void mostrar_area(const Forma& f) {
    std::cout << "Area: " << f.area() << "\n";
}

int main() {
    Quadrado q(3.0);
    Circulo c(1.0);
    mostrar_area(q);
    mostrar_area(c);
}
```

Isto escreve `Area: 9` e `Area: 3.1416`. A mesma função `mostrar_area` calcula áreas de formas diferentes sem saber quais: recebe referências para a base (sem slicing) e o `virtual` escolhe a fórmula certa em cada chamada. Confere o círculo: $3.1416 times 1^2 = 3.1416$. Se acrescentares um `Triangulo` amanhã, esta função continua igual: esse é o ganho do polimorfismo, código novo sem mexer no código que já funciona.
