interface Preco {
    int centimos();
}

final class Base implements Preco {
    private int valor;
    Base(int valor) { mudar(valor); }
    void mudar(int novo) {
        if (novo < 0 || novo > 10000)
            throw new IllegalArgumentException("preco invalido");
        valor = novo;
    }
    public int centimos() { return valor; }
}

final class ComEntrega implements Preco {
    private final Preco base;
    ComEntrega(Preco base) { this.base = base; }
    public int centimos() { return base.centimos() + 200; }
}

final class ComDesconto implements Preco {
    private final Preco base;
    ComDesconto(Preco base) { this.base = base; }
    public int centimos() { return base.centimos() * 9 / 10; }
}

public class Main {
    public static void main(String[] args) {
        Base base = new Base(1000);
        Preco total = new ComDesconto(new ComEntrega(base));
        System.out.println(total.centimos());
        base.mudar(600);
        System.out.println(total.centimos());
        Preco outraOrdem = new ComEntrega(new ComDesconto(base));
        System.out.println(outraOrdem.centimos());
    }
}
