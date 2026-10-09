## Working tree, índice e commit

O working tree contém a edição atual; o índice contém o snapshot escolhido para o próximo commit; o commit regista esse snapshot no histórico local.

| Ação                        | Working tree | Índice | Último commit |
| --------------------------- | ------------ | ------ | ------------- |
| Estado inicial              | A            | A      | A             |
| Editar e fazer `git add`    | B            | B      | A             |
| Voltar a editar             | C            | B      | A             |
| Fazer commit sem novo `add` | C            | B      | B             |

`git add` prepara o conteúdo daquele instante. `git commit` não volta a ler a edição C.

- `git diff` compara working tree com índice; `git diff --cached` compara índice com commit.
- Em `git status --short`, a primeira coluna descreve o índice e a segunda o working tree. `MM` significa alterações nos dois; `??`, ficheiro não seguido.
- Antes de criar o commit, revê estado e ambos os diffs; prepara caminhos concretos.

## Branches e integração

Um branch é uma referência móvel para um commit. `HEAD` normalmente aponta para o branch atual; pode estar destacado num commit. Criar um branch não cria outra pasta.

```bash
git switch -c movimento
# editar, preparar e criar commits
git switch main
git merge movimento
```

O merge integra no branch **atual**. Se `main` for antepassado de `movimento`, um fast-forward avança a referência. Se os dois divergiram, a integração combina mudanças e pode criar um commit com ambos os últimos commits como pais.

```text
A---B---E------M  main
     \       /
      C---D     movimento
```

Um conflito exige escolher o comportamento final, remover marcadores, testar e preparar a resolução antes de concluir o commit. A solução pode combinar versões. `git merge --abort` tenta abandonar uma integração incompleta; começar com a árvore limpa evita misturar trabalho.

## Local, remoto e recuperação

| Comando                          | Efeito                                                                           |
| -------------------------------- | -------------------------------------------------------------------------------- |
| `git fetch origin`               | Atualiza objetos e referências remotas conhecidas, sem integrar no branch atual. |
| `git pull --ff-only`             | Obtém e só integra sem divergência.                                              |
| `git push -u origin movimento`   | Publica o branch e configura acompanhamento remoto.                              |
| `git revert <commit>`            | Cria uma inversão no histórico, adequada a mudanças partilhadas.                 |
| `git restore regra.txt`          | Descarta edição local e recupera do índice.                                      |
| `git restore --staged regra.txt` | Retira do índice, conservando a edição local.                                    |

Rebase reaplica commits sobre outra base e cria identificadores novos; coordena a reescrita de trabalho partilhado. `reset --hard` descarta alterações locais. Identifica onde está a versão a preservar antes de desfazer. `.gitignore` não deixa de seguir ficheiros já registados.

## Build com Gradle

Guarda o **Wrapper** no Git e usa `./gradlew`: fixa a versão do Gradle. O JDK que executa Gradle pode ser diferente do alvo compilado. `options.release = 8` restringe sintaxe, bytecode e APIs ao alvo; `sourceCompatibility` e `targetCompatibility` sozinhos não restringem APIs posteriores.

- `implementation` fornece dependências do programa; `testImplementation`, dos testes; `testRuntimeOnly`, necessárias só ao executar testes.
- Código e testes ficam em `src/main/java` e `src/test/java`; recursos nos diretórios `resources` correspondentes.
- `./gradlew test` executa testes; `./gradlew run` precisa da classe principal configurada; `./gradlew jacocoTestReport` gera cobertura.
- Para JUnit Jupiter, configura `useJUnitPlatform()`. Perante falha, distingue descarga, JDK incompatível e compilação pela primeira causa do erro.

[Configuração completa do projeto Java](/cadeiras/ldts/controlo-versoes/#dependências-com-gradle).
