# Exemplos executáveis

[Documentação](README.md) · [Autoria](../CONTRIBUTING.md#código-que-o-leitor-pode-executar) · [Linguagens e limites](linguagens.md)

## Editor

Os exemplos carregam o suporte de sintaxe apenas para as linguagens dos seus ficheiros. As bibliotecas de linguagens que não aparecem na lição ficam fora do carregamento.

O editor realça as outras ocorrências do texto selecionado. Pousar o cursor numa palavra não realça as ocorrências. Ctrl D ou ⌘ D seleciona a palavra e acrescenta a próxima ocorrência; escreve para alterar todas as seleções. Alt + clique acrescenta um cursor. Ctrl/⌘ Alt ↑ ou ↓ acrescenta um cursor na linha anterior ou seguinte. Tab indenta e Shift Tab retira indentação; Escape seguido de Tab sai do editor. Ctrl/⌘ Z desfaz a edição conjunta.

Com **Navegação Vim** ativa, os editores usam os modos normal, inserção e visual do Vim, com movimentos, operadores, pesquisa e undo. `i` entra em inserção e Escape regressa ao modo normal. A preferência aplica-se também aos editores já abertos, sem apagar código. A leitura da lição continua a ser só de leitura.

**Expandir editor** abre o mesmo editor num espaço de trabalho a ocupar o ecrã. Código fica à esquerda, testes, saída ou pré-visualização à direita. Em ecrãs estreitos ficam um por cima do outro. **Fechar** volta à lição sem perder código, undo ou execução. No modo Vim, usa primeiro Escape para sair de inserção ou visual; usa o botão Fechar para sair do espaço de trabalho.

A pré-visualização web apresenta `console.log`, avisos e erros na **Consola**, incluindo exceções e promises rejeitadas. Recriar a pré-visualização limpa a consola; expandir o editor não a recria. A ponte aceita apenas mensagens da iframe atual, com limite de 200 mensagens e 32 mil caracteres. Código, mensagens e erros ficam no navegador.

## Entrada e execução inicial

O controlo de entrada aparece apenas nos exemplos que declaram `input`. Em PHP fornece o corpo de `php://input`; nas linguagens com stdin fornece texto ao programa. SQL usa tabelas e sementes `.sql`, sem entrada padrão. Haskell não suporta stdin neste motor. Repor código restaura também a entrada original.

Os exemplos correm uma vez ao entrar no ecrã, um de cada vez, enquanto a página está visível. Blocos fora do ecrã ficam em espera. Java e Haskell são manuais por omissão; `autoRun={false}` conserva execução manual em qualquer linguagem. Edições anteriores ao arranque automático impedem-no. Parar, repor ou regressar ao bloco não reexecuta código do leitor. A execução de respostas de exercícios continua manual.

Cada consulta SQL com colunas produz uma tabela, incluindo uma consulta sem linhas. Os valores usam texto seguro; nomes repetidos de colunas conservam ambas as posições. Há um máximo de 200 linhas visíveis por consulta, 32 resultados, 64 colunas e 32 mil caracteres. PostgreSQL conserva o texto dos valores, incluindo precisão decimal e inteiros grandes. Nenhum motor persiste a base entre execuções.

PostgreSQL recebe as sementes e o principal em lotes separados. Um lote com várias instruções segue a transação implícita de PostgreSQL: uma criação antes de `BEGIN` pode desaparecer com um `ROLLBACK` no mesmo lote. Separa a preparação em `files` ou delimita as transações explicitamente. PGlite executa numa ligação, por isso não demonstra concorrência entre clientes. Não inclui todas as extensões de um servidor PostgreSQL.

## Isolamento

Cada execução recebe código, ficheiros de apoio e entrada declarada num Worker descartável, sem acesso ao DOM ou às notas. Parar termina o Worker. Ficheiros criados pelo programa ficam em memória até ao fim. A execução tem limite de dois minutos e 32 mil caracteres de saída.

Python prepara um intérprete ao focar um editor e prepara o seguinte enquanto o programa corre. A página partilha apenas um Worker de reserva que ainda não executou código do leitor, através de uma iframe na origem dos motores. Cada execução consome esse Worker e termina-o ao concluir ou parar; nunca se reutilizam variáveis, módulos alterados ou ficheiros de programas anteriores. Fechar a página termina também o Worker de reserva. O primeiro carregamento e as bibliotecas adicionais continuam a depender da ligação e do dispositivo.

Python, Java, Haskell, Prolog, PHP, SQLite e PostgreSQL usam `resumos-code.pages.dev`, porque os motores têm acesso a JavaScript ou armazenamento. Essa origem publica apenas `runners/dist/`, nunca páginas de leitura. O projeto Cloudflare `resumos-code` compila com `npm ci && npm run build:runners`. Mantém a CSP de produção; a configuração de testes troca apenas a origem autorizada do leitor.

`WebPlayground` usa iframe de origem opaca, sem rede. `allow-forms` permite eventos e validação locais; CSP `form-action 'none'` continua a impedir envios. DartPad é a exceção explícita de compilação externa e só abre por escolha do leitor.

## Testar localmente

Dentro de Devenv, prepara e serve os motores numa origem separada:

```sh
npm run build:runners
python3 -m http.server 4324 --bind 127.0.0.1 --directory runners/dist
```

Mantém esse servidor aberto enquanto testas o site em `localhost:4321`. A porta 4324 serve só os motores. Confirma o programa publicado no browser e nativamente; não acrescentes código apenas para o teste passar.

## Contratos das linguagens

- Python carrega pacotes do catálogo Pyodide pelos imports do programa e dos ficheiros de apoio. Inclui imports explícitos para dependências indiretas, como SciPy. `plt.show()` apresenta PNGs; o programa principal corre e os ficheiros das tabs ficam disponíveis para importar (`from apoio import funcao`) ou ler (`open("vendas.csv")`).
- C/C++ WASI não substitui POSIX, Minix, hardware, MPI ou OpenMP. Exceções e file I/O precisam de programas estáticos e instruções locais.
- Java usa classe `Main`, sem pacote. Haskell tem `main`, sem stdin interativo, e requer JSPI.
- PHP inclui `<?php`; `input` fornece o corpo acessível por `php://input`.
- Prolog define `main/0`, sem `initialization(main)`: o motor chama o predicado depois de consultar. Nativamente, usa `swipl -q -s ficheiro.pl -g main -t halt`.
- RISC-V usa RARS de 32 bits, com entrada por linhas e sem ficheiros do computador. SQL tem dois motores: `sqlite`, através de sql.js, e `postgresql`, através de PGlite. `sql` é um alias compatível de SQLite.

Motores e compatibilidade por cadeira estão em [linguagens.md](linguagens.md); versões e licenças em [runners/NOTICE.md](../runners/NOTICE.md) e nos pacotes fixados. A CSP do Python autoriza o diretório fixo do Pyodide em `worker-src`, também usado pelos imports de módulos do Worker.
