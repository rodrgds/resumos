# Exemplos executáveis

[Documentação](README.md)

Os exemplos usam [CodeMirror](https://codemirror.net/) e [Runno WASI](https://github.com/taybenlor/runno). Um Worker por execução recebe apenas código e entrada padrão, sem acesso ao DOM ou ao armazenamento das notas. Parar termina o Worker. Os binários do Runno incluem Python 3.11.3, Clang 8 para C17 e C++17, QuickJS e SQLite. RISC-V de 32 bits usa [RARS para JavaScript](https://github.com/Specy/rars) através de `@specy/risc-v` 3.0.0, num Worker próprio. Java usa CheerpJ 4.3 com Java 8 e Eclipse JDT 3.26. Haskell usa o GHC in Browser 9.14 de haskell-wasm, Prolog usa SWI-Prolog 8.1.2 (pacote WASM) e PHP 8.4 usa os pacotes oficiais do WordPress Playground. Os downloads iniciais podem demorar; existe um limite de dois minutos por execução e 32 mil caracteres de saída.

Os motores com acesso a JavaScript ou armazenamento precisam de uma origem própria para proteger as notas. O projeto Cloudflare Pages `resumos-code` executa `npm ci && npm run build:runners` na raiz e publica apenas `runners/dist/`, em `resumos-code.pages.dev`, a partir do mesmo repositório. Nunca sirvas as páginas de leitura nessa origem. Para desenvolvimento, executa `npm run build:runners` e serve `runners/dist/` em `127.0.0.1:4324`; o site pode continuar em `localhost:4321`. Os avisos e as fontes das licenças estão em [runners/NOTICE.md](../runners/NOTICE.md).

`WebPlayground` usa um iframe com origem opaca e uma política que bloqueia a rede. Os exemplos executáveis são opcionais por página. O site continua estático. `ToolEmbed` carrega DartPad por escolha do leitor e abre Ripes numa janela separada. DartPad compila no serviço externo da Google; Ripes simula RISC-V no navegador. [Linguagens e limites por cadeira](../docs/linguagens.md).
