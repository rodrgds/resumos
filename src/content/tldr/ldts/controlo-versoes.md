## Três áreas

| Ação                  | Working tree | Índice | Último commit |
| --------------------- | ------------ | ------ | ------------- |
| Estado inicial        | A            | A      | A             |
| Editar e `git add`    | B            | B      | A             |
| Voltar a editar       | C            | B      | A             |
| Commit sem novo `add` | C            | B      | B             |

`git add` congela o instante; `git commit` não relê o ficheiro.

- `git diff`: ficheiro contra índice. `git diff --cached`: índice contra commit.
- `git status --short`: primeira coluna é o índice, segunda o ficheiro. `MM` muda nos dois; `??` não é seguido.
- Revê estado e ambos os diffs antes de confirmar; prepara caminhos concretos.

## Branches e integração

Um branch é uma referência móvel. `HEAD` aponta em geral para o branch atual. Criar um branch não copia pastas.

```bash
git switch -c movimento
# editar, preparar, commits
git switch main
git merge movimento
```

O merge integra no branch **atual**: fast-forward se `main` for antepassado, senão combina e pode criar um commit com dois pais. Conflito resolve-se escolhendo o comportamento, removendo marcadores, testando e preparando; `git merge --abort` tenta repor o estado anterior ao merge. Começa com a árvore limpa, porque mudanças locais por guardar podem impedir essa reposição.

## Remoto e recuperação

| Comando                        | Efeito                                                 |
| ------------------------------ | ------------------------------------------------------ |
| `git fetch origin`             | Obtém objetos e segue remotos, sem integrar.           |
| `git pull --ff-only`           | Integra só sem divergência.                            |
| `git push -u origin movimento` | Publica e configura acompanhamento.                    |
| `git revert <commit>`          | Inverte com um commit novo; para história partilhada.  |
| `git restore f` / `--staged f` | Descarta edição / retira do índice, mantendo a edição. |

Rebase reaplica commits com identificadores novos: coordena em trabalho partilhado. `reset --hard` destrói edição local. `.gitignore` não remove ficheiros já seguidos.

## Build com Gradle

- Guarda o **Wrapper** e corre `./gradlew`: fixa a versão do Gradle. O JDK da ferramenta pode diferir do alvo.
- `options.release = 8` fixa sintaxe, bytecode e APIs; só `sourceCompatibility`/`targetCompatibility` não chega.
- `implementation` é do programa; `testImplementation` e `testRuntimeOnly` são dos testes. `useJUnitPlatform()` seleciona a plataforma JUnit; os testes Jupiter precisam das dependências e do motor Jupiter declarados no projeto.
- `src/main/java` e `src/test/java` separam código e testes. `test` corre testes, `run` executa a classe principal configurada (`Main` no exemplo da cadeira), `jacocoTestReport` gera cobertura.
- Perante falha, lê a primeira causa: descarga, JDK ou compilação.

[Configuração completa do projeto Java](/cadeiras/ldts/controlo-versoes/#dependências-com-gradle).
