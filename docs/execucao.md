# Exemplos executáveis

[Documentação](README.md) · [Autoria](../CONTRIBUTING.md#código-que-o-leitor-pode-executar) · [Linguagens e limites](linguagens.md)

## Isolamento

Cada execução recebe código e entrada num Worker descartável, sem acesso ao DOM ou às notas. Parar termina o Worker. Ficheiros criados pelo programa ficam em memória até ao fim. A execução tem limite de dois minutos e 32 mil caracteres de saída.

Python, Java, Haskell, Prolog e PHP usam `resumos-code.pages.dev`, porque os motores têm acesso a JavaScript ou armazenamento. Essa origem publica apenas `runners/dist/`, nunca páginas de leitura. O projeto Cloudflare `resumos-code` compila com `npm ci && npm run build:runners`. Mantém a CSP de produção; a configuração de testes troca apenas a origem autorizada do leitor.

`WebPlayground` usa iframe de origem opaca, sem rede. `allow-forms` permite eventos e validação locais; CSP `form-action 'none'` continua a impedir envios. DartPad é a exceção explícita de compilação externa e só abre por escolha do leitor.

## Testar localmente

Dentro de Devenv, prepara e serve os motores numa origem separada:

```sh
npm run build:runners
python3 -m http.server 4324 --bind 127.0.0.1 --directory runners/dist
```

Mantém esse servidor aberto enquanto testas o site em `localhost:4321`. A porta 4324 serve só os motores. Confirma o programa publicado no browser e nativamente; não acrescentes código apenas para o teste passar.

## Contratos das linguagens

- Python carrega pacotes do catálogo Pyodide pelos imports. Inclui imports explícitos para dependências indiretas, como SciPy. `plt.show()` apresenta PNGs; dados ficam no programa ou em ficheiros em memória.
- C/C++ WASI não substitui POSIX, Minix, hardware, MPI ou OpenMP. Exceções e file I/O precisam de programas estáticos e instruções locais.
- Java usa classe `Main`, sem pacote. Haskell tem `main`, sem stdin interativo, e requer JSPI.
- PHP inclui `<?php`; `input` fornece o corpo acessível por `php://input`.
- Prolog define `main/0`, sem `initialization(main)`: o motor chama o predicado depois de consultar. Nativamente, usa `swipl -q -s ficheiro.pl -g main -t halt`.
- RISC-V usa RARS de 32 bits, com entrada por linhas e sem ficheiros do computador. SQL usa SQLite, não PostgreSQL.

Motores e compatibilidade por cadeira estão em [linguagens.md](linguagens.md); versões e licenças em [runners/NOTICE.md](../runners/NOTICE.md) e nos pacotes fixados. A CSP do Python autoriza o diretório fixo do Pyodide em `worker-src`, também usado pelos imports de módulos do Worker.
